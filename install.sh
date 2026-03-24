#!/bin/bash

set -e

echo "[*] Evil-GUI installer starting..."

# -------------------------
# 1. Check dependencies
# -------------------------
echo "[*] Checking dependencies..."

command -v git >/dev/null 2>&1 || { echo "[-] git not installed"; exit 1; }
command -v python3 >/dev/null 2>&1 || { echo "[-] python3 not installed"; exit 1; }
command -v npm >/dev/null 2>&1 || { echo "[-] npm not installed"; exit 1; }

# -------------------------
# 2. Install Node deps
# -------------------------
echo "[*] Installing Node.js dependencies..."
npm install

# -------------------------
# 3. Install Impacket
# -------------------------
echo "[*] Cloning Impacket..."

if [ ! -d "impacket" ]; then
    git clone https://github.com/fortra/impacket.git
else
    echo "[*] Impacket already exists, skipping clone"
fi

cd impacket

# -------------------------
# 4. Create venv
# -------------------------
echo "[*] Creating virtual environment..."

if [ ! -d "venv" ]; then
    python3 -m venv venv
else
    echo "[*] venv already exists"
fi

source venv/bin/activate

# -------------------------
# 5. Install Impacket
# -------------------------
echo "[*] Installing Impacket..."
pip install --upgrade pip
pip install .

cd ..

# -------------------------
# 6. Done
# -------------------------
echo "[+] Installation complete!"

echo ""
echo "Next steps:"
echo "1. Update renderer.js paths:"
echo "   pythonPath = $(pwd)/impacket/venv/bin/python"
echo "   scriptPath = $(pwd)/impacket/examples/"
echo ""
echo "2. Run the app:"
echo "   npm start"
