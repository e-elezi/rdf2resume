import os
import base64
import requests
import json
import urllib.parse
from datetime import datetime
from flask import Flask, flash, redirect, render_template, request, session, abort, jsonify
from flask_cors import CORS, cross_origin
from writeJSONtoTEX import writeJSONtoTEX

app = Flask(__name__,template_folder="build", static_folder="build/static")
CORS(app, support_credentials=True)
app.config['UPLOAD_FOLDER'] = "build/static/media/pdf"

@app.route("/")
def index():
    return render_template('index.html')

@app.route('/get_categories', methods=['GET'])
def get_categories():
    return jsonify({'categories': ['Leda', 'Kot']})

@app.route('/submit_form', methods=['POST'])
def submit_form():
    content = request.json
    with open('data2.json', 'w', encoding='utf-8') as outfile:
        json.dump(content, outfile, ensure_ascii=False, indent=2)
    return jsonify({'success': ['Yes']})

@app.route('/generate_pdf', methods=['POST'])
def generate_pdf():
    content = request.json
    if not os.path.exists('build/static/media/pdf'):
      os.mkdir('build/static/media/pdf')
    writeJSONtoTEX(content, "rdf2resume")
    return "static/media/pdf/rdf2resume.pdf"

@app.route('/upload', methods=['POST'])
@cross_origin()
def process_upload_file():
    if request.method == 'POST':
      f = request.files['file']
      file_content = f.read()
      url = "http://rdf-translator.appspot.com/convert/"+ request.args['standard'] +"/json-ld/content"
      payload = "content=" +  urllib.parse.quote(file_content)
      headers = {
        'Content-Type': "application/x-www-form-urlencoded",
        'cache-control': "no-cache"
      }
      response = requests.request("POST", url, data=payload, headers=headers)
      return(response.text)
    
if __name__ == "__main__":
    app.run()