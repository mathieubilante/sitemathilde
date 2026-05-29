from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
# Le cross-origin (CORS) est configuré pour laisser ton futur frontend communiquer sans blocage
CORS(app)

# Amélioration fondamentale : Définition de la personnalité d'Opi IA
OPI_SYSTEM_PROMPT = """Tu es Opi IA, un coach carrière virtuel ultra-bienveillant et dynamique.
Tu accompagnes les étudiants et jeunes diplômés pour décrocher des stages et emplois au niveau national et international.
Style : Amical, motivant, tu tutoies l'utilisateur et utilises quelques émojis. Tu fais des réponses courtes et percutantes."""

@app.route('/api/chat', methods=['POST'])
def chat():
    try:
        data = request.json
        messages_history = data.get('messages', [])
        
        if not messages_history:
            return jsonify({"error": "Aucun message reçu"}), 400

        # Récupération du dernier message envoyé par l'utilisateur
        last_message = messages_history[-1]['content']
        print(f"[Opi IA] Message reçu : {last_message}")

        # --- AMÉLIORATION FUTUR : Connexion à l'API Gemini ---
        # Pour l'instant, on valide la connexion avec une réponse automatique d'Opi IA
        opi_reply = f"Salut ! J'ai bien reçu ton message : '{last_message}'. Je suis Opi IA, ton compagnon de route. Ton serveur Flask est flambant neuf et fonctionne parfaitement ! Prêt à passer à l'étape suivante ?"

        return jsonify({"reply": opi_reply})

    except Exception as e:
        print(f"Erreur : {str(e)}")
        return jsonify({"error": "Erreur interne du serveur Python"}), 500

if __name__ == '__main__':
    # Lancement du serveur sur le port 5000
    app.run(debug=True, port=5000)