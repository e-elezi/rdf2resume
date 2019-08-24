import os
import requests
import json
import urllib.parse
from datetime import datetime
from flask import Flask, flash, redirect, render_template, request, session, abort, jsonify
from flask_cors import CORS, cross_origin
from writeJSONtoTTL import writeJSONtoTTL

app = Flask(__name__,template_folder="build", static_folder="build/static")
CORS(app, support_credentials=True)

@app.route("/")
def index():
    #writeJSONtoTTL('', 'kot.ttl')
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