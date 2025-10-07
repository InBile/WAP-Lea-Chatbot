const BACKEND_URL = (window.LEA_CONFIG && window.LEA_CONFIG.BACKEND_URL) || 'http://localhost:3001';

document.getElementById('send').addEventListener('click', async () => {
  const input = document.getElementById('input');
  const text = input.value.trim();
  if (!text) return;
  appendMessage('user', text);
  input.value = '';

  appendMessage('bot', 'Escribiendo...');
  try {
    const res = await fetch(`${BACKEND_URL}/api/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: text, history: [] })
    });
    const data = await res.json();
    replaceLastBotMessage(data.text || 'Sin respuesta');
  } catch (e) {
    replaceLastBotMessage('Error al contactar el servidor.');
    console.error(e);
  }
});

function appendMessage(role, text) {
  const box = document.getElementById('chat-box');
  const div = document.createElement('div');
  div.className = `message ${role}`;
  div.innerHTML = `<p>${text}</p>`;
  box.appendChild(div);
  box.scrollTop = box.scrollHeight;
}
function replaceLastBotMessage(text) {
  const box = document.getElementById('chat-box');
  const bots = box.querySelectorAll('.message.bot');
  if (bots.length) bots[bots.length - 1].querySelector('p').textContent = text;
}