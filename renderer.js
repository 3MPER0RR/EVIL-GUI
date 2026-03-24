const { spawn } = require('child_process');

let currentProc = null;

window.onload = () => {

  // ENTER KEY FIX
  const cmdInput = document.getElementById("cmdInput");
  if (cmdInput) {
    cmdInput.addEventListener("keypress", function(e) {
      if (e.key === "Enter") {
        sendCommand();
      }
    });
  }

};

// ---------- RUN MODULE ----------
function runModule(module) {
  const target = document.getElementById('targetInput')?.value;
  const user = document.getElementById('userInput')?.value;
  const pass = document.getElementById('passInput')?.value;

  if (!target) {
    appendOutput("[!] No target specified\n");
    return;
  }

  const pythonPath = "/Users/tony/Desktop/evil-gui/imp/impvm/bin/python3.10";
  const scriptPath = `/Users/tony/Desktop/evil-gui/imp/impacket/examples/${module}.py`;

  appendOutput(`\n> Starting ${module} on ${target}\n`);

  try {
    currentProc = spawn(pythonPath, [
      scriptPath,
      `${user}:${pass}@${target}`
    ]);

    currentProc.stdout.on('data', (data) => {
      appendOutput(data.toString());
    });

    currentProc.stderr.on('data', (data) => {
      appendOutput(data.toString());
    });

    currentProc.on('close', (code) => {
      appendOutput(`\n[process closed: ${code}]\n`);
      currentProc = null;
    });

    currentProc.on('error', (err) => {
      appendOutput(`[ERROR] ${err.message}\n`);
      currentProc = null;
    });

  } catch (e) {
    appendOutput(`[CRASH] ${e.message}\n`);
  }
}

// ---------- SEND COMMAND ----------
function sendCommand() {
  const cmdInput = document.getElementById('cmdInput');
  if (!cmdInput) return;

  const cmd = cmdInput.value.trim();
  if (!cmd) return;

  if (!currentProc) {
    appendOutput("[!] No active session\n");
    return;
  }

  appendOutput(`> ${cmd}\n`);

  try {
    currentProc.stdin.write(cmd + "\n");
  } catch (e) {
    appendOutput(`[ERROR stdin] ${e.message}\n`);
  }

  cmdInput.value = "";
}

// ---------- CONSOLE ----------
function appendOutput(text) {
  const out = document.getElementById('output');
  if (!out) return;

  out.textContent += text;
  out.scrollTop = out.scrollHeight;
}