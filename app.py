from flask import Flask, jsonify, request
#from langchain_ollama import ChatOllama
from flask_cors import CORS
from langchain_groq import ChatGroq
from langchain_ollama import ChatOllama

app = Flask(_name_)
CORS(app, resources={
    r"/api/*": {
        "origins": ["http://localhost:3000", "http://localhost:8100"],
        "methods": ["POST", "OPTIONS"],
        "allow_headers": ["Content-Type"],
        "supports_credentials": True
    }
})

# Initialize the LLaMA model with Ollama
#llm = ChatOllama(model="llama3.2:3b", temperature=0.35)
llm=ChatGroq(groq_api_key="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")

@app.route('/api/chat', methods=['POST'])
def chat():
    try:
        user_message = request.json.get('message')
        
        if not user_message:
            return jsonify({"error": "No message provided"}), 400
        
        # Use llm.chat to get the response from the LLM using the user message
        response = llm.invoke(user_message)
        

        # Extract the content from the AIMessage object
        ai_response = response.content if hasattr(response, 'content') else str(response)

        return jsonify({"response": ai_response}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if _name_ == '_main_':
    app.run(debug=True, port=8100)