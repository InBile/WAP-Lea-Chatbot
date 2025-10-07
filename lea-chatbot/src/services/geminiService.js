class GeminiService {
    constructor(apiKey) {
        this.apiKey = apiKey;
        this.baseUrl = 'https://api.google.com/gemini'; // Replace with actual Gemini API endpoint
    }

    async sendMessage(message) {
        const response = await fetch(`${this.baseUrl}/send`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.apiKey}`
            },
            body: JSON.stringify({ message })
        });

        if (!response.ok) {
            throw new Error('Failed to send message to Gemini API');
        }

        return response.json();
    }

    async getResponse(messageId) {
        const response = await fetch(`${this.baseUrl}/response/${messageId}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${this.apiKey}`
            }
        });

        if (!response.ok) {
            throw new Error('Failed to retrieve response from Gemini API');
        }

        return response.json();
    }
}

export default GeminiService;