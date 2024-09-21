#!/bin/bash

# Update and install dependencies
apt-get update
apt-get install -y python3-pip python3-venv

# Create a directory for the application
mkdir -p /opt/myapp
cd /opt/myapp

# Create and activate a virtual environment
python3 -m venv venv
source venv/bin/activate

# Install required Python packages
pip install flask azure-storage-blob flask-cors azure-identity azure-keyvault-secrets

# Create the Python script
cat << EOF > app.py
import os
from flask import Flask, request, jsonify
from azure.storage.blob import BlobServiceClient
from flask_cors import CORS
from azure.identity import ManagedIdentityCredential
from azure.keyvault.secrets import SecretClient

app = Flask(__name__)
CORS(app)

key_vault_url = "https://p1-keyvault-7008.vault.azure.net/"

credential = ManagedIdentityCredential()
client = SecretClient(vault_url=key_vault_url, credential=credential)

secret_name = "storage-access-keys"
secret = client.get_secret(secret_name).value

connection_string = secret
blob_service_client = BlobServiceClient.from_connection_string(connection_string)
container_name = "p1-media"
your_storage_name = "projectonestorage7008"

@app.route('/upload', methods=['POST'])
def upload_file():
    file = request.files['file']
    image_name = request.form['projectName']
    
    if file:
        blob_client = blob_service_client.get_blob_client(container=container_name, blob=file.filename)
        blob_client.upload_blob(file)

        file_url = f"https://{your_storage_name}.blob.core.windows.net/{container_name}/{file.filename}"

        return jsonify({"status": "success", "file_url": file_url}), 200
    else:
        return jsonify({"status": "failed", "message": "No file provided"}), 400

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=80)
EOF

# Start the Flask application
nohup python app.py > /var/log/myapp.log 2>&1 &