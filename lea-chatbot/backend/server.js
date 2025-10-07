require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const app = express();
const PORT = process.env.PORT || 3001;

// Permitir origen configurable (setea FRONTEND_ORIGIN en Railway a tu dominio de Vercel, ej: https://lea-frontend-xxx.vercel.app)
const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN || 'http://localhost:5500'; // puerto dev local del servidor estático si usas uno

app.use(express.json());
app.use(cors({
  origin: (origin, callback) => {
    // permitir requests sin origen (herramientas, servidor-to-server) y el origen configurado
    if (!origin || origin === FRONTEND_ORIGIN) return callback(null, true);
    return callback(new Error('CORS: origen no permitido'), false);
  },
  methods: ['GET','POST'],
  allowedHeaders: ['Content-Type']
}));

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.post('/api/chat', async (req, res) => {
  const { message, history } = req.body;
  if (!message) return res.status(400).json({ error: 'El mensaje es requerido.' });

  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    const chat = model.startChat({
      history: history || [],
      generationConfig: { maxOutputTokens: 500 },
      systemInstruction: "Eres LEA, un asistente de aprendizaje amigable y profesional diseñado para ayudar a estudiantes. Responde de manera clara, concisa y útil, ofreciendo explicaciones y ejemplos cuando sea apropiado."
    });

    const result = await chat.sendMessage(message);
    const responseText = await result.response.text();

    const updatedHistory = [...(history || []),
      { role: "user", parts: [{ text: message }] },
      { role: "model", parts: [{ text: responseText }] }
    ];

    res.json({ text: responseText, history: updatedHistory });
  } catch (error) {
    console.error('Error Gemini:', error);
    if (error?.response?.status === 429) {
      res.status(429).json({ error: 'Demasiadas peticiones. Intenta más tarde.' });
    } else if (error.message && error.message.includes('API key')) {
      res.status(500).json({ error: 'Error de configuración: API Key de Gemini no válida.' });
    } else {
      res.status(500).json({ error: 'Error al procesar la solicitud.' });
    }
  }
});

app.listen(PORT, () => console.log(`LEA backend escuchando en puerto ${PORT}`));