
const http = require('http');

/**
 * Sends a prompt to the local Ollama instance and returns the response.
 * @param {string} prompt - The text to send to the LLM.
 * @param {string} model - The model to use (default: llama3.2:3b).
 * @returns {Promise<string>} - The generated text response.
 */
function generateResponse(prompt, model = 'llama3.2:3b') {
    return new Promise((resolve, reject) => {
        const data = JSON.stringify({
            model: model,
            prompt: prompt,
            stream: false
        });

        const options = {
            hostname: 'localhost',
            port: 11434,
            path: '/api/generate',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(data)
            }
        };

        const req = http.request(options, (res) => {
            let body = '';

            res.on('data', (chunk) => body += chunk);

            res.on('end', () => {
                if (res.statusCode >= 200 && res.statusCode < 300) {
                    try {
                        const response = JSON.parse(body);
                        if (response.response) {
                            resolve(response.response);
                        } else {
                            reject(new Error(`Ollama API error: ${JSON.stringify(response)}`));
                        }
                    } catch (e) {
                        reject(new Error(`Failed to parse JSON response: ${e.message}`));
                    }
                } else {
                    reject(new Error(`Ollama API returned status code ${res.statusCode}: ${body}`));
                }
            });
        });

        req.on('error', (e) => {
            reject(new Error(`Connection to Ollama failed: ${e.message}`));
        });

        req.write(data);
        req.end();
    });
}

module.exports = { generateResponse };

// Self-test if run directly
if (require.main === module) {
    generateResponse("Say 'Layer 3 Tool Active'", "llama3.2:3b")
        .then(res => console.log("✅ Tool Test Passed:\n", res))
        .catch(err => console.error("❌ Tool Test Failed:\n", err));
}
