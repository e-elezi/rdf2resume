import os
import json
from datetime import datetime
from flask import Flask, flash, redirect, render_template, request, session, abort, jsonify
from flask_cors import CORS, cross_origin
from writeJSONtoTTL import writeJSONtoTTL

UPLOAD_FOLDER = 'build/static/files'

app = Flask(__name__,template_folder="build", static_folder="build/static")
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
CORS(app, support_credentials=True)

@app.route("/")
def index():
    writeJSONtoTTL('', 'kot.ttl')
    return render_template('index.html')

@app.route('/get_categories', methods=['GET'])
def get_categories():
    return jsonify({'categories': ['Leda', 'Kot']})

@app.route('/submit_form', methods=['POST'])
def submit_form():
    content = request.json
    with open('data.json', 'w', encoding='utf-8') as outfile:
        json.dump(content, outfile, ensure_ascii=False, indent=2)
    return jsonify({'success': ['Yes']})


@app.route('/upload_file', methods=['POST'])
@cross_origin(support_credentials=True)
def process_upload_file():
    directory = os.path.join(app.config['UPLOAD_FOLDER'])
    if not os.path.exists(directory):
        os.mkdir(directory)
    f = request.files['rdf_file']
    filename = f.filename
    filename = filename
    #exists = os.path.isfile(os.path.join(app.config['UPLOAD_FOLDER'],filename))
    path = os.path.join(app.config['UPLOAD_FOLDER'],filename)
    f.save(path)
    return path

if __name__ == "__main__":
    app.run()