import os,glob,subprocess
import argparse

header = r'''\documentclass[letterpaper,11pt]{article}
\newlength{\outerbordwidth}
\pagestyle{empty}
\raggedbottom
\raggedright
\usepackage[svgnames]{xcolor}
\usepackage{framed}
\usepackage{tocloft}


%-----------------------------------------------------------
%Edit these values as you see fit

\setlength{\outerbordwidth}{3pt}  % Width of border outside of title bars
\definecolor{shadecolor}{gray}{0.75}  % Outer background color of title bars (0 = black, 1 = white)
\definecolor{shadecolorB}{gray}{0.93}  % Inner background color of title bars


%-----------------------------------------------------------
%Margin setup

\setlength{\evensidemargin}{-0.25in}
\setlength{\headheight}{0in}
\setlength{\headsep}{0in}
\setlength{\oddsidemargin}{-0.25in}
\setlength{\paperheight}{11in}
\setlength{\paperwidth}{8.5in}
\setlength{\tabcolsep}{0in}
\setlength{\textheight}{9.5in}
\setlength{\textwidth}{7in}
\setlength{\topmargin}{-0.3in}
\setlength{\topskip}{0in}
\setlength{\voffset}{0.1in}


%-----------------------------------------------------------
%Custom commands
\newcommand{\resitem}[1]{\item #1 \vspace{-2pt}}
\newcommand{\resheading}[1]{\vspace{8pt}
  \parbox{\textwidth}{\setlength{\FrameSep}{\outerbordwidth}
    \begin{shaded}
\setlength{\fboxsep}{0pt}\framebox[\textwidth][l]{\setlength{\fboxsep}{4pt}\fcolorbox{shadecolorB}{shadecolorB}{\textbf{\sffamily{\mbox{~}\makebox[6.762in][l]{\large #1} \vphantom{p\^{E}}}}}}
    \end{shaded}
  }\vspace{-5pt}
}
\newcommand{\ressubheading}[4]{
\begin{tabular*}{6.5in}{l@{\cftdotfill{\cftsecdotsep}\extracolsep{\fill}}r}
		\textbf{#1} & #2 \\
		\textit{#3} & \textit{#4} \\
\end{tabular*}\vspace{-6pt}}
%-----------------------------------------------------------


\begin{document}
'''


footer = r'''\end{document}
'''

def getnameURI(uri):
	index = 0
	length = len(uri)
	for i in range(length):
		if(uri[i]=='/' or uri[i]=='#'):
			index = i
	return uri[index:length]

def writeJSONtoTEX(data, filename):
  main = r''''''
  space =  r''' '''
  comma = r''', '''

  if (data['my0:aboutPerson']):
    item = data['my0:aboutPerson']
    #write personal information about the user
    main = r'''\begin{tabular*}{7in}{l@{\extracolsep{\fill}}r}
    \textbf{\Large '''+ item['my0:firstName'] + space + item['my0:lastName'] +r'''} & \textbf{\today} \\
    '''+ item['my0:address']['my0:street'] + space + item['my0:address']['my0:postalCode'] + r''' & ''' + item['my0:email'] +r'''\\''' + item['my0:address']['my0:city'] + comma +  getnameURI(item['my0:address']['my0:country']) +r''' & ''' + item['my0:website'] + r'''\\
    \end{tabular*}
    \\'''

  if (data['my0:hasWorkHistory']):
    main = main +  r'''%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
    \resheading{Work History}
    %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
    \begin{itemize}'''
    for item in (data['my0:hasWorkHistory']):
      main = main +  r'''
      \item \ressubheading{''' + item['my0:employedIn']['my0:organizationName'] + r'''}{''' + item['my0:employedIn']['my0:organizationAddress']['my0:city'] + r''', ''' + getnameURI(item['my0:employedIn']['my0:organizationAddress']['my0:country']) + r'''}{''' + item['my0:jobTitle'] + comma + getnameURI(item['my0:endDate'])+ r'''}{''' + item['my0:startDate'] + r''' - ''' + item['my0:endDate'] + r'''}\\
      \begin{itemize}
      \item[]{''' + item['my0:jobDescription'] + r'''}
      \end{itemize}'''

  main = main + r'''\end{itemize}'''

  if (data['my0:hasEducation']):
	  main = main +  r'''%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
	  \resheading{Education}
	  %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
	  \begin{itemize}'''
	  for item in (data['my0:hasEducation']):
		  main = main +  r'''
		  \item \ressubheading{''' + item['my0:studiedIn']['my0:organizationName'] + r'''}{''' + item['my0:studiedIn']['my0:organizationAddress']['my0:city'] + r''', ''' + getnameURI(item['my0:studiedIn']['my0:organizationAddress']['my0:country']) + r'''}{''' + getnameURI(item['my0:degreeType']) + comma + item['my0:eduMajor']+ r'''}{''' + item['my0:eduStartDate'] + r''' - ''' + item['my0:eduGradDate'] + r'''}\\
		  \begin{itemize}
		  \item[]{''' + item['my0:eduDescription'] + r'''}
		  \end{itemize}'''

  main = main + r'''\end{itemize}'''

  if (data['my0:hasCourse']):
	  main = main +  r'''%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
	  \resheading{Courses/Trainings}
	  %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
	  \begin{itemize}'''
	  for item in (data['my0:hasCourse']):
		  main = main +  r'''
		  \item \ressubheading{''' + item['my0:organizedBy']['my0:organizationName'] + r'''}{''' + item['my0:organizedBy']['my0:organizationAddress']['my0:city'] + r''', ''' + getnameURI(item['my0:organizedBy']['my0:organizationAddress']['my0:country']) + r'''}{''' + item['my0:courseTitle'] + comma + item['my0:courseURL']+ r'''}{''' + item['my0:courseStartDate'] + r''' - ''' + item['my0:courseFinishDate'] + r'''}\\
		  \begin{itemize}
		  \item[]{''' + item['my0:courseDescription'] + r'''}
		  \end{itemize}'''
  
  if (data['my0:hasOtherInfo']):
	  main = main +  r'''%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
	  \resheading{Other information}
	  %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
	  \begin{itemize}'''
	  for item in (data['my0:hasOtherInfo']):
		  main = main +  r'''
		  \item[] \ressubheading{''' + getnameURI(item['my0:otherInfoType']) + r'''}{}{}{}
		  \begin{itemize}
		  \item{''' + item['my0:otherInfoDescription'] + r'''}
		  \end{itemize}'''

  main = main + r'''\end{itemize}'''

  content = header + main + footer

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