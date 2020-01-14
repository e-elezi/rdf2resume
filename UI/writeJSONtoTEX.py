import os,glob,subprocess
import argparse
# from texDesign import headerCV, generateMainDesign3, generateMainDesign2, generateMainDesign1, generateMainDesign1Enriched, generateMainDesign2Enriched, generateMainDesign3Enriched
from texDesign1 import generateMainDesign1, generateMainDesign1Enriched
from texDesign2 import generateMainDesign2, generateMainDesign2Enriched
from texDesign3 import generateMainDesign3, generateMainDesign3Enriched
from datetime import datetime
import requests


footer = r'''\end{document}
'''

def getnameURI(uri):
	index = 0
	length = len(uri)
	for i in range(length):
		if(uri[i]=='/' or uri[i]=='#'):
			index = i
	return uri[index:length]

def writeJSONtoTEX(data, filename, desingNumber, language):
  main = r''''''

  if(desingNumber==0):
    main = generateMainDesign1(data, language)

  if(desingNumber==1):
    main = generateMainDesign2(data, language)

  if(desingNumber==2):
    main = generateMainDesign3(data, language)
    
  content = main + footer

  completeName = os.path.join('build/static/media/pdf', filename)
  with open(completeName + '.tex','w') as f:
    f.write(content)

  cmd = ['pdflatex', '-interaction', 'nonstopmode', completeName + '.tex']
  proc = subprocess.Popen(cmd)
  proc.communicate()

  os.unlink( filename + '.aux')
  os.unlink( filename + '.log')
  os.system("mv " + filename + ".pdf build/static/media/pdf")
  return f

def writeJSONtoTEXEnriched(data, filename, desingNumber, language):
  main = r''''''

  if(desingNumber==0):
    main = generateMainDesign1Enriched(data, language)

  if(desingNumber==1):
    main = generateMainDesign2Enriched(data, language)

  if(desingNumber==2):
    main = generateMainDesign3Enriched(data, language)
    
  content = main + footer

  completeName = os.path.join('build/static/media/pdf', filename)
  with open(completeName + '.tex','w') as f:
    f.write(content)

  cmd = ['pdflatex', '-interaction', 'nonstopmode', completeName + '.tex']
  proc = subprocess.Popen(cmd)
  proc.communicate()

  os.unlink( filename + '.aux')
  os.unlink( filename + '.log')
  os.system("mv " + filename + ".pdf build/static/media/pdf")
  return f