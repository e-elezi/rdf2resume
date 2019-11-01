from datetime import datetime
from queries import runQueryDBPEDIA, runQueryMainOntology, runQueryCountryMainOntology
from translations import courseTitle, workTitle, educationTitle, languageTitle, referenceTitle, skillTitle, aboutMeTitle, otherTitle, otherInfoTitle, skilllevel, getnameURI, projectTitle, patentTitle, publicationTitle, current, pending, doesURIContainWord

headerCV1 = r'''
    \documentclass[letterpaper,11pt]{article}
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
    \usepackage{fontawesome}
    \usepackage{hyperref}


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

main = r''''''
space = r''' '''
comma = r''', '''


def generateMainDesign1(data, language):

    main = headerCV1

    if (data['my0:aboutPerson']):
        item = data['my0:aboutPerson']
        country = getnameURI(item['my0:address']['my0:country'])
        # write personal information about the user
        main = main + r'''
      \begin{tabular*}{7in}{l@{\extracolsep{\fill}}r}
      \textbf{\Large ''' + item['my0:firstName'] + space + item['my0:lastName'] + r'''} &
       \textbf{\today} \\
      ''' + item['my0:address']['my0:street'] + space + item['my0:address']['my0:postalCode'] + r''' & ''' + item['my0:email'] + r'''\\
      ''' + item['my0:address']['my0:city'] + comma + country + r''' & ''' + item['my0:phoneNumber'] + r'''\\'''

        # write website information about the user
        for website in (item['my0:hasWebsite']):
            if doesURIContainWord(website['my0:websiteType'], 'Linkedin'):
                main = main + \
                    r'''\faLinkedin { }  \href{''' + website['my0:websiteURL'] + \
                    r'''}{''' + website['my0:websiteURL'] + r'''} & \\'''
            elif doesURIContainWord(website['my0:websiteType'], 'Xing'):
                main = main + \
                    r'''\faXing { }  \href{''' + website['my0:websiteURL'] + \
                    r'''}{''' + website['my0:websiteURL'] + r'''} & \\'''
            else:
                main = main + r'''\faGlobe { }  \href{''' + website['my0:websiteURL'] + r'''}{''' + website['my0:websiteURL'] + r'''} & \\
        '''
        main = main + r'''
      \end{tabular*}
      \\'''

    if (data['my0:hasWorkHistory']):
        main = main + r'''
      %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
      \resheading{''' + workTitle[language] + r'''}
      %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
      \begin{itemize}'''
        works = sorted(
            data['my0:hasWorkHistory'],
            key=lambda x: x['my0:startDate'], reverse=True
        )

        for item in (works):
            endDate = item['my0:endDate']
            if item['my0:endDate'] == "":
                endDate = current[language]
            main = main + r'''
        \item \ressubheading{''' + item['my0:employedIn']['my0:organizationName'] + r'''}{''' + item['my0:employedIn']['my0:organizationAddress']['my0:city'] + r''', ''' + getnameURI(item['my0:employedIn']['my0:organizationAddress']['my0:country']) + r'''}{''' + item['my0:jobTitle'] + comma + getnameURI(item['my0:jobMode']) + r'''}{''' + item['my0:startDate'] + r''' - ''' + endDate + r'''}\\
        \begin{itemize}
        \item[]{''' + item['my0:jobDescription'] + r'''}
        \end{itemize}'''

    main = main + r'''\end{itemize}'''

    if (data['my0:hasEducation']):
        main = main + r'''
      %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
	    \resheading{''' + educationTitle[language] + r'''}
	    %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
	    \begin{itemize}'''

        educations = sorted(
            data['my0:hasEducation'],
            key=lambda x: x['my0:eduStartDate'], reverse=True
        )
        for item in (educations):
            endDate = item['my0:eduGradDate']
            if item['my0:eduGradDate'] == "":
                endDate = current[language]
            main = main + r'''
		    \item \ressubheading{''' + item['my0:studiedIn']['my0:organizationName'] + r'''}{''' + item['my0:studiedIn']['my0:organizationAddress']['my0:city'] + r''', ''' + getnameURI(item['my0:studiedIn']['my0:organizationAddress']['my0:country']) + r'''}{''' + getnameURI(item['my0:degreeType']) + comma + item['my0:degree'] + r'''}{''' + item['my0:eduStartDate'] + r''' - ''' + endDate + r'''}\\
		    \begin{itemize}
		    \item[]{''' + item['my0:eduDescription'] + r'''}
		    \end{itemize}'''

        main = main + r'''\end{itemize}'''

    if (data['my0:hasCourse']):
        main = main + r'''
      %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
	    \resheading{''' + courseTitle[language] + r'''}
	    %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
	    \begin{itemize}'''
        courses = sorted(
            data['my0:hasCourse'],
            key=lambda x: x['my0:courseStartDate'], reverse=True
        )
        for item in (courses):
            endDate = item['my0:courseFinishDate']
            if item['my0:courseFinishDate'] == "":
                endDate = current[language]
            main = main + r'''
		    \item \ressubheading{''' + item['my0:organizedBy']['my0:organizationName'] + r'''}{''' + item['my0:organizedBy']['my0:organizationAddress']['my0:city'] + r''', ''' + getnameURI(item['my0:organizedBy']['my0:organizationAddress']['my0:country']) + r'''}{''' + item['my0:courseTitle'] + comma + item['my0:courseURL'] + r'''}{''' + item['my0:courseStartDate'] + r''' - ''' + endDate + r'''}\\
		    \begin{itemize}
		    \item[]{''' + item['my0:courseDescription'] + r'''}
		    \end{itemize}'''

        main = main + r'''\end{itemize}'''

    if (data['my0:hasPublication']):
        main = main + r'''
      %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
	    \resheading{''' + publicationTitle[language] + r'''}
	    %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
	    \begin{itemize}'''
        publications = sorted(
            data['my0:hasPublication'],
            key=lambda x: x['my0:publiciationDate'], reverse=True
        )
        for item in (publications):
            main = main + r'''
		    \item \ressubheading{''' + item['my0:publiciationTitle'] + r'''}{''' + item['my0:publiciationPublisher'] + r'''}{''' + item['my0:publicationAuthor'] + r'''}{''' + item['my0:publiciationDate'] + r'''}\\
		    \begin{itemize}
		    \item[]{''' + item['my0:publicationDescription'] + r'''}
		    \end{itemize}'''

        main = main + r'''\end{itemize}'''

    if (data['my0:hasProject']):
        main = main + r'''
      %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
	    \resheading{''' + projectTitle[language] + r'''}
	    %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
	    \begin{itemize}'''
        projects = sorted(
            data['my0:hasProject'],
            key=lambda x: x['my0:projectStartDate'], reverse=True
        )
        for item in (projects):
            endDate = item['my0:projectEndDate']
            if item['my0:projectEndDate'] == "":
                endDate = current[language]
            main = main + r'''
		    \item \ressubheading{''' + item['my0:projectName'] + r'''}{''' + item['my0:projectCreator'] + r'''}{}{''' + item['my0:projectStartDate'] + r''' - ''' + endDate + r'''}\\
		    \begin{itemize}
		    \item[]{''' + item['my0:projectDescription'] + r'''}
		    \end{itemize}'''

        main = main + r'''\end{itemize}'''

    if (data['my0:hasPatent']):
        main = main + r'''
      %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
	    \resheading{''' + patentTitle[language] + r'''}
	    %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
	    \begin{itemize}'''
        patents = sorted(
            data['my0:hasPatent'],
            key=lambda x: x['my0:patentIssuedDate'], reverse=True
        )
        for item in (patents):
            endDate = item['my0:patentIssuedDate']
            if item['my0:patentIssuedDate'] == "":
                endDate = pending[language]
            main = main + r'''
		    \item \ressubheading{''' + item['my0:patentTitle'] + r'''}{''' + item['my0:patentOffice'] + r'''}{''' + item['my0:patentInventor'] + r'''}{''' + endDate + r'''}\\
		    \begin{itemize}
		    \item[]{''' + item['my0:patentDescription'] + r'''}
		    \end{itemize}'''

        main = main + r'''\end{itemize}'''

    if (data['my0:hasOtherInfo']):
        main = main + r'''
      %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
	    \resheading{''' + otherInfoTitle[language] + r'''}
	    %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
	    \begin{itemize}'''
        for item in (data['my0:hasOtherInfo']):
            main = main + r'''
		    \item[] \ressubheading{''' + getnameURI(item['my0:otherInfoType']) + r'''}{}{}{}\\*''' + item['my0:otherInfoDescription']

        main = main + r'''\end{itemize}'''
    return main


def generateMainDesign1Enriched(data, language):
    main = headerCV1

    if (data['my0:aboutPerson']):
        item = data['my0:aboutPerson']
        address = item['my0:address']
        country = runQueryCountryMainOntology(address['my0:country'], language)
        full_address = address['my0:street'] + space + address['my0:city'] + \
            space + address['my0:postalCode'] + space + country

        # write personal information about the user
        main = main + r'''
      \begin{tabular*}{7in}{l@{\extracolsep{\fill}}r}
      \textbf{\Large ''' + item['my0:firstName'] + space + item['my0:lastName'] + r'''} & \textbf{\today} \\
      ''' + address['my0:street'] + space + address['my0:postalCode'] + r''' & ''' + item['my0:email'] + r'''\\''' + address['my0:city'] + comma + country + r'''\href{https://www.openstreetmap.org/search?query=''' + full_address + r'''}{\faMapMarker}  & ''' + item['my0:phoneNumber'] + r'''\\
      '''
        # write website information about the user
        for website in (item['my0:hasWebsite']):
            if doesURIContainWord(website['my0:websiteType'], 'Linkedin'):
                main = main + \
                    r'''\faLinkedin { }  \href{''' + website['my0:websiteURL'] + \
                    r'''}{''' + website['my0:websiteURL'] + r'''} & \\'''
            elif doesURIContainWord(website['my0:websiteType'], 'Xing'):
                main = main + \
                    r'''\faXing { }  \href{''' + website['my0:websiteURL'] + \
                    r'''}{''' + website['my0:websiteURL'] + r'''} & \\'''
            else:
                main = main + r'''\faGlobe { }  \href{''' + website['my0:websiteURL'] + r'''}{''' + website['my0:websiteURL'] + r'''} & \\
        '''
        main = main + r'''
      \end{tabular*}
      \\'''

    if (data['my0:hasWorkHistory']):

        main = main + r'''
      %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
      \resheading{''' + workTitle[language] + r'''}
      %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
      \begin{itemize}'''
        for item in (data['my0:hasWorkHistory']):

            address = item['my0:employedIn']['my0:organizationAddress']
            orgName = item['my0:employedIn']['my0:organizationName']
            orgURL = runQueryDBPEDIA(orgName, language)
            if orgURL != "":
                orgName = r'''\href{''' + orgURL + \
                    r'''}{''' + orgName + r'''}'''
            country = runQueryCountryMainOntology(
                address['my0:country'], language)
            country = r'''\href{''' + country + r'''}{''' + \
                getnameURI(address['my0:country']) + r'''}'''
            city = address['my0:city']
            cityURL = runQueryDBPEDIA(city, language)
            if cityURL != "":
                city = r'''\href{''' + cityURL + r'''}{''' + city + r'''}'''
            jobMode = runQueryMainOntology(item['my0:jobMode'], language)
            endDate = item['my0:endDate']
            if item['my0:endDate'] == "":
                endDate = current[language]

            main = main + r'''
        \item \ressubheading{''' + orgName + r'''}{''' + city + r''', ''' + country + r'''}{''' + item['my0:jobTitle'] + comma + jobMode + r'''}{''' + item['my0:startDate'] + r''' - ''' + endDate + r'''}\\
        \begin{itemize}
        \item[]{''' + item['my0:jobDescription'] + r'''}
        \end{itemize}'''

        main = main + r'''\end{itemize}'''

    if (data['my0:hasEducation']):
        main = main + r'''
      %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
	    \resheading{''' + educationTitle[language] + r'''}
	    %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
	    \begin{itemize}'''
        for item in (data['my0:hasEducation']):
            address = item['my0:studiedIn']['my0:organizationAddress']
            orgName = item['my0:studiedIn']['my0:organizationName']
            orgURL = runQueryDBPEDIA(orgName, language)
            if orgURL != "":
                orgName = r'''\href{''' + orgURL + \
                    r'''}{''' + orgName + r'''}'''
            country = runQueryCountryMainOntology(
                address['my0:country'], language)
            country = r'''\href{''' + country + r'''}{''' + \
                getnameURI(address['my0:country']) + r'''}'''
            city = address['my0:city']
            cityURL = runQueryDBPEDIA(city, language)
            if cityURL != "":
                city = r'''\href{''' + cityURL + r'''}{''' + city + r'''}'''
            endDate = item['my0:eduGradDate']
            if item['my0:eduGradDate'] == "":
                endDate = current[language]
            degreeType = runQueryMainOntology(item['my0:degreeType'], language)

            main = main + r'''
        \item \ressubheading{''' + orgName + r'''}{''' + city + r''', ''' + country + r'''}{''' + item['my0:degree'] + comma + degreeType + r'''}{''' + item['my0:eduStartDate'] + r''' - ''' + endDate + r'''}\\
        \begin{itemize}
        \item[]{''' + item['my0:eduDescription'] + r'''}
        \end{itemize}'''

        main = main + r'''\end{itemize}'''

    if (data['my0:hasCourse']):
        main = main + r'''
      %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
	    \resheading{''' + courseTitle[language] + r'''}
	    %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
	    \begin{itemize}'''
        for item in (data['my0:hasCourse']):
            address = item['my0:organizedBy']['my0:organizationAddress']
            orgName = item['my0:organizedBy']['my0:organizationName']
            orgURL = runQueryDBPEDIA(orgName, language)
            if orgURL != "":
                orgName = r'''\href{''' + orgURL + \
                    r'''}{''' + orgName + r'''}'''
            country = runQueryCountryMainOntology(
                address['my0:country'], language)
            country = r'''\href{''' + country + r'''}{''' + \
                getnameURI(address['my0:country']) + r'''}'''
            city = address['my0:city']
            cityURL = runQueryDBPEDIA(city, language)
            if cityURL != "":
                city = r'''\href{''' + cityURL + r'''}{''' + city + r'''}'''
            endDate = item['my0:courseFinishDate']
            if item['my0:courseFinishDate'] == "":
                endDate = current[language]
            coursetit = item['my0:courseTitle']
            if item['my0:courseURL']:
                coursetit = r'''\href{''' + item['my0:courseURL'] + \
                    r'''}{''' + item['my0:courseTitle'] + r'''}'''

            main = main + r'''
        \item \ressubheading{''' + orgName + r'''}{''' + city + r''', ''' + country + r'''}{''' + coursetit + r'''}{''' + item['my0:courseStartDate'] + r''' - ''' + endDate + r'''}\\
        \begin{itemize}
        \item[]{''' + item['my0:courseDescription'] + r'''}
        \end{itemize}'''

        main = main + r'''\end{itemize}'''

    if (data['my0:hasPublication']):
        main = main + r'''
      %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
	    \resheading{''' + publicationTitle[language] + r'''}
	    %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
	    \begin{itemize}'''
        publications = sorted(
            data['my0:hasPublication'],
            key=lambda x: x['my0:publiciationDate'], reverse=True
        )
        for item in (publications):
            main = main + r'''
		    \item \ressubheading{''' + item['my0:publiciationTitle'] + r'''}{''' + item['my0:publiciationPublisher'] + r'''}{''' + item['my0:publicationAuthor'] + r'''}{''' + item['my0:publiciationDate'] + r'''}\\
		    \begin{itemize}
		    \item[]{''' + item['my0:publicationDescription'] + r'''}
		    \end{itemize}'''

        main = main + r'''\end{itemize}'''

    if (data['my0:hasProject']):
        main = main + r'''
      %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
	    \resheading{''' + projectTitle[language] + r'''}
	    %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
	    \begin{itemize}'''
        projects = sorted(
            data['my0:hasProject'],
            key=lambda x: x['my0:projectStartDate'], reverse=True
        )
        for item in (projects):
            endDate = item['my0:projectEndDate']
            if item['my0:projectEndDate'] == "":
                endDate = current[language]
            main = main + r'''
		    \item \ressubheading{''' + item['my0:projectName'] + r'''}{''' + item['my0:projectCreator'] + r'''}{}{''' + item['my0:projectStartDate'] + r''' - ''' + endDate + r'''}\\
		    \begin{itemize}
		    \item[]{''' + item['my0:projectDescription'] + r'''}
		    \end{itemize}'''

        main = main + r'''\end{itemize}'''

    if (data['my0:hasPatent']):
        main = main + r'''
      %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
	    \resheading{''' + patentTitle[language] + r'''}
	    %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
	    \begin{itemize}'''
        patents = sorted(
            data['my0:hasPatent'],
            key=lambda x: x['my0:patentIssuedDate'], reverse=True
        )
        for item in (patents):
            endDate = item['my0:patentIssuedDate']
            if item['my0:patentIssuedDate'] == "":
                endDate = pending[language]
            patentNumber = item['my0:patentNumber']
            main = main + r'''
		    \item \ressubheading{''' + item['my0:patentTitle'] + r''' - ''' + patentNumber + r'''}{''' + item['my0:patentOffice'] + r'''}{''' + item['my0:patentInventor'] + r'''}{''' + endDate + r'''}\\
		    \begin{itemize}
		    \item[]{''' + item['my0:patentDescription'] + r'''}
		    \end{itemize}'''

        main = main + r'''\end{itemize}'''

    if (data['my0:hasOtherInfo']):
        main = main + r'''
      %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
	    \resheading{''' + otherInfoTitle[language] + r'''}
	    %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
	    \begin{itemize}'''
        for item in (data['my0:hasOtherInfo']):
            types = runQueryMainOntology(item['my0:otherInfoType'], language)

            main = main + r'''
		    \item[] \ressubheading{''' + types + r'''}{}{}{}\\*''' + item['my0:otherInfoDescription']

        main = main + r'''\end{itemize}'''
    return main
