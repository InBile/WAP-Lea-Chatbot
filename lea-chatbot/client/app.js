// This file contains the JavaScript logic for the frontend. It handles user input, sends messages to the backend, and updates the chat interface with responses.

document.addEventListener('DOMContentLoaded', () => {
    const chatForm = document.getElementById('chat-form');
    const chatInput = document.getElementById('chat-input');
    const chatOutput = document.getElementById('chat-output');

    chatForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const userMessage = chatInput.value;
        chatInput.value = '';

        appendMessage('You: ' + userMessage);
        const response = await sendMessageToServer(userMessage);
        appendMessage('LEA: ' + response);
    });

    async function sendMessageToServer(message) {
        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            return data.reply;
        } catch (error) {
            console.error('Error sending message:', error);
            return 'Sorry, there was an error processing your request.';
        }
    }

    function appendMessage(message) {
        const messageElement = document.createElement('div');
        messageElement.textContent = message;
        chatOutput.appendChild(messageElement);
    }
});