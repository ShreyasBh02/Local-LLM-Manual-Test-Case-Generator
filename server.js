
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { generateResponse } = require('./tools/ollama_client');
const path = require('path');

const app = express();
const PORT = 3000;

// Enable CORS and JSON parsing
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public')); // Serve the frontend from 'public' folder

/**
 * MASTER TEMPLATE
 * Updated for Manual Test Cases (List Format).
 */
const MASTER_TEMPLATE = (context) => `
You are an expert QA Engineer. Your task is to generate detailed MANUAL Test Cases for the following requirement.

Input:
${context}

Requirements:
1. Output the test cases in a clear LIST format (NOT a table).
2. For each test case, include:
   - **Test Case ID**
   - **Description**
   - **Pre-conditions**
   - **Steps**
   - **Expected Result**
3. Cover happy paths, edge cases, and negative scenarios.
4. Do NOT write code. Write human-readable steps.
`;

/**
 * API Endpoint: /api/generate
 * Handles the user request, wraps in template, calls Ollama, and returns result.
 */
app.post('/api/generate', async (req, res) => {
    try {
        const { input_context, options } = req.body;

        if (!input_context) {
            return res.status(400).json({ error: "input_context is required" });
        }

        const lang = options?.language || "javascript";
        const framework = options?.test_framework || "jest";

        console.log(`Received request: Generating ${lang}/${framework} tests...`);

        // Layer 2 Navigation: Wrap input in Template
        const prompt = MASTER_TEMPLATE(input_context, lang, framework);

        // Layer 3 Tool Execution: Call Ollama
        const ollamaResponse = await generateResponse(prompt, "llama3.2:3b");

        // Return structured response
        res.json({
            test_cases_code: ollamaResponse,
            generated_at: new Date().toISOString()
        });

    } catch (error) {
        console.error("Error generating tests:", error);
        res.status(500).json({
            error: "Failed to generate test cases.",
            details: error.message
        });
    }
});

// Start Server
app.listen(PORT, () => {
    console.log(`✅ Layer 2 Navigation Server running at http://localhost:${PORT}`);
    console.log(`🚀 Ready to generate test cases with Llama 3.2:3b`);
});
