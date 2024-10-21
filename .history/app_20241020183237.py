from flask import Flask, request, jsonify, Response
from flask_cors import CORS
import os
import subprocess
import time

app = Flask(__name__)
CORS(app)

def process(filename):
    # ... (保持原有的 process 函数不变)

@app.route('/process_code', methods=['POST'])
def process_code():
    data = request.get_json()
    if 'code' not in data:
        return jsonify({'error': 'Missing "code" field in JSON'}), 400

    original_code = data['code']
    file_path = 'demo/user-defined.sol'

    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(original_code)

    def generate():
        yield 'data: Processing started\n\n'
        processed_code = process('user-defined')
        yield f'data: {processed_code}\n\n'

    return Response(generate(), mimetype='text/event-stream')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=6666)
