import requests
import json
import os
import subprocess

OLLAMA_URL = "http://localhost:11434/api/generate"
MODEL_NAME = "qwen2.5:7b-instruct-q4_K_M"

# Paths
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_PATH = os.path.join(BASE_DIR, "..", "data", "tutorials.json")
JS_GENERATOR = os.path.join(BASE_DIR, "generate_prompt.js")

# Ambil data tutorial
def get_tutorial_by_id(tutorial_id):
    try:
        with open(DATA_PATH, "r", encoding="utf-8") as file:
            tutorials = json.load(file)
            return next((t for t in tutorials if t["id"] == tutorial_id), None)
    except Exception as e:
        print(f"❌ Error membaca file JSON: {e}")
        return None

# Jalankan JS untuk membuat prompt via stdin
def build_prompt_js(content, count=10):
    try:
        proc = subprocess.Popen(
            ["node", JS_GENERATOR],
            stdin=subprocess.PIPE,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            text=True
        )

        # kirim content panjang via STDIN
        js_payload = json.dumps({
            "content": content,
            "count": count
        })

        stdout, stderr = proc.communicate(js_payload)

        if stderr:
            return f"❌ Error JS: {stderr}"

        return stdout.strip()

    except Exception as e:
        return f"❌ Gagal menjalankan JS: {e}"

# Kirim prompt ke Ollama
def send_to_ollama(prompt):
    payload = {
        "model": MODEL_NAME,
        "messages": [{"role": "user", "content": prompt}],
        "stream": False
    }

    try:
        res = requests.post(OLLAMA_URL, json=payload)
        res.raise_for_status()
        return res.json()["message"]["content"]
    except Exception as e:
        return f"❌ Gagal menghubungi Ollama: {e}"

# MAIN
def main():
    try:
        tutorial_id = int(input("Masukkan ID tutorial: "))
    except:
        print("❌ ID harus angka.")
        return

    tutorial = get_tutorial_by_id(tutorial_id)
    if not tutorial:
        print("❌ Tutorial tidak ditemukan.")
        return

    print(f"\n📘 Membuat soal dari modul: {tutorial['title']}\n")

    content = tutorial["content"]

    print("🔧 Membangun prompt otomatis dari gemmaPromptBuilder.js...\n")
    prompt = build_prompt_js(content, count=10)

    if prompt.startswith("❌"):
        print(prompt)
        return

    print("⏳ Menghubungi Ollama...\n")
    result = send_to_ollama(prompt)

    print("\n🧠 HASIL:\n")
    print(result)

if __name__ == "__main__":
    main()
