# 🌿 GreenQuest AI — Touch Grass, Powered by Open-Source AI

**Turn screen time into green time.** 🌱

GreenQuest AI is an AI-powered outdoor activity companion that encourages people to step away from their screens, explore nature, and build healthier outdoor habits through personalized nature challenges.

Built using **HTML, CSS, JavaScript, and open-source AI**, GreenQuest AI generates fun outdoor missions, tracks your progress, rewards your achievements, and makes spending time outside feel like a game.

The project is built for the **Touch Grass** challenge, demonstrating how open AI models can power practical, accessible experiences directly in the browser.

---

## ✨ Features

### 🤖 AI-Powered Outdoor Missions
- Generate creative outdoor activities using an open-weight AI model.
- Get mission ideas based on your preferred activity, available time, and difficulty.
- Discover new ways to interact with nature.
- Includes fallback activities if AI generation is unavailable.

### 🌳 Personalized Nature Adventures
Choose activities that fit your mood and schedule, such as:
- Nature walks
- Plant and tree observation
- Bird watching
- Outdoor photography
- Mindful breathing in a natural setting
- Environmental cleanup
- Sky and cloud observation

### ⏱️ Activity Timer
- Start a timer for your outdoor mission.
- Track your activity duration.
- Focus on completing one mission at a time.

### 🎮 Gamification and Rewards
- Earn XP for completing missions.
- Track your total completed activities.
- Build outdoor streaks.
- Progress through levels.
- Unlock achievement badges.

### 📊 Progress Dashboard
Keep track of your outdoor journey with:
- Total XP earned
- Completed missions
- Outdoor minutes
- Current streak
- Level progression
- Achievement badges

### 💾 Persistent Progress
GreenQuest AI uses browser local storage to retain supported progress data between visits on the same browser and origin.

### 📱 Responsive Interface
A nature-inspired interface designed to work across desktop, tablet, and mobile screens.

### 🔓 Open-Source AI at Its Core
The application uses [Transformers.js](https://huggingface.co/docs/transformers.js/index) to run a compatible open-weight language model in the browser.

**No Ollama installation, API key, or separate AI backend is required.**

---

## 🛠️ Technology Stack

| Technology | Purpose |
|---|---|
| HTML5 | Application structure and interface |
| CSS3 | Styling, responsive layouts, and visual design |
| JavaScript (ES Modules) | Application logic, timer, AI integration, and progress tracking |
| Transformers.js | Runs compatible machine-learning models in the browser |
| Qwen2.5-0.5B-Instruct | Open-weight language model used for mission generation |
| ONNX Runtime | Model inference through the Transformers.js ecosystem |
| Browser Local Storage | Saves supported progress data locally |
| Hugging Face Hub / CDN | Provides access to the model files and JavaScript library |

### AI Model

- **Model:** `onnx-community/Qwen2.5-0.5B-Instruct`
- **Model family:** Qwen2.5
- **Task:** Text generation
- **Inference:** In the browser using Transformers.js and compatible ONNX model artifacts
- **Execution:** WebGPU when available in the configured setup, with a WebAssembly fallback

The model and browser runtime may require a substantial initial download. Performance depends on your browser, hardware, available memory, and whether WebGPU is supported.

> Model weights and their converted artifacts have their own licenses and terms. Review the model card and relevant licenses before redistributing model files or using the project commercially.

Model: [Qwen2.5-0.5B-Instruct on Hugging Face](https://huggingface.co/onnx-community/Qwen2.5-0.5B-Instruct)

---

## 🧠 How It Works

GreenQuest AI combines a lightweight web application with browser-based AI inference.

1. **Choose your preferences.** Select an activity category, duration, and difficulty.
2. **Prepare the AI prompt.** JavaScript sends the selected preferences to the locally running model pipeline.
3. **Generate a mission.** The model creates an outdoor challenge based on the prompt.
4. **Display the mission.** The generated result is parsed and presented in the application.
5. **Complete the activity.** Start the timer and go outdoors to complete your mission.
6. **Earn rewards.** Completing a mission updates your XP, statistics, streak, and achievements.
7. **Save progress.** Supported progress information is stored in browser local storage.

If the AI model cannot load or produces an unusable response, the application can fall back to predefined missions so the experience remains useful.

### Architecture

```text
User Interface
  HTML + CSS
       |
       v
JavaScript Application
  |         |          |
  v         v          v
AI Model   Timer     Progress
  |                    |
  v                    v
Mission             Local Storage
Generation
  |
  v
Outdoor Challenge
  |
  v
Complete Mission
  |
  v
XP, Levels, Streaks
and Achievements
```

### Privacy and Local Inference

The language model is intended to run in the browser rather than through a hosted inference API. This avoids the need to send each mission-generation prompt to a separate AI inference server.

However, the initial model and library downloads still come from their configured hosting locations. Browser caching, network requests, and local storage behavior depend on the browser and deployment environment.

---

## 📂 Project Structure

The project uses three main files:

```text
greenquest-ai/
│
├── index.html    # Main application interface
├── style.css     # Styling and responsive design
├── script.js     # AI integration and application logic
│
└── README.md     # Project documentation
```

### File Responsibilities

**`index.html`**
- Defines the page structure.
- Displays the mission generator.
- Contains the progress dashboard, timer, and achievement sections.
- Loads the JavaScript application.

**`style.css`**
- Defines colors, spacing, typography, and component styling.
- Creates the nature-inspired visual theme.
- Handles responsive layouts.

**`script.js`**
- Initializes Transformers.js.
- Loads the configured AI model.
- Generates and parses outdoor missions.
- Manages the activity timer.
- Tracks XP, levels, streaks, and achievements.
- Saves supported progress data to local storage.
- Handles fallback missions and errors.

---

## 🚀 Getting Started

### Prerequisites

You need:

- A modern web browser such as Chrome, Edge, or Firefox.
- A code editor such as [Visual Studio Code](https://code.visualstudio.com/).
- An internet connection for the initial loading of the JavaScript library and model assets.
- A local web server or static web host.

**You do not need:**
- Ollama
- Python
- Node.js for the basic static setup
- A dedicated backend server
- An AI API key

### 1. Clone the Repository

Replace `YOUR_USERNAME` with your GitHub username after you publish the repository.

```bash
git clone https://github.com/YOUR_USERNAME/greenquest-ai.git
```

Open the project folder:

```bash
cd greenquest-ai
```

### 2. Open the Project in VS Code

```bash
code .
```

If the `code` command is unavailable, open VS Code manually and select **File → Open Folder**.

### 3. Start a Local Web Server

The recommended beginner-friendly option is the **Live Server** extension for Visual Studio Code.

1. Open VS Code.
2. Go to Extensions.
3. Search for `Live Server`.
4. Install the extension.
5. Open `index.html`.
6. Click **Go Live**.

Your browser should open the application at a local address similar to:

```text
http://127.0.0.1:5500/
```

The exact address and port may differ.

> Avoid opening `index.html` directly through a `file://` URL. JavaScript modules and model-loading requests can require a proper HTTP origin.

### 4. Generate Your First Mission

1. Wait for the interface to load.
2. Allow the AI model to initialize.
3. Choose your preferred activity, duration, and difficulty.
4. Click the AI mission-generation button.
5. Review the generated outdoor challenge.
6. Start the timer and head outside.
7. Complete the activity to earn rewards.

**First-run tip:** Model downloads can take time. Keep the browser tab open while the model loads, and check the browser console if initialization fails.

---

## 🌼 Example Missions

Here are examples of the kinds of activities GreenQuest AI is designed to encourage.

### 🌳 The Tree Explorer
**Duration:** 10 minutes  
**Difficulty:** Easy

Find a tree nearby. Observe its leaves, bark, branches, and shape. Notice three details you would normally walk past.

### ☁️ Cloud Detective
**Duration:** 15 minutes  
**Difficulty:** Easy

Find a comfortable outdoor spot and observe the sky. Identify different cloud shapes and notice how they change over time.

### 🐦 Bird Watcher
**Duration:** 15 minutes  
**Difficulty:** Medium

Spend time outdoors listening for birds. Observe their movements from a respectful distance without disturbing them or approaching nests.

### 🌱 Tiny Nature Discovery
**Duration:** 10 minutes  
**Difficulty:** Easy

Look for small details in your surroundings, such as moss, fallen leaves, flowers, or interesting natural textures. Leave living plants undisturbed.

### ♻️ Give Back to Nature
**Duration:** 20 minutes  
**Difficulty:** Medium

If it is safe and appropriate, collect a small amount of litter using suitable protection and dispose of it correctly. Avoid hazardous waste.

These are illustrative examples. Actual AI-generated missions may vary.

---

## 🏆 Gamification

GreenQuest AI makes outdoor activities more engaging by connecting them with progress and achievements.

| Mechanic | Description |
|---|---|
| XP | Earn experience points by completing missions |
| Levels | Progress as your XP increases |
| Streaks | Track consecutive days of activity according to the application's logic |
| Activity counter | Count completed missions |
| Outdoor minutes | Track time spent on activities |
| Badges | Unlock achievements for reaching milestones |

The purpose of gamification is to encourage consistent outdoor exploration rather than to turn nature into a competition.

---

## 🔧 Configuration and Customization

### Change the AI Model

The model identifier is configured in `script.js`:

```javascript
const MODEL = "onnx-community/Qwen2.5-0.5B-Instruct";
```

You can experiment with another compatible model, but it must have suitable model files and support the task and runtime configuration used by the application.

Before switching models, check:

- Whether the model is compatible with Transformers.js.
- Whether a suitable ONNX version is available.
- Whether the selected quantization is supported.
- Whether the model fits your device's memory and performance limits.
- The model's license and usage restrictions.

Changing only the model name does not guarantee compatibility.

### Customize the Experience

You can modify the project to add:

- More mission categories.
- Custom XP and leveling rules.
- New achievement badges.
- A weekly outdoor challenge.
- A nature journal.
- Daily mission recommendations.
- Weather-aware mission suggestions.
- Accessibility settings.
- A map of outdoor locations.
- Optional offline-friendly mission packs.

Any feature that depends on live weather, maps, or external information may require an additional data source or service.

---

## 🐛 Troubleshooting

### The AI model takes a long time to load

The model must be downloaded and initialized before inference can begin.

**Try this:**
- Check your internet connection.
- Wait for the initial download to finish.
- Reload the page if loading becomes stuck.
- Close unnecessary tabs if your device has limited memory.

### AI generation fails

Possible causes include a network issue, a model-loading error, insufficient resources, or an unexpected model response.

**Try this:**
1. Open your browser's developer tools.
2. Select the Console tab.
3. Look for JavaScript, model-loading, or inference errors.
4. Refresh the page and try again.
5. Confirm that the configured model is accessible and compatible.

The application includes fallback mission logic, but the exact behavior depends on the current implementation.

### WebGPU is unavailable

The configured code can use WebAssembly as a fallback when WebGPU is not available. Inference may be slower on some devices.

Update your browser if necessary and check its support for WebGPU.

### Progress disappears

Progress is stored in browser local storage.

It may be lost if you:
- Clear browser data.
- Use private browsing.
- Switch browsers or devices.
- Change the site's origin or local development address.
- Modify the application's storage keys.

Local storage is not cloud synchronization or a backup system.

### The page does not load correctly

Make sure you are running the app through a local HTTP server, such as VS Code Live Server, rather than opening the HTML file directly.

---

## 🔐 Security and Privacy

GreenQuest AI is designed around browser-side AI inference and local progress storage.

- No dedicated backend is required for the basic experience.
- No inference API key is required by the described setup.
- Supported progress information is saved in browser local storage.
- The initial library and model downloads use external hosting.
- Browser local storage is not encrypted application storage and should not be treated as a secure vault.

Avoid entering sensitive personal information into mission prompts. Review dependencies, model assets, and network requests before deploying the application for wider use.

---

## 🌍 Why Open-Source AI Matters

GreenQuest AI is built around the idea that useful AI-powered applications should be accessible to more people, not only those who can afford proprietary AI services or operate complex infrastructure.

### 1. Accessibility

Browser-based inference makes it possible to experiment with AI without setting up a dedicated model server or purchasing an inference API subscription.

### 2. Greater Control

Developers can inspect the application code, experiment with compatible models, customize prompts, and adapt the experience to their needs.

### 3. Learning and Experimentation

Open model ecosystems help developers understand how inference works and explore the practical trade-offs between model size, performance, and quality.

### 4. Less Dependence on Proprietary APIs

Running inference in the browser reduces reliance on a hosted inference API for the core mission-generation flow. The app still relies on external hosting for initial library and model downloads unless those assets are separately hosted.

### 5. AI With a Real-World Purpose

AI does not have to keep people on their screens. GreenQuest AI uses it to encourage people to go outside, notice their surroundings, and build healthier habits.

**The goal is simple: use technology to help people spend more time experiencing the world beyond technology.**

---

## 🛣️ Roadmap

Potential future improvements include:

- [ ] More diverse mission templates and categories.
- [ ] Improved validation of AI-generated mission output.
- [ ] A daily challenge system.
- [ ] Weekly progress summaries.
- [ ] Additional badges and achievement milestones.
- [ ] A nature journal with personal observations.
- [ ] Optional export and import of progress.
- [ ] Improved model-loading feedback.
- [ ] Better support for low-memory devices.
- [ ] Accessibility improvements.
- [ ] Optional weather-aware suggestions.
- [ ] A curated library of missions for use when AI is unavailable.

---

## 🤝 Contributing

Contributions, bug reports, and feature suggestions are welcome!

1. Fork the repository.
2. Create a new branch:

   ```bash
   git checkout -b feature/your-feature
   ```

3. Make your changes.
4. Test the application in a modern browser.
5. Commit your changes:

   ```bash
   git commit -m "Add your feature"
   ```

6. Push your branch:

   ```bash
   git push origin feature/your-feature
   ```

7. Open a pull request describing your changes.

Please keep contributions focused, accessible, and aligned with the project's goal of encouraging meaningful outdoor experiences.

---

## 📜 License

Choose and add an appropriate license before publishing the project. For example, you could use the MIT License for your original application code.

If you choose MIT, add a `LICENSE` file containing the standard MIT License text and your copyright notice. Also review the separate licenses for the AI model, its converted artifacts, and third-party dependencies; the application's license does not automatically change their terms.

---

## 💚 Built for the Touch Grass Challenge

GreenQuest AI explores how open-weight AI can help people reconnect with the natural world.

Instead of using AI only to generate more screen content, this project uses AI to inspire offline action.

**Generate a mission. Step outside. Explore. Earn XP. Repeat.**

🌿 Touch grass. Discover something new. Let open innovation bring AI into the real world.

---

**Made with 🌱, HTML, CSS, JavaScript, and open-source AI.**
