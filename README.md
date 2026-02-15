# Local LLM Manual Test Case Generator

A private, local AI tool that generates structured **Manual Test Cases** from your requirements using Ollama (Llama 3.2).

## 🌟 Overview
This project allows QA Engineers and Developers to instantly generate detailed manual test cases (including Steps, Pre-conditions, and Expected Results) by simply pasting a requirement or user story. It runs entirely on your local machine, ensuring **zero data leakage**.

## 🏗️ Architecture Flow

The system follows a 3-Layer Architecture (A.N.T. Protocol) to ensure reliability.

```mermaid
graph TD
    User[User Input (Requirement)] -->|HTTP POST| UI[Frontend (index.html)]
    UI -->|JSON Payload| Server[Node.js Server (Layer 2)]
    Server -->|Wrap with Prompt Template| Tool[Ollama Tool (Layer 3)]
    Tool -->|API Request| Ollama[Ollama (Llama 3.2:3b)]
    Ollama -->|Generated Text| Tool
    Tool -->|Clean Response| Server
    Server -->|Structured Test Cases| UI
```

### Layers:
1.  **Layer 1 (Logic)**: Defined in `architecture/SOP_001_TestGeneration.md`. This is the "Brain" that dictates how to structure the test cases.
2.  **Layer 2 (Navigation)**: `server.js` acts as the traffic controller. It receives the user input, wraps it in the `MASTER_TEMPLATE`, and routes it to the specific tool.
3.  **Layer 3 (Tools)**: `tools/ollama_client.js` is the "Hand" that executes the raw API call to your local Ollama instance.

## 🚀 Features
- **Privacy First**: No cloud APIs. Your data never leaves your specialized network.
- **Structured Output**: Generates clear lists with ID, Description, Steps, and Expected Results.
- **Dark Mode UI**: A clean, modern interface built with Vanilla JS and CSS.
- **Customizable**: Easily tweak the `MASTER_TEMPLATE` in `server.js` to change the output style (e.g., enable Gherkin syntax).

## 🛠️ Prerequisites
1.  **Ollama**: Install from [ollama.com](https://ollama.com).
2.  **Pull the Model**:
    ```bash
    ollama pull llama3.2:3b
    ```
3.  **Node.js**: Version 18+ installed.

## 🏁 Quick Start

1.  **Clone the Repository**:
    ```bash
    git clone https://github.com/ShreyasBh02/Local-LLM-Manual-Test-Case-Generator.git
    cd Local-LLM-Manual-Test-Case-Generator
    ```

2.  **Install Dependencies**:
    ```bash
    npm install
    ```

3.  **Start the Server**:
    ```bash
    node server.js
    ```

4.  **Use the Tool**:
    - Open `http://localhost:3000` in your browser.
    - Paste your requirement (e.g., "Login page with Google Auth").
    - Click **Generate Tests**.

## 📸 Example Output

**Input:**
> "User should be able to reset their password via email link."

**Generated Output:**
> **TC-001: Verify successful password reset**
> - **Pre-condition**: User exists in DB.
> - **Steps**: 1. Go to Login. 2. Click Forgot Password. 3. Enter Email.
> - **Expected Result**: Email received with valid link.

## 🤝 Contributing
Feel free to fork this project and submit Pull Requests!
- Update `server.js` to add more templates.
- Enhance `public/style.css` for better themes.
