const { spawn } = require('child_process');
const path = require('path');

function askChatbot(message, user_id = 'anonymous') {
  return new Promise((resolve, reject) => {
    const pythonPath = 'python'; // or 'python3' if needed
    const scriptPath = path.join(__dirname, 'chatbot_model.py');

    const inputJSON = JSON.stringify({ message, user_id });
    const process = spawn(pythonPath, [scriptPath, inputJSON]);

    let result = '';
    let errorOutput = '';

    process.stdout.on('data', (data) => {
      result += data.toString();
    });

    process.stderr.on('data', (data) => {
      errorOutput += data.toString();
    });

    process.on('close', (code) => {
      if (code === 0) {
        try {
          const parsed = JSON.parse(result);
          resolve(parsed);
        } catch (err) {
          reject({ error: 'Failed to parse chatbot response', details: result });
        }
      } else {
        reject({ error: 'Chatbot subprocess failed', code, details: errorOutput });
      }
    });
  });
}

module.exports = askChatbot;
