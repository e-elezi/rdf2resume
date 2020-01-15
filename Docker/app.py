import os
import base64
import requests
import json
from datetime import datetime
import urllib.parse
from datetime import datetime
from flask import Flask, flash, redirect, render_template, request, session, abort, jsonify
from flask_cors import CORS, cross_origin
from writeJSONtoTEX import writeJSONtoTEX, writeJSONtoTEXEnriched
from writeJSONtoHTML import writeJSONtoHTML
import shutil

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
@cross_origin()
def submit_form():
    content = request.json
    with open('build/static/resumerdf.json', 'w', encoding='utf-8') as outfile:
      json.dump(content, outfile, ensure_ascii=False, indent=2)
    # f= open("build/static/resumerdfwrite.json","r")
    # file_content = f.read()
    # url = "http://rdf-translator.appspot.com/convert/json-ld/json-ld/content"
    # payload = "content=" +  urllib.parse.quote(file_content)
    # headers = {
    #   'Content-Type': "application/x-www-form-urlencoded",
    #   'cache-control': "no-cache"
    # }
    # response = requests.request("POST", url, data=payload, headers=headers)
    # with open('build/static/resumerdf.json', 'w', encoding='utf-8') as outfile:
    #   json.dump(json.loads(response.text), outfile, ensure_ascii=False, indent=2)
    return "resumerdf.json"

@app.route('/generate_pdf', methods=['POST'])
def generate_pdf():
    req_data = request.get_json()
    content = req_data['data']['cv']
    designNumber = req_data['data']['designNumber']
    language = req_data['data']['language']
    now = datetime.now()
    dt_string = now.strftime("%d_%m_%Y_%H_%M_%S")
    if not os.path.exists('build/static/media/pdf'):
      os.mkdir('build/static/media/pdf')
    writeJSONtoTEX(content, "rdf2resume" + dt_string, designNumber, language )
    return "static/media/pdf/rdf2resume" + dt_string

@app.route('/generate_html', methods=['POST'])
def generate_html():
    req_data = request.get_json()
    content = req_data['data']['cv']
    language = req_data['data']['language']
    now = datetime.now()
    dt_string = now.strftime("%d_%m_%Y_%H_%M_%S")
    # if not os.path.exists('build/static/media/html'):
    #   os.mkdir('build/static/media/html')
    writeJSONtoHTML(content, "rdf2resume", language )
    shutil.make_archive('build/static/rdf2resume', 'zip', 'build/static/media/html')
    return "rdf2resume.zip"

@app.route('/generate_pdf_enriched', methods=['POST'])
def generate_pdf_enriched():
    req_data = request.get_json()
    content = req_data['data']['cv']
    designNumber = req_data['data']['designNumber']
    language = req_data['data']['language']
    now = datetime.now()
    dt_string = now.strftime("%d_%m_%Y_%H_%M_%S")
    if not os.path.exists('build/static/media/pdf'):
      os.mkdir('build/static/media/pdf')
    writeJSONtoTEXEnriched(content, "rdf2resume" + dt_string, designNumber, language )
    return "static/media/pdf/rdf2resume" + dt_string

@app.route('/upload', methods=['POST'])
@cross_origin()
def process_upload_file():
    if request.method == 'POST':
      f = request.files['file']
      file_content = f.read()
      # url = "http://rdf-translator.appspot.com/convert/"+ request.args['standard'] +"/json-ld/content"
      # payload = "content=" +  urllib.parse.quote(file_content)
      # headers = {
      #   'Content-Type': "application/x-www-form-urlencoded",
      #   'cache-control': "no-cache"
      # }
      # response = requests.request("POST", url, data=payload, headers=headers)
      return(file_content)

@app.route('/upload_photo', methods=['POST'])
@cross_origin()
def process_upload_photo():
    if request.method == 'POST':
      f = request.files['file']
      if not os.path.exists('build/static/media/photos'):
        os.mkdir('build/static/media/photos')
      f.save(os.path.join('build/static/media/photos', f.filename))
      return(f.filename)
    
# if __name__ == "__main__":
#     app.run()