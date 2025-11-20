import requests
import json

OLLAMA_URL = "http://localhost:11434/api/generate"
MODEL_NAME = "gemma:2b"

def generate_question(topic):
    prompt = f"""
Kamu adalah guru profesional.
Buatkan **TEPAT 5 soal pilihan ganda** tentang topik "{topic}".
Setiap soal harus memiliki:
- 4 opsi (A–D)
- 1 jawaban benar
- Penjelasan singkat

Format output:
1. Soal: ...
   A. ...
   B. ...
   C. ...
   D. ...
   Jawaban: ...
   Penjelasan: ...
    """

    payload = {"model": MODEL_NAME, "prompt": prompt, "stream": False}

    try:
        response = requests.post(OLLAMA_URL, json=payload)
        response.raise_for_status()
        result = response.json()

        if "response" in result:
            print("\n🧠 Soal berhasil dihasilkan:\n")
            print(result["response"])
        else:
            print("⚠️ Tidak ada respons dari model.")
    except requests.exceptions.HTTPError as e:
        print(f"❌ HTTP Error: {e}")
    except Exception as e:
        print(f"❌ Error: {e}")

if __name__ == "__main__":
    topic = input("Masukkan topik soal: ")
    print("\n🧠 Menghasilkan soal...\n")
    generate_question(topic)
