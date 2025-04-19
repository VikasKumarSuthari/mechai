from flask import Flask, jsonify, request
from flask_cors import CORS
from langchain_groq import ChatGroq

app = Flask(__name__)
CORS(app, resources={
    r"/api/*": {
        "origins": ["http://localhost:5173", "http://localhost:8100"],
        "methods": ["POST", "OPTIONS"],
        "allow_headers": ["Content-Type"],
        "supports_credentials": True
    }
})

# Add the required `model` parameter
llm = ChatGroq(
    groq_api_key="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",
    model="llama3-8b-8192"  # or another available model from Groq
)

@app.route('/api/chat', methods=['POST'])
def chat():
    try:
        user_message = request.json.get('message')
        print(user_message)
        
        if not user_message:
            return jsonify({"error": "No message provided"}), 400
        
        response = llm.invoke(user_message)
        ai_response = response.content if hasattr(response, 'content') else str(response)
        print(ai_response)

        return jsonify({"reply": ai_response}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=8100)
