
import { pipeline, env } from
  "https://cdn.jsdelivr.net/npm/@huggingface/transformers@3.7.2";

env.useBrowserCache = true;

const MODEL = "onnx-community/Qwen2.5-0.5B-Instruct";
const $ = id => document.getElementById(id);

const DEFAULT_MISSION = {
  title: "The Tiny Explorer",
  description: "Spend time outdoors discovering three different leaf shapes. Observe their textures, edges and patterns without damaging any plants.",
  duration: 15,
  reward: 50,
  difficulty: "Easy",
  emoji: "🍃",
  fact: "Leaves come in many shapes. Their edges, veins and textures can help you notice differences between plants."
};

function readSaved() {
  try {
    return JSON.parse(localStorage.getItem("greenquest-v1")) || {};
  } catch {
    return {};
  }
}

const saved = readSaved();

const state = {
  xp: Math.max(0, Number(saved.xp) || 0),
  minutes: Math.max(0, Number(saved.minutes) || 0),
  completed: Math.max(0, Number(saved.completed) || 0),
  streak: Math.max(0, Number(saved.streak) || 0),
  lastVisit: saved.lastVisit || "",
  lastCompletion: saved.lastCompletion || "",
  mission: { ...DEFAULT_MISSION },
  secondsLeft: DEFAULT_MISSION.duration * 60,
  timerId: null,
  running: false,
  generating: false,
  completedThisMission: false
};

let generator = null;

function today() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function daysBetween(a, b) {
  const parse = s => {
    const [y, m, d] = s.split("-").map(Number);
    return Date.UTC(y, m - 1, d);
  };
  return Math.round((parse(a) - parse(b)) / 86400000);
}

function save() {
  try {
    localStorage.setItem("greenquest-v1", JSON.stringify({
      xp: state.xp,
      minutes: state.minutes,
      completed: state.completed,
      streak: state.streak,
      lastVisit: state.lastVisit,
      lastCompletion: state.lastCompletion
    }));
  } catch (error) {
    console.warn("Could not save progress.", error);
  }
}

function updateStreak() {
  const date = today();

  if (state.lastVisit !== date) {
    if (!state.lastVisit) {
      state.streak = 1;
    } else {
      const diff = daysBetween(date, state.lastVisit);
      state.streak = diff === 1 ? state.streak + 1 : 1;
    }

    state.lastVisit = date;
    save();
  }
}

function toast(message) {
  const element = $("toast");
  element.textContent = message;
  element.classList.add("show");
  clearTimeout(toast.timeout);
  toast.timeout = setTimeout(() => element.classList.remove("show"), 3000);
}

function renderProgress() {
  $("minutes").textContent = `${state.minutes} min`;
  $("xp").textContent = `${state.xp} XP`;
  $("completed").textContent = state.completed;
  $("streak").textContent = state.streak;

  const level = Math.floor(state.xp / 100) + 1;
  const remainder = state.xp % 100;

  $("level").textContent = `Level ${level}`;
  $("progressBar").style.width = `${remainder}%`;
  $("progressText").textContent = `${remainder} / 100 XP to your next level`;

  $("badge1").classList.toggle("unlocked", state.completed >= 1);
  $("badge2").classList.toggle("unlocked", state.xp >= 100);
  $("badge3").classList.toggle("unlocked", state.minutes >= 60);
  $("badge4").classList.toggle("unlocked", state.completed >= 5);
}

function stopTimer() {
  clearInterval(state.timerId);
  state.timerId = null;
  state.running = false;
  if ($("timerBtn")) $("timerBtn").textContent = "▶ Start";
}

function updateTimer() {
  const mins = Math.floor(state.secondsLeft / 60);
  const secs = state.secondsLeft % 60;

  $("timer").textContent =
    `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;

  $("timerBtn").textContent = state.running
    ? "Ⅱ Pause"
    : state.secondsLeft === 0
      ? "↻ Restart"
      : "▶ Start";
}

function renderMission(data) {
  state.mission = {
    title: String(data.title || DEFAULT_MISSION.title).slice(0, 90),
    description: String(data.description || DEFAULT_MISSION.description).slice(0, 600),
    duration: Math.max(1, Math.min(180, Number(data.duration) || 15)),
    reward: Math.max(10, Math.min(200, Number(data.reward) || 50)),
    difficulty: String(data.difficulty || "Easy").slice(0, 30),
    emoji: String(data.emoji || "🌿").slice(0, 8),
    fact: String(data.fact || DEFAULT_MISSION.fact).slice(0, 400)
  };

  $("missionTitle").textContent = state.mission.title;
  $("missionDescription").textContent = state.mission.description;
  $("missionDuration").textContent = state.mission.duration;
  $("missionReward").textContent = state.mission.reward;
  $("difficulty").textContent = state.mission.difficulty;
  $("missionEmoji").textContent = state.mission.emoji;
  $("natureFact").textContent = state.mission.fact;
  $("category").textContent = `✳ ${$("activity").value.toUpperCase()}`;

  document.querySelectorAll(".mission-check").forEach(input => {
    input.checked = false;
  });

  state.completedThisMission = false;
  $("completeBtn").disabled = false;
  $("feedback").textContent = "";

  stopTimer();
  state.secondsLeft = state.mission.duration * 60;
  updateTimer();
}

function toggleTimer() {
  if (state.running) {
    stopTimer();
    updateTimer();
    return;
  }

  if (state.secondsLeft <= 0) {
    state.secondsLeft = state.mission.duration * 60;
  }

  state.running = true;
  updateTimer();

  state.timerId = setInterval(() => {
    state.secondsLeft--;

    if (state.secondsLeft <= 0) {
      state.secondsLeft = 0;
      stopTimer();
      toast("⏰ Time's up! Finish safely when you're ready.");
    }

    updateTimer();
  }, 1000);
}

function validateMission(data) {
  if (!data || typeof data !== "object") {
    throw new Error("The model did not return an object.");
  }

  if (
    typeof data.title !== "string" ||
    typeof data.description !== "string" ||
    !data.title.trim() ||
    !data.description.trim()
  ) {
    throw new Error("The model returned an incomplete mission.");
  }

  const difficulties = ["easy", "intermediate", "adventurous"];
  let difficulty = String(data.difficulty || "Easy");

  if (!difficulties.includes(difficulty.toLowerCase())) {
    difficulty = $("difficultySelect").value;
  }

  return {
    title: data.title,
    description: data.description,
    duration: Number(data.duration) || Number($("duration").value),
    reward: Number(data.reward) || 50,
    difficulty,
    emoji: data.emoji || "🌿",
    fact: typeof data.fact === "string" ? data.fact : DEFAULT_MISSION.fact
  };
}

function parseGeneratedText(text) {
  // Models may add extra text around their JSON output.
  const start = text.indexOf("{");
  const end = text.lastIndexOf("}");

  if (start < 0 || end <= start) {
    throw new Error("No valid JSON found in model output.");
  }

  return JSON.parse(text.slice(start, end + 1));
}

async function loadModel() {
  if (generator) return generator;

  const device = navigator.gpu ? "webgpu" : "wasm";

  try {
    generator = await pipeline(
      "text-generation",
      MODEL,
      {
        device,
        dtype: "q4",
        progress_callback: progress => {
          if (progress.status === "progress") {
            $("aiStatus").textContent =
              `Downloading AI model: ${Math.round(progress.progress || 0)}%`;
          } else if (progress.status === "downloading") {
            $("aiStatus").textContent = "🌿 Downloading model files...";
          } else if (progress.status === "ready") {
            $("aiStatus").textContent = "🌱 Preparing your AI...";
          }
        }
      }
    );

    return generator;
  } catch (error) {
    generator = null;

    if (device === "wasm") throw error;

    console.warn("WebGPU initialization failed; trying WASM.", error);

    generator = await pipeline(
      "text-generation",
      MODEL,
      {
        device: "wasm",
        dtype: "q4"
      }
    );

    return generator;
  }
}

async function generateMission() {
  if (state.generating) return;

  state.generating = true;

  const buttons = [$("heroGenerate"), $("generateBtn")];
  buttons.forEach(button => button.disabled = true);

  const activity = $("activity").value;
  const duration = Number($("duration").value);
  const difficulty = $("difficultySelect").value;

  try {
    $("aiStatus").textContent =
      "🌱 Preparing your personal AI adventure...";

    const ai = await loadModel();

    const prompt = `Create one practical, safe outdoor mission.
Activity: ${activity}
Available time: ${duration} minutes
Difficulty: ${difficulty}

Encourage real-world exploration, mindfulness, or learning.
Use a safe garden or public park. Do not encourage touching or eating
unknown plants, disturbing wildlife, trespassing, or dangerous activities.
No special equipment or purchases.
Return only one JSON object, with no markdown:
{
"title":"Short title",
"description":"Clear instructions",
"duration":${duration},
"reward":50,
"difficulty":"${difficulty}",
"emoji":"🌿",
"fact":"One short educational nature fact"
}
JSON:`;

    $("aiStatus").textContent = "✨ Creating your adventure...";

    const result = await ai(prompt, {
      max_new_tokens: 180,
      do_sample: false,
      return_full_text: false
    });

    const text = result?.[0]?.generated_text;

    if (!text || typeof text !== "string") {
      throw new Error("The model returned an empty response.");
    }

    const mission = validateMission(parseGeneratedText(text));
    renderMission(mission);

    $("aiStatus").textContent =
      "✨ New mission created by open-source AI in your browser!";
    toast("Your adventure is ready 🌿");
  } catch (error) {
    console.error("AI generation failed:", error);

    renderMission({
      ...DEFAULT_MISSION,
      duration,
      description:
        `Try ${activity} for ${duration} minutes. ` +
        DEFAULT_MISSION.description,
      difficulty
    });

    $("aiStatus").textContent =
      "🌱 Demo mission loaded. AI may need internet access or more memory.";

    toast("Showing a demo mission because AI could not load.");
  } finally {
    state.generating = false;
    buttons.forEach(button => button.disabled = false);
  }
}

function completeMission() {
  if (state.completedThisMission) return;

  const checks = [...document.querySelectorAll(".mission-check")];

  if (!checks.every(input => input.checked)) {
    $("feedback").textContent =
      "Complete all three checklist items before claiming your reward.";
    $("feedback").style.color = "#a65b28";
    toast("Finish your checklist first 🌱");
    return;
  }

  state.completedThisMission = true;
  state.xp += state.mission.reward;
  state.completed += 1;
  state.minutes += state.mission.duration;
  state.lastCompletion = today();

  stopTimer();
  save();
  renderProgress();

  $("completeBtn").disabled = true;
  $("feedback").textContent =
    `Adventure complete! You earned ${state.mission.reward} XP.`;
  $("feedback").style.color = "#477b4c";

  toast(`🏆 +${state.mission.reward} XP — great work!`);
}

$("heroGenerate").addEventListener("click", generateMission);
$("generateBtn").addEventListener("click", generateMission);
$("timerBtn").addEventListener("click", toggleTimer);
$("completeBtn").addEventListener("click", completeMission);

updateStreak();
renderProgress();
renderMission(DEFAULT_MISSION);
