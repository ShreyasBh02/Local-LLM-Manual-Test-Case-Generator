# SOP 001: Manual Test Case Generation
**Layer**: Logic (Layer 1)  
**Goal**: Generate structured manual test cases (ID, Scenario, Steps, Expected Result) from user input using Ollama.

## 1. Input Specifications
- **Input Data**:
  - `user_query` (string): The requirement description or user story.
  - `model` (string): Default is "llama3.2:3b".

## 2. Logic Flow
1. **Validate Input**: Ensure `user_query` is not empty.
2. **Template Construction**:
   - Wrap `user_query` into the system prompt template:
     > "You are an expert QA Engineer... Input: {user_query} ... Output: Table/List of Manual Test Cases."
3. **LLM Interaction (Tool Execution)**:
   - Call `tools/generate_ollama_response.js`.
   - Payload: `{ model: "llama3.2:3b", prompt: <templated_string>, stream: false }`
4. **Post-Processing**:
   - Receive raw string from Ollama.
   - Strip markdown code fences (```) if requested by the UI, otherwise keep them for display.
   - Return clean response object.

## 3. Output Specifications
- **Success Response**:
  ```json
  {
    "status": "success",
    "test_cases": "describe('Test Group', () => { ... })",
    "meta": { "model": "llama3.2:3b", "duration_ms": 1200 }
  }
  ```
- **Error Response**:
  ```json
  {
    "status": "error",
    "message": "Ollama service unavailable or model not found."
  }
  ```

## 4. Edge Cases
- **Ollama Offline**: Logic must catch connection refused errors and return a user-friendly message.
- **Empty Output**: If LLM returns empty string, retry once or return error.
- **Hallucination**: If output is not code, prompt for strict compliance (Version 2 feature).
