Evil-GUI is a desktop Electron/Node.js interface designed to orchestrate network testing and post-exploitation tools, with integrated support for the Impacket library.

It allows managing multiple targets, sending commands, and displaying output directly in the GUI, simplifying the usage of Python scripts in a controlled penetration testing environment.

⚠️Interface currently under development

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/your-username/evil-gui.git
cd evil-gui

Install Node.js
npm install


Install Impacket

git clone https://github.com/fortra/impacket.git
cd impacket

python3 -m venv venv
source venv/bin/activate

pip install .

Edit renderer.js and set your local paths
const pythonPath = "/absolute/path/to/impacket/venv/bin/python";
const scriptPath = "/absolute/path/to/impacket/examples/";

npm start

REQUIRMENTS
Node.js
Python 3
Impacket

INSTALLATION - bash

git clone <repo-url>
cd evil-gui
chmod +x install.sh
./install.sh
npm start

NOTES
This tool requires a valid target with SMB access (port 445) for modules like psexec
