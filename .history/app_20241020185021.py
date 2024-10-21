from flask import Flask, request, jsonify
from flask_socketio import SocketIO, emit
from flask_cors import CORS
import os
import subprocess
import uuid
from celery import Celery

app = Flask(__name__)
CORS(app)
socketio = SocketIO(app, cors_allowed_origins="*")

# 配置Celery
app.config['CELERY_BROKER_URL'] = 'redis://localhost:6379/0'
app.config['CELERY_RESULT_BACKEND'] = 'redis://localhost:6379/0'
celery = Celery(app.name, broker=app.config['CELERY_BROKER_URL'])
celery.conf.update(app.config)

@celery.task
def process_code_task(filename):
    result_file_path = f'./result/{filename}/__maxTxAmount.txt'

    if not os.path.exists('demo'):
        os.makedirs('demo')

    try:
        subprocess.run(['python3', 'api.py'], check=True)
        subprocess.run(['python3', 'slither.py'], check=True)
        subprocess.run(['python3', 'DecompilationOptimization.py'], check=True)

        with open(result_file_path, 'r') as f:
            processed_code = f.read()

        return processed_code
    except subprocess.CalledProcessError as e:
        return f"An error occurred while processing the code: {e}"
    except FileNotFoundError as e:
        return f"File not found: {e}"

@socketio.on('process_code')
def handle_process_code(data):
    if 'code' not in data:
        emit('error', {'message': 'Missing "code" field in data'})
        return

    original_code = data['code']
    file_path = 'demo/user-defined.sol'

    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(original_code)

    task_id = str(uuid.uuid4())
    process_code_task.apply_async(args=['user-defined'], task_id=task_id)
    emit('task_started', {'task_id': task_id})

@socketio.on('check_task_status')
def handle_check_task_status(data):
    task_id = data['task_id']
    task = process_code_task.AsyncResult(task_id)
    if task.state == 'PENDING':
        emit('task_status', {'status': 'pending'})
    elif task.state == 'SUCCESS':
        emit('task_completed', {'processed_code': task.result})
    else:
        emit('task_failed', {'error': str(task.result)})

if __name__ == '__main__':
    socketio.run(app, host='0.0.0.0', port=6666)
