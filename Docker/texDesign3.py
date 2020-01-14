from datetime import datetime
from queries import runQueryDBPEDIA, runQueryMainOntology, runQueryCountryMainOntology
from translations import courseTitle, workTitle, educationTitle, languageTitle, referenceTitle, skillTitle, aboutMeTitle, otherTitle, otherInfoTitle, skilllevel, getnameURI, projectTitle, patentTitle, publicationTitle, current, pending, doesURIContainWord

headerCV3 = r'''% Copyright (C) 2012  Nicola Fontana <ntd at entidi.it>
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

  \usepackage{fontawesome}
  \usepackage{hyperref}

   \begin{document}
   '''

main = r''''''
space = r''' '''
comma = r''', '''


def generateMainDesign3(data, language):
    main = headerCV3

    if (data['my0:aboutPerson']):
        item = data['my0:aboutPerson']
        main = main + r'''
      
      \part{''' + item['my0:firstName'] + space + item['my0:lastName'] + r'''}
      
      '''
    if(data['my0:hasWorkHistory']):
        main = main + r'''
      
      \section{''' + workTitle[language] + r'''}
 
      \begin{eventlist}
      
      '''
        for item in (data['my0:hasWorkHistory']):
            startDateString = ''
            endDateString = ''
            if(item['my0:startDate'] != ''):
                startDate = datetime.strptime(
                    item['my0:startDate'], '%Y-%m-%d')
                startDateString = startDate.strftime("%b %Y")
            if(item['my0:endDate'] != ''):
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
        main = main + r'''
      
      \section{''' + educationTitle[language] + r'''}
      
      \begin{yearlist}
      
      '''
        for item in (data['my0:hasEducation']):
            startDateString = ''
            endDateString = ''
            if(item['my0:eduStartDate'] != ''):
                startDate = datetime.strptime(
                    item['my0:eduStartDate'], '%Y-%m-%d')
                startDateString = startDate.strftime("%Y")
            if(item['my0:eduGradDate'] != ''):
                endDate = datetime.strptime(
                    item['my0:eduGradDate'], '%Y-%m-%d')
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
    if(data['my0:hasCourse']):
        main = main + r'''
      
      \section{''' + courseTitle[language] + r'''}
      
      \begin{yearlist}
      
      '''
        for item in (data['my0:hasCourse']):
            startDateString = ''
            endDateString = ''
            if(item['my0:courseStartDate'] != ''):
                startDate = datetime.strptime(
                    item['my0:courseStartDate'], '%Y-%m-%d')
                startDateString = startDate.strftime("%Y")
            if(item['my0:courseFinishDate'] != ''):
                endDate = datetime.strptime(
                    item['my0:courseFinishDate'], '%Y-%m-%d')
                endDateString = endDate.strftime("%Y")

            main = main + r'''

        \item[''' + item["my0:courseTitle"] + r''']{''' + startDateString + r''' -- ''' + endDateString + r'''}
        {}
        {''' + item['my0:organizedBy']['my0:organizationName'] + r''', ''' + item['my0:organizedBy']['my0:organizationAddress']['my0:city'] + r'''}

        '''
            main = main + r'''\end{yearlist}
    
        '''

    if(data['my0:hasSkill']):
            # print language skills
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
        # print basic skills
        main = main + r'''
        
        \section{''' + skillTitle[language] + r'''}
        
        \begin{factlist}

        \item{''' + skilllevel[0][language] + r'''}
            {
        '''
        for item in (data['my0:hasSkill']):
            if(item['@type'] == 'my0:Skill' and ord(item['my0:skillLevel']) >= 4):
                main = main + item['my0:skillName'] + r''' '''
        main = main + r'''}
        
        '''
        # print intermediate skills
        main = main + r'''
                
        \item{''' + skilllevel[1][language] + r'''}
            {
        '''
        for item in (data['my0:hasSkill']):
            if(item['@type'] == 'my0:Skill' and ord(item['my0:skillLevel']) >= 2 and ord(item['my0:skillLevel']) < 4):
                main = main + item['my0:skillName'] + r''' '''
        main = main + r'''}
        
        '''
        # print basic skills
        main = main + r'''
                
        \item{''' + skilllevel[2][language] + r'''}
            {
        '''
        for item in (data['my0:hasSkill']):
            if(item['@type'] == 'my0:Skill' and ord(item['my0:skillLevel']) == 1):
                main = main + item['my0:skillName'] + r''' '''
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
            main = main + r''' {''' + getnameURI(item['my0:otherInfoType']) + \
                r'''}{\newline ''' + \
                item['my0:otherInfoDescription'] + r'''} '''
        main = main + r'''
        \end{otherlist}
        '''
    return main


def generateMainDesign3Enriched(data, language):
    main = headerCV3

    if (data['my0:aboutPerson']):
        item = data['my0:aboutPerson']
        main = main + r'''
      
      \part{''' + item['my0:firstName'] + space + item['my0:lastName'] + r'''}
      
      '''
    if(data['my0:hasWorkHistory']):
        main = main + r'''
      
      \section{''' + workTitle[language] + r'''}
 
      \begin{eventlist}
      
      '''
        for item in (data['my0:hasWorkHistory']):
            startDateString = ''
            endDateString = ''
            if(item['my0:startDate'] != ''):
                startDate = datetime.strptime(
                    item['my0:startDate'], '%Y-%m-%d')
                startDateString = startDate.strftime("%b %Y")
            if(item['my0:endDate'] != ''):
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
        main = main + r'''
      
      \section{''' + educationTitle[language] + r'''}
      
      \begin{yearlist}
      
      '''
        for item in (data['my0:hasEducation']):
            startDateString = ''
            endDateString = ''
            if(item['my0:eduStartDate'] != ''):
                startDate = datetime.strptime(
                    item['my0:eduStartDate'], '%Y-%m-%d')
                startDateString = startDate.strftime("%Y")
            if(item['my0:eduGradDate'] != ''):
                endDate = datetime.strptime(
                    item['my0:eduGradDate'], '%Y-%m-%d')
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
            # print language skills
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
        # print basic skills
        main = main + r'''
        
        \section{''' + skillTitle[language] + r'''}
        
        \begin{factlist}

        \item{''' + skilllevel[0][language] + r'''}
            {
        '''
        for item in (data['my0:hasSkill']):
            if(item['@type'] == 'my0:Skill' and ord(item['my0:skillLevel']) >= 4):
                main = main + item['my0:skillName'] + r''' '''
        main = main + r'''}
        
        '''
        # print intermediate skills
        main = main + r'''
                
        \item{''' + skilllevel[1][language] + r'''}
            {
        '''
        for item in (data['my0:hasSkill']):
            if(item['@type'] == 'my0:Skill' and ord(item['my0:skillLevel']) >= 2 and ord(item['my0:skillLevel']) < 4):
                main = main + item['my0:skillName'] + r''' '''
        main = main + r'''}
        
        '''
        # print basic skills
        main = main + r'''
                
        \item{''' + skilllevel[2][language] + r'''}
            {
        '''
        for item in (data['my0:hasSkill']):
            if(item['@type'] == 'my0:Skill' and ord(item['my0:skillLevel']) == 1):
                main = main + item['my0:skillName'] + r''' '''
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
            main = main + r''' {''' + getnameURI(item['my0:otherInfoType']) + \
                r'''}{\newline ''' + \
                item['my0:otherInfoDescription'] + r'''} '''
        main = main + r'''
        \end{otherlist}
        '''
    return main
