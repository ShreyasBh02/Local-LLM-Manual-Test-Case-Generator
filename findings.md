# Findings

## Research
- Goal: Create a Local LLM Testcase Generator using Ollama.
- Protocol: B.L.A.S.T. (Blueprint, Link, Architect, Stylize, Trigger)

## Discovery Answers
- **North Star**: Local LLM Testcse generator using Ollama (Llama 3.2) with a stored template.
- **Integrations**: Ollama (Llama 3.2).
- **Source of Truth**: User Input via UI.
- **Delivery Payload**: Chat UI displaying generated testcases.
- **Behavioral Rules**: 
    - Takes User Input.
    - Applies defined Template.
    - Sends to Ollama.
    - Returns Output to UI.

## Constraints
- Must use Ollama for LLM inference.
- Must follow the A.N.T. 3-layer architecture.
- Reliability > Speed.
- Model: Llama 3.2.
