# Local LLM Testcase Generator

A local, private tool that uses Ollama (Llama 3.2:3b) to generate comprehensive test cases from your code or requirements.

## 🚀 Features
- **Privacy First**: Runs entirely on your local machine. No data leaves your network.
- **Llama 3.2 Powered**: Uses the efficient 3B parameter model for fast, accurate code generation.
- **3-Layer Architecture**: Built for stability using the A.N.T. architecture (Architecture, Navigation, Tools).
- **Dark Mode UI**: Clean, developer-friendly interface.

## 🛠️ Prerequisites
1. **Ollama**: Must be installed and running (`ollama serve`).
2. **Model**: You must have `llama3.2:3b` pulled.
   ```bash
   ollama pull llama3.2:3b
   ```
3. **Node.js**: Version 18+ recommended.

## 🏁 How to Run

1. **Install Dependencies** (First time only):
   ```bash
   npm install
   ```

2. **Start the Server**:
   ```bash
   node server.js
   ```

3. **Open the UI**:
   - Go to [http://localhost:3000](http://localhost:3000)

## 🏗️ Architecture
- **Layer 1 (Logic)**: `architecture/SOP_001_TestGeneration.md` defines the prompt strategies.
- **Layer 2 (Navigation)**: `server.js` routes requests and applies the templates.
- **Layer 3 (Tools)**: `tools/ollama_client.js` handles the raw API communication.

## 📝 Usage
1. Paste your function or requirement in the text box.
2. Press **Generate Tests**.
3. Copy the generated code block into your test file.

## 🔧 Maintenance
- **Model Change**: Update `DEFAULT_MODEL` in `server.js` or `tools/ollama_client.js`.
- **Prompt Tweak**: Edit `MASTER_TEMPLATE` in `server.js` to change how the AI behaves.
