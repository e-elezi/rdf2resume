import os,glob,subprocess
import argparse
from texDesign import headerCV, generateMainDesign3, generateMainDesign2, generateMainDesign1
from datetime import datetime

footer = r'''\end{document}
'''

def getnameURI(uri):
	index = 0
	length = len(uri)
	for i in range(length):
		if(uri[i]=='/' or uri[i]=='#'):
			index = i
	return uri[index:length]

def writeJSONtoTEX(data, filename, desingNumber):
  main = r''''''

  if(desingNumber==0):
    main = generateMainDesign1(data)

  if(desingNumber==1):
    main = generateMainDesign2(data)

  if(desingNumber==2):
    main = generateMainDesign3(data)
    
  content = headerCV[desingNumber] + main + footer

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