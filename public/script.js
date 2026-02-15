const chatBox = document.getElementById('chat-box');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');

function appendMessage(text, role) {
    const div = document.createElement('div');
    div.classList.add('message', role);

    // Simple improved formatting for code blocks
    if (role === 'assistant' && text.includes('```')) {
        // Basic markdown code block parser
        const formatted = text.replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>');
        div.innerHTML = formatted;
    } else {
        div.innerText = text;
    }

    chatBox.appendChild(div);
    chatBox.scrollTop = chatBox.scrollHeight;
}

async function handleSend() {
    const input = userInput.value.trim();
    if (!input) return;

    appendMessage(input, 'user');
    userInput.value = '';
    sendBtn.disabled = true;
    sendBtn.innerText = "Generating...";

    // Add temporary loading message
    const loadingDiv = document.createElement('div');
    loadingDiv.classList.add('message', 'assistant');
    loadingDiv.innerText = "Thinking...";
    loadingDiv.id = "loading-msg";
    chatBox.appendChild(loadingDiv);

    try {
        const response = await fetch('/api/generate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                input_context: input,
                options: { language: 'javascript', test_framework: 'jest' }
            })
        });

        const data = await response.json();

        // Remove loading message
        document.getElementById('loading-msg').remove();

        if (data.error) {
            appendMessage(`❌ Error: ${data.error}`, 'assistant');
        } else {
            appendMessage(data.test_cases_code || "No code generated.", 'assistant');
        }

    } catch (error) {
        document.getElementById('loading-msg').remove();
        appendMessage(`❌ Network Error: ${error.message}`, 'assistant');
    } finally {
        sendBtn.disabled = false;
        sendBtn.innerText = "Generate Tests 🚀";
    }
}

sendBtn.addEventListener('click', handleSend);

userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleSend();
    }
});
