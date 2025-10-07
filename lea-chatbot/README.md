# LEA Chatbot

LEA (Learning Assistant) is a minimalistic, professional, and secure chatbot designed to assist students in their learning journey. This project utilizes the Google Gemini API for natural language processing and is optimized for deployment on Railway.

## Project Structure

```
lea-chatbot
├── src
│   ├── server.js          # Entry point for the backend application
│   ├── routes
│   │   └── api.js         # API routes for the chatbot
│   ├── controllers
│   │   └── chatController.js # Handles chat interactions
│   ├── services
│   │   └── geminiService.js  # Interacts with the Google Gemini API
│   ├── middleware
│   │   └── auth.js        # Authentication middleware
│   ├── config
│   │   └── index.js       # Configuration settings
│   └── utils
│       └── logger.js      # Logger utility
├── client
│   ├── index.html         # Main HTML file for the frontend
│   ├── styles.css         # Styles for the frontend
│   └── app.js             # JavaScript logic for the frontend
├── package.json            # npm configuration file
├── .env.example            # Template for environment variables
├── .gitignore              # Files to ignore by Git
├── Dockerfile              # Instructions for building a Docker image
└── railway.toml           # Configuration for Railway deployment
```

## Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   cd lea-chatbot
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file from the `.env.example` template and fill in the required values.

## Usage

1. Start the server:
   ```
   npm start
   ```

2. Open your browser and navigate to `http://localhost:3000` to access the chatbot interface.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.