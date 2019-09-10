from datetime import datetime

headerCV = [
   r'''\documentclass[letterpaper,11pt]{article}
    \newlength{\outerbordwidth}
    \pagestyle{empty}
    \raggedbottom
    \raggedright
    \usepackage[svgnames]{xcolor}
    \usepackage{framed}
    \usepackage{tocloft}

    \usepackage[T1]{fontenc}
    \usepackage{lmodern}
    \usepackage[utf8]{inputenc}
    \usepackage[]{babel}


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
    ''',
   r'''%%% LaTeX Template: Designer's CV
   %%%
   %%% Source: http://www.howtotex.com/
   %%% Feel free to distribute this template, but please keep the referal to HowToTeX.com.
   %%% Date: March 2012
   
   
   %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
   % Document properties and packages
   %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
   \documentclass[a4paper,12pt,final]{memoir}
   
   % misc
   \renewcommand{\familydefault}{bch}	% font
   \pagestyle{empty}					% no pagenumbering
   \setlength{\parindent}{0pt}			% no paragraph indentation
   
   
   % required packages (add your own)
   \usepackage{flowfram}										% column layout
   \usepackage[top=1cm,left=1cm,right=1cm,bottom=1cm]{geometry}% margins
   \usepackage{graphicx}										% figures
   \usepackage{url}											% URLs
   \usepackage[usenames,dvipsnames]{xcolor}					% color
   \usepackage{multicol}										% columns env.
   \setlength{\multicolsep}{0pt}
   \usepackage{paralist}										% compact lists
   \usepackage{tikz}
   \usepackage{hyperref}
   \usepackage[utf8]{inputenc}
   
   %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
   % Create column layout
   %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
   % define length commands
   \setlength{\vcolumnsep}{\baselineskip}
   \setlength{\columnsep}{\vcolumnsep}
   
   % frame setup (flowfram package)
   % left frame
   \newflowframe{0.2\textwidth}{\textheight}{0pt}{0pt}[left]
   \newlength{\LeftMainSep}
   \setlength{\LeftMainSep}{0.2\textwidth}
   \addtolength{\LeftMainSep}{1\columnsep}
   
   % small static frame for the vertical line
   \newstaticframe{1.5pt}{\textheight}{\LeftMainSep}{0pt}
   
   % content of the static frame
   \begin{staticcontents}{1}
   \hfill
   \tikz{%
	\draw[loosely dotted,color=RoyalBlue,line width=1.5pt,yshift=0]
	(0,0) -- (0,\textheight);}%
   \hfill\mbox{}
   \end{staticcontents}
    
   % right frame
   \addtolength{\LeftMainSep}{1.5pt}
   \addtolength{\LeftMainSep}{1\columnsep}
   \newflowframe{0.7\textwidth}{\textheight}{\LeftMainSep}{0pt}[main01]
   
   
   %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
   % define macros (for convience)
   %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
   \newcommand{\Sep}{\vspace{1.5em}}
   \newcommand{\SmallSep}{\vspace{0.5em}}
   
   \newenvironment{AboutMe}
	{\ignorespaces\textbf{\color{RoyalBlue} About me}}
	{\Sep\ignorespacesafterend}
	
   \newcommand{\CVSection}[1]
	{\Large\textbf{#1}\par
	\SmallSep\normalsize\normalfont}
       
   \newcommand{\CVItem}[1]
	{\textbf{\color{RoyalBlue} #1}}
   
   
   %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
   % Begin document
   %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
   \begin{document}''',
   r'''% Copyright (C) 2012  Nicola Fontana <ntd at entidi.it>
   %
   % This program can be redistributed and/or modified under
   % the terms of the LaTeX Project Public License, either
   % version 1.3 of this license or (at your option) any later
   % version. The latest version of this license is in
   %   http://www.latex-project.org/lppl.txt
   % and version 1.3 or later is part of all LaTeX distributions
   % version 2005/12/01 or later. 
   %
   %  Based on the original idea by Alessandro Plasmati found at
   % http://www.latextemplates.com/template/two-column-one-page-cv 
   %
   % The most relevant changes from his work are:
   %
   % * this is a class, not a template document;
   % * tccv is based on scrartcl (from Koma-script), not on article;
   % * the fonts are selected from the PSNFSS collection, so no
   %   custom font installation should be required;
   % * heavily based the implementation on custom environments and
   %   macros, so the document is much easier to read (and customize);
   % * it is plain LaTeX/Koma-script, so the CV can be compiled 
   %   with the usual tools, latex and pdflatex included.
   
   \NeedsTeXFormat{LaTeX2e}
   \ProvidesClass{tccv}
              [2012/11/09 v1.0
   Two Column Curriculum Vitae]
   
   \LoadClass[10pt]{scrartcl}
   
   \setcounter{secnumdepth}{-1}
   \RequirePackage[hmargin=1.25cm,vmargin=1.25cm,twocolumn,columnsep=1.25cm]{geometry}
   \RequirePackage{bookman,etoolbox,hyperref,marvosym,needspace,tabularx,xcolor}
   
   % Capitalize words of at least a minimum length (default to 3 chars).
   % The text is capitalized before being expanded.
   %
   % This macro uses Lua to do the job but fails gracefully (that is,
   % return the text as is) if \directlua is not available.
   %
   % |[
   % \ucwords[optional: miminum length]{text}
   % ]|
   \newcommand\ucwords[2][3]{%
    % Fails gracefully if not in LuaLaTeX
    \providecommand\directlua[1]{#2}%
    \directlua{%
	local minlen=tonumber("#1")
	local src="\luaescapestring{\unexpanded{#2}}"
	local dst={}
	for w in src:gmatch('[^\string\%s]+') do
	    if w:len() >= minlen then w = w:sub(1,1):upper()..w:sub(2) end
	    table.insert(dst, w)
	end
	tex.print(dst)}}
   
   \pagestyle{empty}
   \setlength\parindent{0pt}
   \color[HTML]{303030} % Default foreground color
   \definecolor{link}{HTML}{506060} % Hyperlinks
   \hypersetup{colorlinks,breaklinks,urlcolor=link,linkcolor=link}
   \setkomafont{disposition}{\color[HTML]{801010}}
   \setkomafont{section}{\scshape\Large\mdseries}
   
   % In tccv \part must contain the subject of the curriculum vitae.
   % The command will start a new page and output in onecolumn the
   % subject (first and last name) with the hardcoded text
   % "Curriculum vitae" under it.
   \renewcommand\part[1]{%
    \twocolumn[%
    \begin{center}
	\vskip-\lastskip%
	{\usekomafont{part} #1} \medskip\\
	{\fontfamily{pzc}\selectfont\Huge Curriculum vitae}
	\bigskip
    \end{center}]}
   
   % Overrides the \section command to capitalize every
   % word for cosmetic purposes and draws a rule under it.
   \makeatletter
   \let\old@section\section
   \renewcommand\section[2][]{%
    \old@section[#1]{\ucwords{#2}}%
    \newdimen\raising%
    \raising=\dimexpr-0.7\baselineskip\relax%
    \vskip\raising\hrule height 0.4pt\vskip-\raising}
   \makeatother
   
   % Allow conditionals based on the job name. This can usually be set
   % from a command-line argument: check fausto.en.tex for an example.
   %
   % |[
   % \ifjob{jobname}{content if matches}{content if does not match}
   % ]|
   \newcommand\ifjob[3]{%
    \edef\JOBNAME{\jobname}%
    \edef\PIVOT{\detokenize{#1}}%
    \ifdefstrequal{\JOBNAME}{\PIVOT}{#2}{#3}%
   }
   
   % Renders a personal data box:
   %
   % |[
   % \personal[optional: web site without scheme (no http:// prefix)]
   %          {address}{phone number}{email}
   % ]|
   \newcommand\personal[4][]{%
    \needspace{0.5\textheight}%
    \newdimen\boxwidth%
    \boxwidth=\dimexpr\linewidth-2\fboxsep\relax%
    \colorbox[HTML]{F5DD9D}{%
    \begin{tabularx}{\boxwidth}{c|X}
    \Writinghand & {#2}\smallskip\\
    \Telefon     & {#3}\smallskip\\
    \Letter      & \href{mailto:#4}{#4}
    \ifstrempty{#1}{}{\smallskip\\ \Lightning & \href{http://#1}{#1}}
    \end{tabularx}}}

   % Every \item can be followed by one or more paragraphs
   % of description: 
   %
   % |[
   % \item{date range}{company}{role}
   %
   % Description of what achieved during this application.
   % ]|
   \newenvironment{eventlist}{%
    \newcommand*\inskip{}
    \renewcommand\item[3]{%
	\inskip%
	{\raggedleft\textsc{##1}\\[1pt]}
	{##2}\\[2pt]
	{\Large\textit{##3}}
	\medskip
	\renewcommand\inskip{\bigskip}}}
    {\bigskip}
   
   % Use only \item inside this environment: no other macros
   % are allowed: 
   %
   % |[
   % \item[optional: what has been achieved]{years}{subject}{notes}
   % ]|
   \newenvironment{yearlist}{%
    \renewcommand\item[4][]{%
	{\textsc{##2}} & {\bfseries ##3} \\
	\ifstrempty{##1}{}{& {\textsc{##1}} \\}
	& {\textit{##4}}\medskip\\}
    \tabularx{\linewidth}{rX}}
    {\endtabularx}
   
   
   % Use only \item inside this environment: no other macros
   % are allowed:
   %
   % |[
   % \item{fact}{description}
   % ]|
   \newenvironment{factlist}{%
    \newdimen\unbaseline
    \unbaseline=\dimexpr-\baselinestretch\baselineskip\relax
    \renewcommand\item[2]{%
	\textsc{##1} & {\raggedright ##2\medskip\\}\\[\unbaseline]}
    \tabularx{\linewidth}{rX}}
    {\endtabularx}
   %%
    \usepackage[utf8]{inputenc}

    \newenvironment{otherlist}{%
    \newcommand*\inskip{}
    \renewcommand\item[2]{%
	\inskip%
	{##2}\\[2pt]
	\renewcommand\inskip{\bigskip}}}
    {\bigskip}

   \begin{document}
   '''
]

main = r''''''
space =  r''' '''
comma = r''', '''
workTitle = {
  "en": 'Work experience',
  "de": 'Berufserfahrung',
  "fr": 'Expérience de travail',
  "it": 'Esperienza di lavoro'
}
educationTitle = {
  "en": 'Education',
  "de": 'Ausbildung',
  "fr": "L'éducation",
  "it": 'Educazione'
}
languageTitle = {
  "en": 'Language Skills',
  "de": 'Sprachkenntnisse',
  "fr": "Compétences linguistiques",
  "it": 'Competenze linguistiche'
}
skillTitle = {
  "en": 'Other Skills',
  "de": 'Andere Fähigkeiten',
  "fr": "Autres compétences",
  "it": 'Altre competenze'
}
referenceTitle = [
  {
  "en": 'References',
  "de": 'Referenzen',
  "fr": "Les références",
  "it": 'Riferimenti'
  },
  {
  "en": 'References upon request.',
  "de": 'Referenzen auf Anfrage.',
  "fr": "Références sur demande.",
  "it": 'Riferimenti su richiesta.'
  }
] 
courseTitle = {
  "en": 'Course/Training',
  "de": 'Kurs/Training',
  "fr": "Cours/Training",
  "it": 'Corso/Training'
}
aboutMeTitle = {
  "en": 'About me',
  "de": 'Über mich',
  "fr": "À mon sujet",
  "it": 'Su di me'
}
otherInfoTitle = {
  "en": 'Other Information',
  "de": 'Sonstige Informationen',
  "fr": "Autres informations",
  "it": 'Altre informazioni'
}
skilllevel = [
  {
  "en": 'Good Level',
  "de": 'Gutes Niveau',
  "fr": "Bon niveau",
  "it": 'Buon livello'
  },
  {
  "en": 'Intermediate',
  "de": 'Mittelstufe',
  "fr": "Intermédiaire",
  "it": 'Intermedio'
  }, 
  {
  "en": 'Basic level',
  "de": 'Grundstufe',
  "fr": "Niveau de base",
  "it": 'Livello base'
  }
]

def getnameURI(uri):
	index = 0
	length = len(uri)
	for i in range(length):
		if(uri[i]=='/' or uri[i]=='#'):
			index = i
	return uri[index:length]

def generateMainDesign3(data, language):
    if (data['my0:aboutPerson']):
      item = data['my0:aboutPerson']
      main = r'''
      
      \part{'''+ item['my0:firstName'] + space + item['my0:lastName'] +r'''}
      
      '''
    if(data['my0:hasWorkHistory']):
      main = main +  r'''
      
      \section{''' + workTitle[language] + r'''}
 
      \begin{eventlist}
      
      '''
      for item in (data['my0:hasWorkHistory']):
        startDateString = ''
        endDateString = ''
        if(item['my0:startDate'] !=''):
            startDate = datetime.strptime(item['my0:startDate'], '%Y-%m-%d')
            startDateString = startDate.strftime("%b %Y")
        if(item['my0:endDate'] !=''):
            endDate = datetime.strptime(item['my0:endDate'], '%Y-%m-%d')
            endDateString = endDate.strftime("%b %Y")
        if(item['my0:isCurrent'] == True):
            endDateString = 'Now '
        endDate = datetime.strptime(item['my0:endDate'], '%Y-%m-%d')
        main = main + r'''
        \item{''' + startDateString + r''' - ''' + endDateString + r'''}
        {''' + item['my0:employedIn']['my0:organizationName'] + r''', ''' + item['my0:employedIn']['my0:organizationAddress']['my0:city'] + r'''}
        {''' + item['my0:jobTitle'] + r'''}

        ''' + item['my0:jobDescription'] + r'''

        '''
    main = main + r'''\end{eventlist}
    
    '''
    if (data['my0:aboutPerson']):
      item = data['my0:aboutPerson']
      main = main + r'''
      \personal
        [''' + item['my0:hasWebsite'][0]['my0:websiteURL'] + r''']
        {''' + item['my0:address']['my0:street'] + comma + item['my0:address']['my0:postalCode'] + r'''\newline ''' + item['my0:address']['my0:city'] + r''' (''' + getnameURI(item['my0:address']['my0:country']) + r''')}
        {''' + item['my0:phoneNumber'][0] + r'''}
        {''' + item['my0:email'] + r'''}

      '''
    if(data['my0:hasEducation']):
      main = main +  r'''
      
      \section{''' + educationTitle[language] + r'''}
      
      \begin{yearlist}
      
      '''
      for item in (data['my0:hasEducation']):
        startDateString = ''
        endDateString = ''
        if(item['my0:eduStartDate'] !=''):
            startDate = datetime.strptime(item['my0:eduStartDate'], '%Y-%m-%d')
            startDateString = startDate.strftime("%Y")
        if(item['my0:eduGradDate'] !=''):
            endDate = datetime.strptime(item['my0:eduGradDate'], '%Y-%m-%d')
            endDateString = endDate.strftime("%Y")
        if(item['my0:isEduCurrent'] == True):
            endDateString = 'Now '
        main = main + r'''

        \item[''' + getnameURI(item['my0:degreeType']) + r''']{''' + startDateString + r''' -- ''' + endDateString + r'''}
        {''' + item['my0:degree'] + r'''}
        {''' + item['my0:studiedIn']['my0:organizationName'] + r''', ''' + item['my0:studiedIn']['my0:organizationAddress']['my0:city'] + r'''}

        '''
    main = main + r'''\end{yearlist}
    
    '''
    if(data['my0:hasSkill']):
        #print language skills
        main = main + r'''
        \section{Language skills}
        
        \begin{factlist}
        '''
        for item in (data['my0:hasSkill']):
            if(item['@type'] == 'my0:LanguageSkill'):
                main = main + r'''
                \item{''' + item['my0:skillName'] + r'''}
                '''
        main = main + r'''
        \end{factlist}
        '''
        #print basic skills
        main = main + r'''
        
        \section{''' + skillTitle[language] + r'''}
        
        \begin{factlist}

        \item{''' + skilllevel[0][language] + r'''}
            {
        '''
        for item in (data['my0:hasSkill']):
            if(item['@type'] == 'my0:Skill' and ord(item['my0:skillLevel']) >= 4 ):
                main = main + item['my0:skillName'] + r''' '''
        main = main + r'''}
        
        '''
        #print intermediate skills
        main = main + r'''
                
        \item{''' + skilllevel[1][language] + r'''}
            {
        '''
        for item in (data['my0:hasSkill']):
            if(item['@type'] == 'my0:Skill' and ord(item['my0:skillLevel']) >= 2 and ord(item['my0:skillLevel']) < 4 ):
                main = main + item['my0:skillName']+ r''' '''
        main = main + r'''}
        
        '''
        #print basic skills
        main = main + r'''
                
        \item{''' + skilllevel[2][language] + r'''}
            {
        '''
        for item in (data['my0:hasSkill']):
            if(item['@type'] == 'my0:Skill' and ord(item['my0:skillLevel']) == 1 ):
                main = main + item['my0:skillName']+ r''' '''
        main = main + r'''}
        
        '''
        main = main + r'''\end{factlist}
        
        '''
    if(data['my0:hasOtherInfo']):
        main = main + r'''
        \section{''' + otherInfoTitle[language] + r'''}
        
        \begin{otherlist}
        '''
        for item in (data['my0:hasOtherInfo']):
            main = main + r''' {''' +getnameURI(item['my0:otherInfoType']) + r'''}{\newline ''' +item['my0:otherInfoDescription'] + r'''} '''
        main = main + r'''
        \end{otherlist}
        '''
    return main

def generateMainDesign2(data, language):
    if (data['my0:aboutPerson']):
      item = data['my0:aboutPerson']
      #write personal information about the user
      main = r'''\begin{tabular*}{7in}{l@{\extracolsep{\fill}}r}
      \textbf{\Large '''+ item['my0:firstName'] + space + item['my0:lastName'] +r'''} & \textbf{\today} \\
      '''+ item['my0:address']['my0:street'] + space + item['my0:address']['my0:postalCode'] + r''' & ''' + item['my0:email'] +r'''\\''' + item['my0:address']['my0:city'] + comma +  getnameURI(item['my0:address']['my0:country']) +r''' & ''' + item['my0:hasWebsite'][0]['my0:websiteURL'] + r'''\\
      \end{tabular*}
      \\'''
      main = r'''% Left frame
      %%%%%%%%%%%%%%%%%%%%
      \begin{figure}
        \hfill
        \includegraphics[width=0.6\columnwidth]{''' +'build/static/media/photos/' +item['my0:photo'] + r'''}
        \vspace{-7cm}
      \end{figure} 
      \begin{flushright}\small
	    ''' + item['my0:firstName'] + space + item['my0:lastName'] + r'''\\
	    \url{''' + item['my0:email'] + r'''}  \\
	    \url{''' + item['my0:hasWebsite'][0]['my0:websiteURL'] + r'''} \\
	    ''' + item['my0:phoneNumber'][0] + r'''
      \end{flushright}\normalsize
      \framebreak'''

      main = main +  r'''%Right frame
      %%%%%%%%%%%%%%%%%%%%
      \Huge\bfseries {\color{RoyalBlue} ''' + item['my0:firstName'] + space + item['my0:lastName'] + r'''} \\
      \Large\bfseries  ''' + data['my0:hasTarget']['my0:targetJobTitle'] + r''' \\

      \normalsize\normalfont

      % About me
      \begin{AboutMe}
      ''' + item['my0:personDescription'] + r'''
      \end{AboutMe}\\*'''
    if(data['my0:hasWorkHistory']):
      main = main +  r'''
      
      % Experience
      \CVSection{''' + workTitle[language] + r'''}'''
      for item in (data['my0:hasWorkHistory']):
        main = main + r'''
        \CVItem{''' + item['my0:startDate'] + r''' - ''' + item['my0:endDate'] + ''', ''' + item['my0:jobTitle']  + r'''}\\ ''' + item['my0:jobDescription'] + '''
        \SmallSep'''
    if(data['my0:hasEducation']):
      main = main +  r'''
      
      % Education
      \CVSection{''' + educationTitle[language] + r'''}'''
      for item in (data['my0:hasEducation']):
        main = main + r''' 
        \CVItem{''' + item['my0:eduStartDate'] + r''' - ''' + item['my0:eduGradDate'] + ''', ''' + item['my0:degree'] + comma + getnameURI(item['my0:degreeType'])  + r'''}\\ ''' + item['my0:eduDescription'] + '''
        \SmallSep
        
        '''
      main = main + '''
      \Sep '''
    if(data['my0:hasSkill']):
      main = main +  r'''
      
      % Skills
      \CVSection{Skills}
      \CVItem{''' + languageTitle[language] + r'''}
      \begin{multicols}{3}
      \begin{compactitem}[\color{RoyalBlue}$\circ$]'''
      for items in (data['my0:hasSkill']):
        if(items['@type']=='my0:LanguageSkill'):
          main = main + r'''\item ''' + items['my0:skillName'] + r'''
          ''' 
      main = main + r'''
      \end{compactitem}
      \end{multicols}
      \SmallSep

      \CVItem{''' + skillTitle[language] + r'''}
      \begin{multicols}{3}
      \begin{compactitem}[\color{RoyalBlue}$\circ$]
      '''
      for items in (data['my0:hasSkill']):
        if(items['@type']=='my0:Skill'):
          main = main + r'''\item ''' + items['my0:skillName'] + r'''
          ''' 
      main = main + r'''
      \end{compactitem}
      \end{multicols}
      \Sep

      '''
    if(data['my0:hasOtherInfo']):
      for items in (data['my0:hasOtherInfo']):
        main = main + r'''
        \CVSection{''' + getnameURI(items['my0:otherInfoType']) + r'''}
        ''' + items['my0:otherInfoDescription'] + r'''
        
        '''
    main = main + r'''
      
      % References
      \CVSection{''' + referenceTitle[0][language] + r'''}
      ''' + referenceTitle[1][language] + r'''

      '''
    return main

def generateMainDesign1(data, language):
    if (data['my0:aboutPerson']):
      item = data['my0:aboutPerson']
      #write personal information about the user
      main = r'''\begin{tabular*}{7in}{l@{\extracolsep{\fill}}r}
      \textbf{\Large '''+ item['my0:firstName'] + space + item['my0:lastName'] +r'''} & \textbf{\today} \\
      '''+ item['my0:address']['my0:street'] + space + item['my0:address']['my0:postalCode'] + r''' & ''' + item['my0:email'] +r'''\\''' + item['my0:address']['my0:city'] + comma +  getnameURI(item['my0:address']['my0:country']) +r''' & ''' + item['my0:hasWebsite'][0]['my0:websiteURL'] + r'''\\
      \end{tabular*}
      \\'''

    if (data['my0:hasWorkHistory']):
      main = main +  r'''%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
      \resheading{''' + workTitle[language] + r'''}
      %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
      \begin{itemize}'''
      for item in (data['my0:hasWorkHistory']):
        main = main +  r'''
        \item \ressubheading{''' + item['my0:employedIn']['my0:organizationName'] + r'''}{''' + item['my0:employedIn']['my0:organizationAddress']['my0:city'] + r''', ''' + getnameURI(item['my0:employedIn']['my0:organizationAddress']['my0:country']) + r'''}{''' + item['my0:jobTitle'] + comma + getnameURI(item['my0:jobMode'])+ r'''}{''' + item['my0:startDate'] + r''' - ''' + item['my0:endDate'] + r'''}\\
        \begin{itemize}
        \item[]{''' + item['my0:jobDescription'] + r'''}
        \end{itemize}'''

    main = main + r'''\end{itemize}'''

    if (data['my0:hasEducation']):
	    main = main +  r'''%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
	    \resheading{''' + educationTitle[language] + r'''}
	    %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
	    \begin{itemize}'''
	    for item in (data['my0:hasEducation']):
		    main = main +  r'''
		    \item \ressubheading{''' + item['my0:studiedIn']['my0:organizationName'] + r'''}{''' + item['my0:studiedIn']['my0:organizationAddress']['my0:city'] + r''', ''' + getnameURI(item['my0:studiedIn']['my0:organizationAddress']['my0:country']) + r'''}{''' + getnameURI(item['my0:degreeType']) + comma + item['my0:degree']+ r'''}{''' + item['my0:eduStartDate'] + r''' - ''' + item['my0:eduGradDate'] + r'''}\\
		    \begin{itemize}
		    \item[]{''' + item['my0:eduDescription'] + r'''}
		    \end{itemize}'''

    main = main + r'''\end{itemize}'''

    if (data['my0:hasCourse']):
	    main = main +  r'''%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
	    \resheading{''' + courseTitle[language] + r'''}
	    %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
	    \begin{itemize}'''
	    for item in (data['my0:hasCourse']):
		    main = main +  r'''
		    \item \ressubheading{''' + item['my0:organizedBy']['my0:organizationName'] + r'''}{''' + item['my0:organizedBy']['my0:organizationAddress']['my0:city'] + r''', ''' + getnameURI(item['my0:organizedBy']['my0:organizationAddress']['my0:country']) + r'''}{''' + item['my0:courseTitle'] + comma + item['my0:courseURL']+ r'''}{''' + item['my0:courseStartDate'] + r''' - ''' + item['my0:courseFinishDate'] + r'''}\\
		    \begin{itemize}
		    \item[]{''' + item['my0:courseDescription'] + r'''}
		    \end{itemize}'''

    main = main + r'''\end{itemize}'''
  
    if (data['my0:hasOtherInfo']):
	    main = main +  r'''%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
	    \resheading{''' + otherInfoTitle[language] + r'''}
	    %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
	    \begin{itemize}'''
	    for item in (data['my0:hasOtherInfo']):
		    main = main +  r'''
		    \item[] \ressubheading{''' + getnameURI(item['my0:otherInfoType']) + r'''}{}{}{}\\*''' + item['my0:otherInfoDescription']

    main = main + r'''\end{itemize}'''
    return main