from flask import Flask, jsonify
from flask_cors import CORS
from routes.potato_route import potato_route

app = Flask(__name__)

cors_config = {
    "origins": ["http://localhost:3000"],
    "methods": ["POST"],
}

@app.route('/')
def get_agronect():
    agronect = {
        'name': 'Agronect',
        'description': 'This is the Agronect API'
    }
    return jsonify(agronect)

CORS(app, resources={r"/*": cors_config})

app.register_blueprint(potato_route)

if __name__ == "__main__":
    app.run(port=3000)
