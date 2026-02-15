# Project Constitution (Gemini)

## Overview
Local LLM Testcase Generator using Ollama (Llama 3.2) with a Chat UI.

## Data Schemas

### Core Entities
- **TestGenerationRequest**:
  - `input`: string (User's code or description)
  - `template`: string (System stored prompt template)
  - `model`: string (Default: "llama3.2")

- **ChatMessage**:
  - `role`: "user" | "assistant" | "system"
  - `content`: string
  - `timestamp`: integer
### 1. Core Entities

#### `TestGenerationRequest`
The payload sent to the Logic Layer.
```json
{
  "input_context": "string", // User's code snippet or requirement description
  "model_preference": "string", // Default: "llama3.2"
  "options": {
    "language": "string", // e.g., "JavaScript", "Python"
    "test_framework": "string" // e.g., "Jest", "pytest"
  }
}
```

#### `TestGenerationResponse`
The structured output from the System.
```json
{
  "test_cases_code": "string", // The raw code block of generated tests
  "explanation": "string", // Optional reasoning provided by the LLM
  "generated_at": "ISO8601 Timestamp"
}
```

### 2. Application State (Frontend)
- `chat_history`: Array of `{ role: 'user' | 'assistant', content: string }`
- `is_processing`: boolean

## Behavioral Rules

### 1. The "Template" Logic
Since the specific prompt was not provided, the System will use the following **Default Master Template** until overridden:
> "You are an expert QA Automation Engineer. Your task is to generate comprehensive test cases for the following input.
> Input: {{input_context}}
> Requirements:
> 1. Use {{language}} with {{test_framework}}.
> 2. Cover happy paths and edge cases.
> 3. output ONLY the code block."

### 2. Interaction Flow
1. **User** inputs text (Code or Requirement).
2. **System** wraps input in the Master Template.
3. **System** sends to Ollama (`POST /api/generate`).
4. **Ollama** streams response.
5. **System** renders response in Chat UI.

### 3. Reliability & Constraints
- **Model**: strictly `llama3.2`.
- **Output**: The system must strip markdown formatting if returning raw code, or render markdown if in Chat mode.
- **Failover**: If Ollama API is unreachable, return a clear "Service Unavailable" error to the UI, not a silent fail.

## Architectural Invariants (The 3-Layer Standard)
- **Layer 1: Architecture (SOPs)**: All logic defined in `architecture/` SOPs first.
- **Layer 2: Navigation (Routing)**: A thin Node.js or Python middleware that strictly routes User Request -> Template Wrap -> Ollama Tool -> UI.
- **Layer 3: Tools (Execution)**: Atomic scripts (e.g., `ollama_client.py`) that handle the raw API connection.
- **State**: No persistent database required; ephemeral session state only.
- **Config**: `OLLAMA_BASE_URL` and `DEFAULT_MODEL` tracked in `.env`.
