from datetime import datetime
from queries import runQueryDBPEDIA, runQueryMainOntology, runQueryCountryMainOntology
from translations import getValueFromLang, courseTitle, workTitle, educationTitle, languageTitle, referenceTitle, skillTitle, aboutMeTitle, otherTitle, otherInfoTitle, skilllevel, getnameURI, projectTitle, patentTitle, publicationTitle, current, pending, doesURIContainWord

headerCV1 = r'''
    \documentclass[letterpaper,11pt]{article}
    \newlength{\outerbordwidth}
    \pagestyle{empty}
    \raggedbottom
    \raggedright

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
        address = item['my0:address']
        country = runQueryCountryMainOntology(address['my0:country'], language)
        
        # write personal information about the user
        main = main + r'''
      \begin{tabular*}{7in}{l@{\extracolsep{\fill}}r}
      \textbf{\Large ''' + item['my0:firstName'] + space + item['my0:lastName'] + r'''} &
       \textbf{} \\
      ''' + getValueFromLang(address['my0:street'], language) + space + address['my0:postalCode'] + r''' & ''' + item['my0:email'] + r'''\\
      ''' + getValueFromLang(address['my0:city'],language) + comma + country + r''' & ''' + item['my0:phoneNumberMobile'] + r'''\\'''

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
            address = item['my0:employedIn']['my0:orgAddress']
            countryName = runQueryCountryMainOntology(address['my0:country'], language)
            cityName = getValueFromLang(address['my0:city'], language)
            jobTitle = getValueFromLang(item['my0:jobTitle'], language)
            jobType = runQueryMainOntology(item['my0:jobType'], language)
            if item['my0:endDate'] == "":
                endDate = current[language]
            main = main + r'''
        \item \ressubheading{''' + item['my0:employedIn']['my0:orgName'] + r'''}{''' + cityName + r''', ''' + countryName + r'''}{''' + jobTitle  + comma + jobType + r'''}{''' + item['my0:startDate'] + r''' - ''' + endDate + r'''}\\
        \begin{itemize}
        \item[]{''' + getValueFromLang(item['my0:jobDescription'], language) + r'''}
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
            address = item['my0:studiedIn']['my0:orgAddress']
            countryName = runQueryCountryMainOntology(address['my0:country'], language)
            cityName = getValueFromLang(address['my0:city'], language)
            if item['my0:eduGradDate'] == "":
                endDate = current[language]
            main = main + r'''
		    \item \ressubheading{''' + getValueFromLang(item['my0:studiedIn']['my0:orgName'], language) + r'''}{''' + cityName + r''', ''' + countryName + r'''}{''' + runQueryMainOntology(item['my0:degree'], language) + comma + getValueFromLang(item['my0:degreeFieldOfStudy'], language) + r'''}{''' + item['my0:eduStartDate'] + r''' - ''' + endDate + r'''}\\
		    \begin{itemize}
		    \item[]{''' + getValueFromLang(item['my0:eduDescription'], language) + r'''}
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
            address = item['my0:organizedBy']['my0:orgAddress']
            countryName = runQueryCountryMainOntology(address['my0:country'], language)
            cityName = getValueFromLang(address['my0:city'], language)
            if item['my0:courseFinishDate'] == "":
                endDate = current[language]
            main = main + r'''
		    \item \ressubheading{''' + item['my0:organizedBy']['my0:orgName'] + r'''}{''' + cityName + r''', ''' + countryName + r'''}{''' + getValueFromLang(item['my0:courseTitle'], language) + comma + item['my0:courseURL'] + r'''}{''' + item['my0:courseStartDate'] + r''' - ''' + endDate + r'''}\\
		    \begin{itemize}
		    \item[]{''' + getValueFromLang(item['my0:courseDescription'], language) + r'''}
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
            key=lambda x: x['my0:publicationDate'], reverse=True
        )
        for item in (publications):
            main = main + r'''
		    \item \ressubheading{''' + getValueFromLang(item['my0:publicationTitle'], language) + r'''}{''' + item['my0:publicationPublisher'] + r'''}{''' + item['my0:publicationAuthor'] + r'''}{''' + item['my0:publicationDate'] + r'''}\\
		    \begin{itemize}
		    \item[]{''' + getValueFromLang(item['my0:publicationDescription'], language) + r'''}
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
		    \item \ressubheading{''' + getValueFromLang(item['my0:projectName'], language) + r'''}{''' + getValueFromLang(item['my0:projectCreator'], language) + r'''}{''' + getValueFromLang(item['my0:projectRole'], language) + r'''}{''' + item['my0:projectStartDate'] + r''' - ''' + endDate + r'''}\\
		    \begin{itemize}
		    \item[]{''' + getValueFromLang(item['my0:projectDescription'], language) + r'''}
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
		    \item \ressubheading{''' + item['my0:patentNumber'] + r''' - ''' + getValueFromLang(item['my0:patentTitle'], language) + r'''}{''' + getValueFromLang(item['my0:patentOffice'], language) + r'''}{''' + item['my0:patentInventor'] + r'''}{''' + endDate + r'''}\\
		    \begin{itemize}
		    \item[]{''' + getValueFromLang(item['my0:patentDescription'], language) + r'''}
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
		    \item[] \ressubheading{''' + runQueryMainOntology(item['my0:otherInfoType'], language) + r'''}{}{}{}\\*''' + getValueFromLang(item['my0:otherInfoDescription'], language)

        main = main + r'''\end{itemize}'''
    return main


def generateMainDesign1Enriched(data, language):
    main = headerCV1

    if (data['my0:aboutPerson']):
        item = data['my0:aboutPerson']
        address = item['my0:address']
        country = runQueryCountryMainOntology(address['my0:country'], language)
        full_address = getValueFromLang(address['my0:street'], language) + space + getValueFromLang(address['my0:city'], language) + \
            space + address['my0:postalCode'] + space + country

        # write personal information about the user
        main = main + r'''
      \begin{tabular*}{7in}{l@{\extracolsep{\fill}}r}
      \textbf{\Large ''' + item['my0:firstName'] + space + item['my0:lastName'] + r'''} & \textbf{\today} \\
      ''' + getValueFromLang(address['my0:street'], language) + space + address['my0:postalCode'] + r''' & ''' + item['my0:email'] + r'''\\''' + getValueFromLang(address['my0:city'], language) + comma + country + r'''\href{https://www.openstreetmap.org/search?query=''' + full_address + r'''}{\faMapMarker}  & ''' + item['my0:phoneNumberMobile'] + r'''\\
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

            address = item['my0:employedIn']['my0:orgAddress']
            orgName = item['my0:employedIn']['my0:orgName']
            orgURL = runQueryDBPEDIA(orgName, language)
            if orgURL != "":
                orgName = r'''\href{''' + orgURL + \
                    r'''}{''' + orgName + r'''}'''
            countryName = runQueryCountryMainOntology(
                address['my0:country'], language)
            countryURL = runQueryDBPEDIA(countryName, language)
            if countryURL != "":
                country = r'''\href{''' + countryURL + r'''}{''' + \
                countryName + r'''}'''
            city = getValueFromLang(address['my0:city'], language)
            cityURL = runQueryDBPEDIA(city, language)
            if cityURL != "":
                city = r'''\href{''' + cityURL + r'''}{''' + city + r'''}'''
            jobMode = runQueryMainOntology(item['my0:jobType'], language)
            endDate = item['my0:endDate']
            if item['my0:endDate'] == "":
                endDate = current[language]

            main = main + r'''
        \item \ressubheading{''' + orgName + r'''}{''' + city + r''', ''' + country + r'''}{''' + getValueFromLang(item['my0:jobTitle'], language) + comma + jobMode + r'''}{''' + item['my0:startDate'] + r''' - ''' + endDate + r'''}\\
        \begin{itemize}
        \item[]{''' + getValueFromLang(item['my0:jobDescription'], language) + r'''}
        \end{itemize}'''

        main = main + r'''\end{itemize}'''

    if (data['my0:hasEducation']):
        main = main + r'''
      %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
	    \resheading{''' + educationTitle[language] + r'''}
	    %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
	    \begin{itemize}'''
        for item in (data['my0:hasEducation']):
            address = item['my0:studiedIn']['my0:orgAddress']
            orgName = getValueFromLang(item['my0:studiedIn']['my0:orgName'], language)
            orgURL = runQueryDBPEDIA(orgName, language)
            if orgURL != "":
                orgName = r'''\href{''' + orgURL + \
                    r'''}{''' + orgName + r'''}'''
            countryName = runQueryCountryMainOntology(
                address['my0:country'], language)
            countryURL = runQueryDBPEDIA(countryName, language)
            if countryURL != "":
                country = r'''\href{''' + countryURL + r'''}{''' + \
                countryName + r'''}'''
            city = getValueFromLang(address['my0:city'], language)
            cityURL = runQueryDBPEDIA(city, language)
            if cityURL != "":
                city = r'''\href{''' + cityURL + r'''}{''' + city + r'''}'''
            endDate = item['my0:eduGradDate']
            if item['my0:eduGradDate'] == "":
                endDate = current[language]
            degreeType = runQueryMainOntology(item['my0:degree'], language)

            main = main + r'''
        \item \ressubheading{''' + orgName + r'''}{''' + city + r''', ''' + country + r'''}{''' + getValueFromLang(item['my0:degreeFieldOfStudy'], language) + comma + degreeType + r'''}{''' + item['my0:eduStartDate'] + r''' - ''' + endDate + r'''}\\
        \begin{itemize}
        \item[]{''' + getValueFromLang(item['my0:eduDescription'], language) + r'''}
        \end{itemize}'''

        main = main + r'''\end{itemize}'''

    if (data['my0:hasCourse']):
        main = main + r'''
      %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
	    \resheading{''' + courseTitle[language] + r'''}
	    %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
	    \begin{itemize}'''
        for item in (data['my0:hasCourse']):
            address = item['my0:organizedBy']['my0:orgAddress']
            orgName = item['my0:organizedBy']['my0:orgName']
            orgURL = runQueryDBPEDIA(orgName, language)
            if orgURL != "":
                orgName = r'''\href{''' + orgURL + \
                    r'''}{''' + orgName + r'''}'''
            countryName = runQueryCountryMainOntology(
                address['my0:country'], language)
            countryURL = runQueryDBPEDIA(countryName, language)
            if countryURL != "":
                country = r'''\href{''' + countryURL + r'''}{''' + \
                countryName + r'''}'''
            city = getValueFromLang(address['my0:city'], language)
            cityURL = runQueryDBPEDIA(city, language)
            if cityURL != "":
                city = r'''\href{''' + cityURL + r'''}{''' + city + r'''}'''
            endDate = item['my0:courseFinishDate']
            if item['my0:courseFinishDate'] == "":
                endDate = current[language]
            coursetit = getValueFromLang(item['my0:courseTitle'], language)
            if item['my0:courseURL']:
                coursetit = r'''\href{''' + item['my0:courseURL'] + \
                    r'''}{''' + getValueFromLang(item['my0:courseTitle'], language) + r'''}'''

            main = main + r'''
        \item \ressubheading{''' + orgName + r'''}{''' + city + r''', ''' + country + r'''}{''' + coursetit + r'''}{''' + item['my0:courseStartDate'] + r''' - ''' + endDate + r'''}\\
        \begin{itemize}
        \item[]{''' + getValueFromLang(item['my0:courseDescription'], language) + r'''}
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
            key=lambda x: x['my0:publicationDate'], reverse=True
        )
        for item in (publications):
            main = main + r'''
		    \item \ressubheading{''' + getValueFromLang(item['my0:publicationTitle'], language) + r'''}{''' + item['my0:publicationPublisher'] + r'''}{''' + item['my0:publicationAuthor'] + r'''}{''' + item['my0:publicationDate'] + r'''}\\
		    \begin{itemize}
		    \item[]{''' + getValueFromLang(item['my0:publicationDescription'], language) + r'''}
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
		    \item \ressubheading{''' + getValueFromLang(item['my0:projectName'], language) + r'''}{''' + getValueFromLang(item['my0:projectCreator'], language) + r'''}{''' + getValueFromLang(item['my0:projectRole'], language) + r'''}{''' + item['my0:projectStartDate'] + r''' - ''' + endDate + r'''}\\
		    \begin{itemize}
		    \item[]{''' + getValueFromLang(item['my0:projectDescription'], language) + r'''}
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
		    \item \ressubheading{''' + getValueFromLang(item['my0:patentTitle'], language) + r''' - ''' + patentNumber + r'''}{''' + getValueFromLang(item['my0:patentOffice'], language) + r'''}{''' + item['my0:patentInventor'] + r'''}{''' + endDate + r'''}\\
		    \begin{itemize}
		    \item[]{''' + getValueFromLang(item['my0:patentDescription'], language) + r'''}
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
		    \item[] \ressubheading{''' + types + r'''}{}{}{}\\*''' + getValueFromLang(item['my0:otherInfoDescription'], language)

        main = main + r'''\end{itemize}'''
    return main
