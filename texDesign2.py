from datetime import datetime
from queries import runQueryDBPEDIA, runQueryMainOntology, runQueryCountryMainOntology
from translations import courseTitle, workTitle, educationTitle, languageTitle, referenceTitle, skillTitle, aboutMeTitle, otherTitle, otherInfoTitle, skilllevel, getnameURI, projectTitle, patentTitle, publicationTitle, current, pending, doesURIContainWord

headerCV2 = r'''%-------------------------------------
% LaTeX Resume for Software Engineers
% Author : Leslie Cheng
% License : MIT
%-------------------------------------

\documentclass[letterpaper,12pt]{article}[leftmargin=*]

\usepackage[empty]{fullpage}
\usepackage{enumitem}
% usepackage[pdftex]{hyperref}
\usepackage[pdfnewwindow=true]{hyperref}
\usepackage{fontawesome}
\usepackage[sfdefault,light]{FiraSans}
\usepackage[T1]{fontenc}
\usepackage{anyfontsize}
\usepackage{xcolor}
\usepackage[utf8]{inputenc}

%-------------------------------------------------- SETTINGS HERE --------------------------------------------------

'''

settingsPart2 = r'''
\def \headertype {\doublecol} % \singlecol or \doublecol

% Misc settings
\def \entryspacing {-0pt}

\def \bulletstyle {\faAngleRight}

% Define colours
\definecolor{primary}{HTML}{000000}
\definecolor{secondary}{HTML}{0D47A1}
\definecolor{accent}{HTML}{263238}
\definecolor{links}{HTML}{1565C0}

%------------------------------------------------------------------------------------------------------------------- 

% Defines to make listing easier
\def \linkedin {\linkedinicon \hspace{3pt}\href{\linkedinlink}{\linkedintext}}
\def \phone {\phoneicon \hspace{3pt}{ \phonetext}}
\def \email {\emailicon \hspace{3pt}\href{\emaillink}{\emailtext}}
\def \github {\githubicon \hspace{3pt}\href{\githublink}{\githubtext}}
\def \website {\websiteicon \hspace{3pt}\href{\websitelink}{\websitetext}}
% Adjust margins
\addtolength{\oddsidemargin}{-0.55in}
\addtolength{\evensidemargin}{-0.55in}
\addtolength{\textwidth}{1.1in}
\addtolength{\topmargin}{-0.6in}
\addtolength{\textheight}{1.1in}

% Define the link colours
\hypersetup{
    colorlinks=true,
    urlcolor=links,
}

% Set the margin alignment 
\raggedbottom
\raggedright
\setlength{\tabcolsep}{0in}

%-------------------------
% Custom commands

% Sections
\renewcommand{\section}[2]{\vspace{5pt}
  \colorbox{secondary}{\color{white}\raggedbottom\normalsize\textbf{{#1}{\hspace{7pt}#2}}}
}
% Entry start and end, for spacing
\newcommand{\resumeEntryStart}{\begin{itemize}[leftmargin=2.5mm]}
\newcommand{\resumeEntryEnd}{\end{itemize}\vspace{\entryspacing}}

% Itemized list for the bullet points under an entry, if necessary
\newcommand{\resumeItemListStart}{\begin{itemize}[leftmargin=4.5mm]}
\newcommand{\resumeItemListEnd}{\end{itemize}}

% Resume item
\renewcommand{\labelitemii}{\bulletstyle}
\newcommand{\resumeItem}[1]{
  \item\small{
    {#1 \vspace{-2pt}}
  }
}

% Entry with title, subheading, date(s), and location
\newcommand{\resumeEntryTSDL}[4]{
  \vspace{-1pt}\item[]
    \begin{tabular*}{0.97\textwidth}{l@{\extracolsep{\fill}}r}
      \textbf{\color{primary}#1} & {\firabook\color{accent}\small#2} \\
      \textit{\color{accent}\small#3} & \textit{\color{accent}\small#4} \\
    \end{tabular*}\vspace{-6pt}
}

% Entry with title and date(s)
\newcommand{\resumeEntryTD}[2]{
  \vspace{-1pt}\item[]
    \begin{tabular*}{0.97\textwidth}{l@{\extracolsep{\fill}}r}
      \textbf{\color{primary}#1} & {\firabook\color{accent}\small#2} \\
    \end{tabular*}\vspace{-6pt}
}

% Entry for special (skills)
\newcommand{\resumeEntryS}[2]{
  \item[]\small{
    \textbf{\color{primary}#1 }{ #2 \vspace{-6pt}}
  }
}

% Double column header
\newcommand{\doublecol}[6]{
  \begin{tabular*}{\textwidth}{l@{\extracolsep{\fill}}r}
    {
      \begin{tabular}[c]{l}
        \fontsize{35}{45}\selectfont{\color{primary}{{\textbf{\fullname}}}} \\
        {\textit{\subtitle}} % You could add a subtitle here
      \end{tabular}
    } & {
      \begin{tabular}[c]{l@{\hspace{1.5em}}l}
        {\small#4} & {\small#1} \\
        {\small#5} & {\small#2} \\
        {\small#6} & {\small#3}
      \end{tabular}
    }
  \end{tabular*}
}
% Single column header
\newcommand{\singlecol}[6]{
  \begin{tabular*}{\textwidth}{l@{\extracolsep{\fill}}r}
    {
      \begin{tabular}[b]{l}
        \fontsize{35}{45}\selectfont{\color{primary}{{\textbf{\fullname}}}} \\
        {\textit{\subtitle}} % You could add a subtitle here
      \end{tabular}
    } & {
      \begin{tabular}[c]{l}
        {\small#1} \\
        {\small#2} \\
        {\small#3} \\
        {\small#4} \\
        {\small#5} \\
        {\small#6}
      \end{tabular}
    }
  \end{tabular*}
}

\begin{document}
%---------------------------------------------------- HEADER ----------------------------------------------------

\headertype{\linkedin}{\github}{\website}{\phone}{\email}{} % Set the order of items here
\vspace{-10pt} % Set a negative value to push the body up, and the opposite

'''

main = r''''''
space = r''' '''
comma = r''', '''


def generateMainDesign2(data, language):

    main = headerCV2

    if (data['my0:aboutPerson']):
        item = data['my0:aboutPerson']
        # write personal information about the user
        main = main + r'''\def \fullname {''' + item['my0:firstName'] + space + item['my0:lastName'] + r'''}
      '''

        if item['my0:phoneNumber']:
            main = main + r'''\def \phoneicon {\faPhone}
        \def \phonetext {''' + item['my0:phoneNumber'] + r'''}
        '''

        if item['my0:email']:
            main = main + r'''\def \emailicon {\faEnvelope}
        \def \emaillink {mailto:''' + item['my0:email'] + r'''} \def \emailtext {''' + item['my0:email'] + r'''}
        '''

    main = main + settingsPart2

    if (data['my0:aboutPerson']):
        item = data['my0:aboutPerson']
        # write website information about the user
        for website in (item['my0:hasWebsite']):
            if doesURIContainWord(website['my0:websiteType'], 'Linkedin'):
                main = main + \
                    r'''\faLinkedin { }  \href{''' + website['my0:websiteURL'] + \
                    r'''}{''' + website['my0:websiteURL'] + r'''} \newline'''
            elif doesURIContainWord(website['my0:websiteType'], 'Xing'):
                main = main + \
                    r'''\faXing { }  \href{''' + website['my0:websiteURL'] + \
                    r'''}{''' + website['my0:websiteURL'] + r'''} \newline'''
            else:
                main = main + r'''\faGlobe { }  \href{''' + website['my0:websiteURL'] + r'''}{''' + website['my0:websiteURL'] + r'''} \newline
        '''

    main = main + r'''\newline'''

    if(data['my0:hasEducation']):
        # write educational information about the user
        main = main + r'''
      %-------------------------------------------------- EDUCATION --------------------------------------------------
      \section{\faGraduationCap}{''' + educationTitle[language] + r'''}
      '''
        educations = sorted(
            data['my0:hasEducation'],
            key=lambda x: x['my0:eduStartDate'], reverse=True
        )

        for item in (educations):
            orgName = item["my0:studiedIn"]["my0:organizationName"]
            orgCity = item["my0:studiedIn"]["my0:organizationAddress"]["my0:city"]
            orgCountry = getnameURI(
                item["my0:studiedIn"]["my0:organizationAddress"]["my0:country"])
            endDate = item['my0:eduGradDate']
            if item['my0:eduGradDate'] == "":
                endDate = current[language]
            degreeName = runQueryMainOntology(item['my0:degreeType'], language)

            main = main + r'''  \resumeEntryStart
        \resumeEntryTSDL
        '''
            main = main + r'''{''' + orgName + r'''}{''' + \
                item['my0:eduStartDate'] + r''' -- ''' + \
                endDate + r'''}'''
            main = main + r'''{''' + degreeName + r''' ''' + \
                item["my0:degree"] + \
                r'''}{''' + orgCity + r''', ''' + orgCountry + r'''}'''
            main = main + r'''\resumeEntryEnd
        '''

    if(data['my0:hasCourse']):
        # write courses information about the user
        main = main + r'''
      %-------------------------------------------------- COURSES --------------------------------------------------
      \section{\faGraduationCap}{''' + courseTitle[language] + r'''}
      '''
        courses = sorted(
            data['my0:hasCourse'],
            key=lambda x: x['my0:courseStartDate'], reverse=True
        )
        for item in (courses):
            orgName = item["my0:organizedBy"]["my0:organizationName"]
            orgCity = item["my0:organizedBy"]["my0:organizationAddress"]["my0:city"]
            orgCountry = getnameURI(
                item["my0:organizedBy"]["my0:organizationAddress"]["my0:country"])
            endDate = item['my0:courseFinishDate']
            if item['my0:courseFinishDate'] == "":
                endDate = current[language]

            main = main + r'''  \resumeEntryStart
        \resumeEntryTSDL
        '''
            main = main + r'''{''' + orgName + r'''}{''' + \
                item['my0:courseStartDate'] + r''' -- ''' + \
                endDate + r'''}'''
            main = main + r'''{''' + \
                item["my0:courseTitle"] + \
                r'''}{''' + orgCity + r''', ''' + orgCountry + r'''}'''
            main = main + r'''\resumeEntryEnd
        '''

    if(data['my0:hasWorkHistory']):
        # write experience information about the user
        main = main + r'''
      %-------------------------------------------------- EXPERIENCE --------------------------------------------------
      \section{\faPieChart}{''' + workTitle[language] + r'''}
      '''
        works = sorted(
            data['my0:hasWorkHistory'],
            key=lambda x: x['my0:startDate'], reverse=True
        )
        for item in (works):
            orgName = item["my0:employedIn"]["my0:organizationName"]
            orgCity = item["my0:employedIn"]["my0:organizationAddress"]["my0:city"]
            orgCountry = getnameURI(
                item["my0:employedIn"]["my0:organizationAddress"]["my0:country"])
            endDate = item['my0:endDate']
            if item['my0:endDate'] == "":
                endDate = current[language]

            main = main + r'''  \resumeEntryStart
        \resumeEntryTSDL
        '''
            main = main + r'''{''' + orgName + r'''}{''' + \
                item['my0:startDate'] + r''' -- ''' + \
                endDate + r'''}'''
            main = main + r'''{''' + item['my0:jobTitle'] + \
                r'''}{''' + orgCity + r''', ''' + orgCountry + r'''}'''
            main = main + r'''\resumeItemListStart
        \resumeItem { ''' + item['my0:jobDescription'] + r'''}
        \resumeItemListEnd'''
            main = main + r'''\resumeEntryEnd
        '''

    if(data['my0:hasProject']):
        # write project information about the user
        main = main + r'''
      %-------------------------------------------------- PROJECTS --------------------------------------------------
      \section{\faFlask}{''' + projectTitle[language] + r'''}
      '''
        projects = sorted(
            data['my0:hasProject'],
            key=lambda x: x['my0:projectStartDate'], reverse=True
        )
        for item in (projects):

            endDate = item['my0:projectEndDate']
            if item['my0:projectEndDate'] == "":
                endDate = current[language]

            main = main + r'''  \resumeEntryStart
        \resumeEntryTSDL
        '''
            main = main + r'''{''' + item['my0:projectName'] + r'''}{
          ''' + item['my0:projectStartDate'] + r''' - ''' + endDate + r'''
        }{''' + item['my0:projectCreator'] + r'''}{}'''
            main = main + r'''\resumeItemListStart
        \resumeItem { ''' + item['my0:projectDescription'] + r'''}
        \resumeItemListEnd'''
            main = main + r'''\resumeEntryEnd
        '''

    if(data['my0:hasPublication']):
        # write project information about the user
        main = main + r'''
      %-------------------------------------------------- PUBLICATIONS --------------------------------------------------
      \section{\faBook}{''' + publicationTitle[language] + r'''}
      '''
        publications = sorted(
            data['my0:hasPublication'],
            key=lambda x: x['my0:publiciationDate'], reverse=True
        )
        for item in (publications):

            title = r''' \href{''' + item['my0:publicationURL'] + \
                r'''}{''' + item['my0:publiciationTitle'] + r'''} '''

            main = main + r'''  \resumeEntryStart
        \resumeEntryTSDL
        '''
            main = main + r'''{''' + title + r'''}{''' + \
                item['my0:publiciationDate'] + r'''}{''' + item['my0:publicationAuthor'] + \
                r'''}{''' + item['my0:publiciationPublisher'] + r'''}'''
            main = main + r'''\resumeItemListStart
        \resumeItem { ''' + item['my0:publicationDescription'] + r'''}
        \resumeItemListEnd'''
            main = main + r'''\resumeEntryEnd
        '''

    if(data['my0:hasPatent']):
        # write project information about the user
        main = main + r'''
      %-------------------------------------------------- PATENTS --------------------------------------------------
      \section{\faCertificate}{''' + patentTitle[language] + r'''}
      '''
        patents = sorted(
            data['my0:hasPatent'],
            key=lambda x: x['my0:patentIssuedDate'], reverse=True
        )
        for item in (patents):

            title = r''' \href{''' + item['my0:patentURL'] + r'''}{''' + \
                item['my0:patentTitle'] + ''' - ''' + \
                    item['my0:patentNumber'] + r'''} '''
            endDate = item['my0:patentIssuedDate']
            if item['my0:patentIssuedDate'] == "":
                endDate = pending[language]

            main = main + r'''  \resumeEntryStart
        \resumeEntryTSDL
        '''
            main = main + r'''{''' + title + r'''}{''' + \
                endDate + \
                r'''}{''' + item['my0:patentInventor'] + \
                r'''}{''' + item['my0:patentOffice'] + r'''}'''
            main = main + r'''\resumeItemListStart
        \resumeItem { ''' + item['my0:patentDescription'] + r'''}
        \resumeItemListEnd'''
            main = main + r'''\resumeEntryEnd
        '''

    if(data['my0:hasSkill']):
            # write skill information about the user
        main = main + r'''
      %-------------------------------------------------- SKILLS --------------------------------------------------
      \section{\faGears}{''' + skillTitle[language] + r'''} \resumeEntryStart
      '''
        main = main + r'''\resumeEntryS{''' + \
            languageTitle[language] + r''' }{'''

        firstElementLanguage = False
        firstElementSkill = False

        for items in (data['my0:hasSkill']):
            if(items['@type'] == 'my0:LanguageSkill'):
                if firstElementLanguage:
                    main = main + comma + items['my0:skillName']
                else:
                    main = main + items['my0:skillName']
                firstElementLanguage = True
        main = main + r'''}
      \resumeEntryS{''' + otherTitle[language] + r''' }
      {'''

        for items in (data['my0:hasSkill']):
            if(items['@type'] == 'my0:Skill'):
                if firstElementSkill:
                    main = main + comma + items['my0:skillName']
                else:
                    main = main + items['my0:skillName']
                firstElementSkill = True
        main = main + r'''}\resumeEntryEnd
      '''

    return main


def generateMainDesign2Enriched(data, language):
    main = headerCV2

    if (data['my0:aboutPerson']):
        item = data['my0:aboutPerson']
        # write personal information about the user
        main = main + r'''\def \fullname {''' + item['my0:firstName'] + space + item['my0:lastName'] + r'''}
      '''

        if item['my0:phoneNumber']:
            main = main + r'''\def \phoneicon {\faPhone}
        \def \phonetext {''' + item['my0:phoneNumber'] + r'''}
        '''

        if item['my0:email']:
            main = main + r'''\def \emailicon {\faEnvelope}
        \def \emaillink {mailto:''' + item['my0:email'] + r'''} \def \emailtext {''' + item['my0:email'] + r'''}
        '''

    main = main + settingsPart2

    if (data['my0:aboutPerson']):
        item = data['my0:aboutPerson']
        # write website information about the user
        for website in (item['my0:hasWebsite']):
            if doesURIContainWord(website['my0:websiteType'], 'Linkedin'):
                main = main + \
                    r'''\faLinkedin { }  \href{''' + website['my0:websiteURL'] + \
                    r'''}{''' + website['my0:websiteURL'] + r'''} \newline'''
            elif doesURIContainWord(website['my0:websiteType'], 'Xing'):
                main = main + \
                    r'''\faXing { }  \href{''' + website['my0:websiteURL'] + \
                    r'''}{''' + website['my0:websiteURL'] + r'''} \newline'''
            else:
                main = main + r'''\faGlobe { }  \href{''' + website['my0:websiteURL'] + r'''}{''' + website['my0:websiteURL'] + r'''} \newline
        '''

    main = main + r'''\newline'''

    if(data['my0:hasEducation']):
        # write educational information about the user
        main = main + r'''
      %-------------------------------------------------- EDUCATION --------------------------------------------------
      \section{\faGraduationCap}{''' + educationTitle[language] + r'''}
      '''
        educations = sorted(
            data['my0:hasEducation'],
            key=lambda x: x['my0:eduStartDate'], reverse=True
        )

        for item in (educations):
            orgName = item["my0:studiedIn"]["my0:organizationName"]
            orgURL = runQueryDBPEDIA(orgName, language)
            if orgURL != "":
                orgName = r'''\href{''' + orgURL + \
                    r'''}{''' + orgName + r'''}'''

            orgCityName = item["my0:studiedIn"]["my0:organizationAddress"]["my0:city"]
            orgCityURL = runQueryDBPEDIA(orgCityName, language)
            if orgCityURL != "":
                orgCityName = r'''\href{''' + orgCityURL + \
                    r'''}{''' + orgCityName + r'''}'''

            orgCountryName = getnameURI(item["my0:studiedIn"]["my0:organizationAddress"]["my0:country"])
            orgCountryURL = runQueryDBPEDIA(orgCountryName, language)
            if orgCountryURL != "":
                orgCountryName = r'''\href{''' + orgCountryURL + \
                    r'''}{''' + orgCountryName + r'''}'''
            degreeName = runQueryMainOntology(item['my0:degreeType'], language)
                    
            endDate = item['my0:eduGradDate']
            if item['my0:eduGradDate'] == "":
                endDate = current[language]

            main = main + r'''  \resumeEntryStart
        \resumeEntryTSDL
        '''
            main = main + r'''{''' + orgName + r'''}{''' + \
                item['my0:eduStartDate'] + r''' -- ''' + \
                endDate + r'''}'''
            main = main + r'''{''' + degreeName + r''' ''' + \
                item["my0:degree"] + \
                r'''}{''' + orgCityName + r''', ''' + orgCountryName + r'''}'''
            main = main + r'''\resumeEntryEnd
        '''

    if(data['my0:hasCourse']):
        # write courses information about the user
        main = main + r'''
      %-------------------------------------------------- COURSES --------------------------------------------------
      \section{\faGraduationCap}{''' + courseTitle[language] + r'''}
      '''
        courses = sorted(
            data['my0:hasCourse'],
            key=lambda x: x['my0:courseStartDate'], reverse=True
        )
        for item in (courses):
            orgName = item["my0:organizedBy"]["my0:organizationName"]
            orgURL = runQueryDBPEDIA(orgName, language)
            if orgURL != "":
                orgName = r'''\href{''' + orgURL + \
                    r'''}{''' + orgName + r'''}'''

            orgCityName = item["my0:organizedBy"]["my0:organizationAddress"]["my0:city"]
            orgCityURL = runQueryDBPEDIA(orgCityName, language)
            if orgCityURL != "":
                orgCityName = r'''\href{''' + orgCityURL + \
                    r'''}{''' + orgCityName + r'''}'''

            orgCountryName = getnameURI(item["my0:organizedBy"]["my0:organizationAddress"]["my0:country"])
            orgCountryURL = runQueryDBPEDIA(orgCountryName, language)
            if orgCountryURL != "":
                orgCountryName = r'''\href{''' + orgCountryURL + \
                    r'''}{''' + orgCountryName + r'''}'''
            
            endDate = item['my0:courseFinishDate']
            if item['my0:courseFinishDate'] == "":
                endDate = current[language]

            main = main + r'''  \resumeEntryStart
        \resumeEntryTSDL
        '''
            main = main + r'''{''' + orgName + r'''}{''' + \
                item['my0:courseStartDate'] + r''' -- ''' + \
                endDate + r'''}'''
            main = main + r'''{''' + \
                item["my0:courseTitle"] + \
                r'''}{''' + orgCityName + r''', ''' + orgCountryName + r'''}'''
            main = main + r'''\resumeEntryEnd
        '''

    if(data['my0:hasWorkHistory']):
        # write experience information about the user
        main = main + r'''
      %-------------------------------------------------- EXPERIENCE --------------------------------------------------
      \section{\faPieChart}{''' + workTitle[language] + r'''}
      '''
        works = sorted(
            data['my0:hasWorkHistory'],
            key=lambda x: x['my0:startDate'], reverse=True
        )
        for item in (works):
            orgName = item["my0:employedIn"]["my0:organizationName"]
            orgURL = runQueryDBPEDIA(orgName, language)
            if orgURL != "":
                orgName = r'''\href{''' + orgURL + \
                    r'''}{''' + orgName + r'''}'''

            orgCityName = item["my0:employedIn"]["my0:organizationAddress"]["my0:city"]
            orgCityURL = runQueryDBPEDIA(orgCityName, language)
            if orgCityURL != "":
                orgCityName = r'''\href{''' + orgCityURL + \
                    r'''}{''' + orgCityName + r'''}'''

            orgCountryName = getnameURI(item["my0:employedIn"]["my0:organizationAddress"]["my0:country"])
            orgCountryURL = runQueryDBPEDIA(orgCountryName, language)
            if orgCountryURL != "":
                orgCountryName = r'''\href{''' + orgCountryURL + \
                    r'''}{''' + orgCountryName + r'''}'''
            endDate = item['my0:endDate']
            if item['my0:endDate'] == "":
                endDate = current[language]

            main = main + r'''  \resumeEntryStart
        \resumeEntryTSDL
        '''
            main = main + r'''{''' + orgName + r'''}{''' + \
                item['my0:startDate'] + r''' -- ''' + \
                endDate + r'''}'''
            main = main + r'''{''' + item['my0:jobTitle'] + \
                r'''}{''' + orgCityName + r''', ''' + orgCountryName + r'''}'''
            main = main + r'''\resumeItemListStart
        \resumeItem { ''' + item['my0:jobDescription'] + r'''}
        \resumeItemListEnd'''
            main = main + r'''\resumeEntryEnd
        '''

    if(data['my0:hasProject']):
        # write project information about the user
        main = main + r'''
      %-------------------------------------------------- PROJECTS --------------------------------------------------
      \section{\faFlask}{''' + projectTitle[language] + r'''}
      '''
        projects = sorted(
            data['my0:hasProject'],
            key=lambda x: x['my0:projectStartDate'], reverse=True
        )
        for item in (projects):

            endDate = item['my0:projectEndDate']
            if item['my0:projectEndDate'] == "":
                endDate = current[language]

            main = main + r'''  \resumeEntryStart
        \resumeEntryTSDL
        '''
            main = main + r'''{''' + item['my0:projectName'] + r'''}{
          ''' + item['my0:projectStartDate'] + r''' - ''' + endDate + r'''
        }{''' + item['my0:projectCreator'] + r'''}{}'''
            main = main + r'''\resumeItemListStart
        \resumeItem { ''' + item['my0:projectDescription'] + r'''}
        \resumeItemListEnd'''
            main = main + r'''\resumeEntryEnd
        '''

    if(data['my0:hasPublication']):
        # write project information about the user
        main = main + r'''
      %-------------------------------------------------- PUBLICATIONS --------------------------------------------------
      \section{\faBook}{''' + publicationTitle[language] + r'''}
      '''
        publications = sorted(
            data['my0:hasPublication'],
            key=lambda x: x['my0:publiciationDate'], reverse=True
        )
        for item in (publications):

            title = r''' \href{''' + item['my0:publicationURL'] + \
                r'''}{''' + item['my0:publiciationTitle'] + r'''} '''

            main = main + r'''  \resumeEntryStart
        \resumeEntryTSDL
        '''
            main = main + r'''{''' + title + r'''}{''' + \
                item['my0:publiciationDate'] + r'''}{''' + item['my0:publicationAuthor'] + \
                r'''}{''' + item['my0:publiciationPublisher'] + r'''}'''
            main = main + r'''\resumeItemListStart
        \resumeItem { ''' + item['my0:publicationDescription'] + r'''}
        \resumeItemListEnd'''
            main = main + r'''\resumeEntryEnd
        '''

    if(data['my0:hasPatent']):
        # write project information about the user
        main = main + r'''
      %-------------------------------------------------- PATENTS --------------------------------------------------
      \section{\faCertificate}{''' + patentTitle[language] + r'''}
      '''
        patents = sorted(
            data['my0:hasPatent'],
            key=lambda x: x['my0:patentIssuedDate'], reverse=True
        )
        for item in (patents):

            title = r''' \href{''' + item['my0:patentURL'] + r'''}{''' + \
                item['my0:patentTitle'] + ''' - ''' + \
                    item['my0:patentNumber'] + r'''} '''
            endDate = item['my0:patentIssuedDate']
            if item['my0:patentIssuedDate'] == "":
                endDate = pending[language]

            main = main + r'''  \resumeEntryStart
        \resumeEntryTSDL
        '''
            main = main + r'''{''' + title + r'''}{''' + \
                endDate + \
                r'''}{''' + item['my0:patentInventor'] + \
                r'''}{''' + item['my0:patentOffice'] + r'''}'''
            main = main + r'''\resumeItemListStart
        \resumeItem { ''' + item['my0:patentDescription'] + r'''}
        \resumeItemListEnd'''
            main = main + r'''\resumeEntryEnd
        '''

    if(data['my0:hasSkill']):
            # write skill information about the user
        main = main + r'''
      %-------------------------------------------------- SKILLS --------------------------------------------------
      \section{\faGears}{''' + skillTitle[language] + r'''} \resumeEntryStart
      '''
        main = main + r'''\resumeEntryS{''' + \
            languageTitle[language] + r''' }{'''

        firstElementLanguage = False
        firstElementSkill = False

        for items in (data['my0:hasSkill']):
            if(items['@type'] == 'my0:LanguageSkill'):
                if firstElementLanguage:
                    main = main + comma + items['my0:skillName']
                else:
                    main = main + items['my0:skillName']
                firstElementLanguage = True
        main = main + r'''}
      \resumeEntryS{''' + otherTitle[language] + r''' }
      {'''

        for items in (data['my0:hasSkill']):
            if(items['@type'] == 'my0:Skill'):
                if firstElementSkill:
                    main = main + comma + items['my0:skillName']
                else:
                    main = main + items['my0:skillName']
                firstElementSkill = True
        main = main + r'''}\resumeEntryEnd
      '''

    return main
