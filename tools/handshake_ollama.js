
const http = require('http');

const data = JSON.stringify({
    model: "llama3.2:3b",
    prompt: "Say 'Hello, I am ready!' if you can hear me.",
    stream: false
});

const options = {
    hostname: 'localhost',
    port: 11434,
    path: '/api/generate',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': data.length
    }
};

const req = http.request(options, (res) => {
    let body = '';
    res.on('data', (chunk) => body += chunk);
    res.on('end', () => {
        try {
            console.log('✅ Ollama Connection Successful!');
            console.log('Full Response Body:', body);
            const response = JSON.parse(body);
        } catch (e) {
            console.error('❌ Failed to parse response:', e);
            console.log('Raw Body:', body);
        }
    });
});

req.on('error', (error) => {
    console.error('❌ Ollama Connection Failed:', error.message);
    console.log('Ensure Ollama is running (`ollama serve`) and model `llama3.2` is pulled.');
});

req.write(data);
req.end();
