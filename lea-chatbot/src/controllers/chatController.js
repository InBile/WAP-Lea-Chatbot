class ChatController {
    constructor(geminiService) {
        this.geminiService = geminiService;
    }

    async handleChat(req, res) {
        const { message } = req.body;

        if (!message) {
            return res.status(400).json({ error: 'Message is required' });
        }

        try {
            const response = await this.geminiService.sendMessage(message);
            return res.status(200).json({ response });
        } catch (error) {
            console.error('Error handling chat:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}

export default ChatController;