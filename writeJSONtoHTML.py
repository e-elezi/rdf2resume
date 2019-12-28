import os
import glob
import subprocess
import argparse
from datetime import datetime
import requests
from queries import runQueryDBPEDIA, runQueryMainOntology, runQueryCountryMainOntology
from translations import toolsTech, otherSkillTitle , industrySkills, interpersonalSkills, courseTitle, workTitle, educationTitle, honorTitle, languageTitle, referenceTitle, skillTitle, aboutMeTitle, otherTitle, otherInfoTitle, skilllevel, getnameURI, projectTitle, patentTitle, publicationTitle, current, pending, doesURIContainWord

header = r'''
<!--
author: Boostraptheme
author URL: https://boostraptheme.com
License: Creative Commons Attribution 4.0 Unported
License URL: https://creativecommons.org/licenses/by/4.0/
Changed by: Enkeleda Elezi enkeleda.elezi@gmail.com
-->

<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <meta name="description" content="">
        <meta name="author" content="">
        <link rel="shortcut icon" href="img/favicon.ico">
        <title>RDF2Résumé</title>

        <!-- Global stylesheets -->
        <link href="css/bootstrap/bootstrap.min.css" rel="stylesheet">
        <link href="font-awesome/css/font-awesome.min.css" rel="stylesheet">
        <link href="css/devicons/css/devicons.min.css" rel="stylesheet">
        <link href="css/simple-line-icons/css/simple-line-icons.css" rel="stylesheet">
        <link href="css/style.css" rel="stylesheet">
    </head>

    <body prefix="
    my0: http://example.com/rdf2resume_ontology.rdf#
    rdf: http://www.w3.org/1999/02/22-rdf-syntax-ns#
    ns1: http://rdf-translator.appspot.com/
    xsd: http://www.w3.org/2001/XMLSchema#
    rdfs: http://www.w3.org/2000/01/rdf-schema#" id="page-top">
'''

footer = r'''
        </div>
    </body>
</html>
'''

space = r''' '''
comma = r''', '''


def generateHTMLNAV(photoData, data, lang):
    photoText = r''''''
    if photoData != '':
        photoText = r'''
                    <img class="img-fluid img-profile rounded-circle mx-auto mb-2" src=''' + photoData + r''' alt="">
        '''
    workText = r''''''
    eduText = r''''''
    honorText = r''''''
    patentText = r''''''
    publicationText = r''''''
    projectsText = r''''''
    otherText = r''''''
    skillText = r''''''
    if data['my0:hasWorkHistory']:
        workText = r'''
        <li class="nav-item">
            <a class="nav-link js-scroll-trigger" href="#experience">''' + workTitle[lang] + r'''</a>
        </li>
        '''
    if data['my0:hasEducation']:
        eduText = r'''
        <li class="nav-item">
            <a class="nav-link js-scroll-trigger" href="#education">''' + educationTitle[lang] + r'''/''' + courseTitle[lang] + r'''</a>
        </li>
        '''
    if data['my0:hasPatent']:
        patentText = r'''
        <li class="nav-item">
            <a class="nav-link js-scroll-trigger" href="#patents">''' + patentTitle[lang] + r'''</a>
        </li>
        '''
    if data['my0:hasPublication']:
        publicationText = r'''
        <li class="nav-item">
            <a class="nav-link js-scroll-trigger" href="#publications">''' + publicationTitle[lang] + r'''</a>
        </li>
        '''

    if data['my0:hasProject']:
        projectsText = r'''
        <li class="nav-item">
            <a class="nav-link js-scroll-trigger" href="#projects">''' + projectTitle[lang] + r'''</a>
        </li>
        '''

    if data['my0:hasHonorAward']:
        honorText = r'''
        <li class="nav-item">
            <a class="nav-link js-scroll-trigger" href="#awards">''' + honorTitle[lang] + r'''</a>
        </li>
        '''

    if data['my0:hasOtherInfo']:
        otherText = r'''
        <li class="nav-item">
            <a class="nav-link js-scroll-trigger" href="#other">''' + otherInfoTitle[lang] + r'''</a>
        </li>
        '''

    if data['my0:hasSkill']:
        skillText = r'''
        <li class="nav-item">
            <a class="nav-link js-scroll-trigger" href="#skills">''' + skillTitle[lang] + r'''</a>
        </li>
        '''

    text = r'''
        <nav class="navbar navbar-expand-lg navbar-dark bg-primary fixed-top" id="sideNav">
            <a class="navbar-brand js-scroll-trigger" href="#page-top">
                <span class="d-block d-lg-none  mx-0 px-0"></span>
                <span class="d-none d-lg-block">
                ''' + photoText + r'''
                </span>
            </a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav">
                    <li class="nav-item">
                        <a class="nav-link js-scroll-trigger" href="#about">About</a>
                    </li>
                    ''' + workText + r'''
                    ''' + eduText + r'''
                    ''' + skillText + r'''
                    ''' + publicationText + r'''
                    ''' + projectsText + r'''
                    ''' + honorText + r'''
                    ''' + patentText + r'''
                    ''' + otherText + r'''
                </ul>
            </div>
        </nav>
    '''
    return text


def generateHTMLABOUT(aboutData):
    address = aboutData['my0:address']
    countryName = getnameURI(address['my0:country'])
    fullAddress = address['my0:street'] + ' ' + address['my0:postalCode'] + \
        ' ' + address['my0:city'] + ' ' + countryName

    # add initial info on person, first name, last name, descriptions
    text = r'''
            <!--====================================================
                                    ABOUT
            ======================================================-->
            <section rel="my0:aboutPerson" typeof="my0:Person" class="resume-section p-3 p-lg-5 d-flex d-column" id="about">
                <div class="my-auto">
                    <h1 property="my0:firstName" content="''' + aboutData['my0:firstName'] + r'''" class="mb-0"> <span property="my0:title"
                    content="''' + aboutData['my0:title'] + r'''" class="text-primary">Mrs</span> ''' + aboutData['my0:firstName'] + r'''
                        <span property="my0:lastName" content="''' + aboutData['my0:lastName'] + r'''" class="text-primary">''' + aboutData['my0:lastName'] + r'''</span>
                    </h1>
                    <div class="subheading mb-5" property="my0:personShortDescription">''' + aboutData['my0:personShortDescription'] + r'''
                    </div>
                    <p property="my0:personLongDescription" class="mb-5" style="max-width: 500px;">''' + aboutData['my0:personLongDescription'] + r'''
                    </p>
                    <ul rel="my0:hasWebsite" class="list-inline list-social-icons mb-0">

    '''

    # add website information
    for website in (aboutData['my0:hasWebsite']):
        websiteType = getnameURI(website['my0:websiteType']).lower()
        websiteText = 'globe'
        if websiteType == 'facebook' or websiteType == 'linkedin' or websiteType == 'instagram' or websiteType == 'twitter' or websiteType == 'xing' or websiteType == 'github':
            websiteText = websiteType
        text = text + r'''
                        <li class="list-inline-item">
                            <a href="''' + website['my0:websiteURL'] + r'''" typeof="my0:Website">
                                <span class="fa-stack fa-lg" property="my0:websiteURL" content="''' + website['my0:websiteURL'] + r'''">
                                    <i class="fa fa-circle fa-stack-2x"></i>
                                    <i class="fa fa-''' + websiteText + r''' fa-stack-1x fa-inverse"></i>
                                </span>
                            </a>
                        </li>
        '''

    # add contact information
    text = text + r'''
                    </ul>
                </div>
                <br />
                <div class="my-auto">
                    <div class="contact-cont2">
                        <div rel="my0:address" class="contact-add contact-box-desc">
                            <h3><i class="fa fa-map-marker cl-atlantis fa-2x"></i> Address</a></h3>
                            <a target="_empty" href="https://www.openstreetmap.org/search?query=''' + fullAddress + r'''"
                            typeof="my0:Address">
                                <span property="my0:street" content="''' + address['my0:street'] + r'''">''' + address['my0:street'] + r'''<span><br />
                                <span property="my0:postalCode" content="''' + address['my0:postalCode'] + r'''">''' + address['my0:postalCode'] + r'''</span> <span property="my0:city"
                                content="''' + address['my0:city'] + r'''">''' + address['my0:city'] + r'''</span>
                                <p property="my0:country" content="''' + address['my0:country'] + r'''">
                                ''' + countryName + r'''</p>
                            </a>
                        </div>
                    </div>
                    <div class="contact-phone contact-side-desc contact-box-desc">
                        <h3><i class="fa fa-phone cl-atlantis fa-2x"></i> Phone</h3>
                        <p property="my0:phoneNumber" content="''' + aboutData['my0:phoneNumber'] + r'''">''' + aboutData['my0:phoneNumber'] + r'''</p>
                    </div>
                    <div class="contact-mail contact-side-desc contact-box-desc">
                        <h3><i class="fa fa-envelope-o cl-atlantis fa-2x"></i> Email</h3>
                        <address property="my0:email" content="''' + aboutData['my0:email'] + r'''" class="address-details-f">
                            <a href="mailto:''' + aboutData['my0:email'] + r'''" class="">''' + aboutData['my0:email'] + r'''</a>
                        </address>
                    </div>
                </div>
            </section>
    '''
    return text


def generateHTMLOneDateSection(date1):

    text = r'''
    <div class="resume-date text-md-right">
        <span class="text-primary">
        <span property="my0:startDate" content="''' + date1 + r'''">2016-03-01</span> - <span
        property="my0:endDate" content="''' + date1 + r'''">2016-10-03</span></span>
    </div>
    '''
    return text


def generateHTMLTwoDateSection(date1Name, date1Value, date2Name, date2Value, currentName, currentValue, lang):
    date_object1 = datetime.strptime(date1Value, '%Y-%m-%d')
    if date2Value == '':
        date_object2 = current[lang]
    else:
        date_object2 = datetime.strptime(date2Value, '%Y-%m-%d')
        date_object2 = date_object2.strftime("%b %Y")
    text = r'''
    <div class="resume-date text-md-right">
        <span class="text-primary">
        <span property="my0:''' + date1Name + r'''" content="''' + date1Value + r'''">''' + date_object1.strftime("%b %Y") + r'''</span> - <span
        property="my0:''' + date2Name + r'''" content="''' + date2Value + r'''">''' + date_object2 + r'''</span>
        <span property="my0:''' + currentName + r'''" hidden content="''' + str(currentValue) + r'''"></span></span>
    </div>
    '''
    return text


def generateHTMLWorkExperience(data, lang):

    text = r'''
            <!--====================================================
                                    WORK EXPERIENCE 
            ======================================================-->
            <section class="resume-section p-3 p-lg-5 " id="experience">
                <div rel="my0:hasWorkHistory" class="row my-auto">
                    <div class="col-12">
                        <h2 class="  text-center">''' + workTitle[lang] + r'''</h2>
                        <div class="mb-5 heading-border"></div>
                        </div>
    '''
    
    works = sorted(
    data['my0:hasWorkHistory'],
    key=lambda x: x['my0:startDate'], reverse=True
    )

    for work in works:
        workOrg = work['my0:employedIn']
        workOrgAddress = workOrg['my0:orgAddress']
        text = text + r'''
                        <div typeof="my0:WorkHistory" class="resume-item col-md-6 col-sm-12">
                            <div class="card mx-0 p-4 mb-5" style="border-color: #28a745; box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.21);">
                                <div class="resume-content mr-auto">
                                    <h4 class="mb-3"><i class="fa fa-briefcase mr-3 text-info"></i><span property="my0:jobTitle">
                                    ''' + work['my0:jobTitle'] + r'''</span><span property="my0:jobMode"
                                    content="''' + work['my0:jobMode'] + r'''"> (''' + getnameURI(work['my0:jobMode']) + r''')</span></h4>
                                    <h4 class="mb-3"><i class="fa fa-map-marker cl-atlantis"></i><span rel="my0:employedIn"
                                    typeOf="my0:Company">
                                        <span property="my0:orgName" content="''' + workOrg['my0:orgName'] + r'''">''' + workOrg['my0:orgName'] + r'''</span>
                                        <span rel="my0:orgAddress" typeOf="my0:Address">
                                        <span property="my0:city" content="''' + workOrgAddress['my0:city'] + r'''"> - ''' + workOrgAddress['my0:city'] + r'''</span><span property="my0:country"
                                        content="''' + workOrgAddress['my0:country'] + r'''">, ''' + getnameURI(workOrgAddress['my0:country']) + r'''</span></span>
                                    </h4>
                                    <p property="my0:jobDescription">''' + work['my0:jobDescription'] + r'''</p>
                                </div>
                                ''' + generateHTMLTwoDateSection('startDate', work['my0:startDate'], 'endDate', work['my0:endDate'], 'isCurrent', work['my0:isCurrent'], lang) + r'''
                            </div>
                        </div>
        '''

    text = text + r'''
                    </div>
                </div>
            </section>
    '''
    return text


def generateHTMLProject(data, lang):

    text = r'''
            <!--====================================================
                                    PROJECTS
            ======================================================-->
            <section class="resume-section p-3 p-lg-5 " id="experience">
                <div rel="my0:hasProject" class="row my-auto">
                    <div class="col-12">
                        <h2 class="  text-center">''' + projectTitle[lang] + r'''</h2>
                        <div class="mb-5 heading-border"></div>
                        </div>
    '''

    projects = sorted(
    data['my0:hasProject'],
    key=lambda x: x['my0:projectStartDate'], reverse=True
    )

    for project in projects:
        text = text + r'''
                        <div typeof="my0:Project" class="resume-item col-md-12 col-sm-12 ">
                            <div class="card mx-0 p-4 mb-5" style="border-color: #17a2b8; box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.21);">
                                <div class=" resume-content mr-auto">
                                    <h4 class="mb-3"><i class="fa fa-globe mr-3 text-info"></i><span
                                    property="my0:projectName">''' + project['my0:projectName'] + r'''</span><span property="my0:projectCreator" content="''' + project['my0:projectCreator'] + r'''"> -
                                    ''' + project['my0:projectCreator'] + r'''</span></h4>
                                    <p property="my0:projectDescription">''' + project['my0:projectDescription'] + r'''</p>
                                </div>
                                ''' + generateHTMLTwoDateSection('projectStartDate', project['my0:projectStartDate'], 'projectEndDate', project['my0:projectEndDate'], 'projectIsCurrent', project['my0:projectIsCurrent'], lang) + r'''
                            </div>
                        </div>
        '''

    text = text + r'''
                    </div>
                </div>
            </section>
    '''
    return text


def generateHTMLEducationCourses(data, lang):

    text = r'''
            <!--====================================================
                                EDUCATION / COURSES
            ======================================================-->
            <section class="resume-section p-3 p-lg-5 " id="education">
                <div rel="my0:hasEducation" class="row my-auto">
                    <div class="col-12">
                        <h2 class="  text-center">''' + educationTitle[lang] + r'''</h2>
                        <div class="mb-5 heading-border"></div>
                    </div>
    '''
    
    edus = sorted(
    data['my0:hasEducation'],
    key=lambda x: x['my0:eduStartDate'], reverse=True
    )

    # print education
    for edu in edus:
        eduOrg = edu['my0:studiedIn']
        eduOrgAddress = eduOrg['my0:orgAddress']
        text = text + r'''
                        <div typeof="my0:Education" class="resume-item col-md-12 col-sm-12 ">
                            <div class="card mx-0 p-4 mb-5" style="border-color: #17a2b8; box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.21);">
                                <div class="resume-content mr-auto">
                                    <h4 class="mb-3"><i class="fa fa-globe mr-3 text-info"></i><span property="my0:degreeType"
                                    content="''' + edu['my0:degreeType'] + r'''">Master of Science</span><span
                                    property="my0:degree" content="''' + edu['my0:degree'] + r'''"> - ''' + edu['my0:degree'] + r'''</span></h4>
                                    <h4 class="mb-3"><i class="fa fa-map-marker cl-atlantis"></i><span rel="my0:studiedIn"
                                    typeOf="my0:EducationalOrg">
                                        <span property="my0:orgName" content="''' + eduOrg['my0:orgName'] + r'''">''' + eduOrg['my0:orgName'] + r'''</span>
                                        <span rel="my0:orgAddress" typeOf="my0:Address">
                                        <span property="my0:city" content="''' + eduOrgAddress['my0:city'] + r'''"> - ''' + eduOrgAddress['my0:city'] + r'''</span><span property="my0:country"
                                        content="''' + eduOrgAddress['my0:country'] + r'''">, ''' + getnameURI(eduOrgAddress['my0:country']) + r'''</span></span>
                                    </h4>
                                    <p property="my0:eduDescription">''' + edu['my0:eduDescription'] + r'''</p>
                                </div>
                                ''' + generateHTMLTwoDateSection('eduStartDate', edu['my0:eduStartDate'], 'eduGradDate', edu['my0:eduGradDate'], 'isEduCurrent', edu['my0:isEduCurrent'], lang) + r'''
                            </div>
                        </div>
        '''

    text = text + r'''
                </div>
                <div rel="my0:hasCourse" class="row my-auto">
                    <div class="col-12">
                        <h2 class="  text-center">''' + courseTitle[lang] + r'''</h2>
                        <div class="mb-5 heading-border"></div>
                    </div>
    '''

    courses = sorted(
    data['my0:hasCourse'],
    key=lambda x: x['my0:courseStartDate'], reverse=True
    )

    # print courses
    for course in courses:
        courseOrg = course['my0:organizedBy']
        text = text + r'''
                        <div typeof="my0:Course" class="resume-item col-md-12 col-sm-12 ">
                            <div class="card mx-0 p-4 mb-5" style="border-color: #17a2b8; box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.21);">
                                <div class=" resume-content mr-auto">
                                    <h4 class="mb-3"><i class="fa fa-globe mr-3 text-info"></i><span property="my0:courseTitle">
                                    ''' + course['my0:courseTitle'] + r'''</span><span rel="my0:organizedBy" typeof="my0:Organization"><span
                                    property="my0:orgName" content="''' + courseOrg['my0:orgName'] + r'''"> - ''' + courseOrg['my0:orgName'] + r'''</span></span></h4>
                                    <p property="my0:courseDescription">''' + course['my0:courseDescription'] + r'''</p>
                                </div>
                                ''' + generateHTMLTwoDateSection('courseStartDate', course['my0:courseStartDate'], 'courseFinishDate', course['my0:courseFinishDate'], '', 'False',  lang) + r'''
                            </div>
                        </div>
        '''

    text = text + r'''
                    </div>
                </div>
            </section>
    '''

    return text


def generateHTMLPatents(data, lang):

    text = r'''
            <!--====================================================
                                PATENT
            ======================================================-->
            <section rel="my0:hasPatent" class="resume-section p-3 p-lg-5 " id="publications">
                <div class="row my-auto">
                    <div class="col-12">
                        <h2 class="  text-center">''' + patentTitle[lang] + r'''</h2>
                        <div class="mb-5 heading-border"></div>
                    </div>
    '''
    patents = sorted(
    data['my0:hasPatent'],
    key=lambda x: x['my0:patentIssuedDate'], reverse=True
    )

    # print patent info
    for patent in patents:
        status = runQueryMainOntology(patent['my0:patentStatus'], lang)
        date_print = r''''''
        if patent['my0:patentIssuedDate'] != '':
            date_obj = datetime.strptime(
            patent['my0:patentIssuedDate'], '%Y-%m-%d')
            date_print = date_obj.strftime("%b %Y")

        text = text + r'''
                        <div typeof="my0:Patent" class="resume-item col-md-12 col-sm-12 ">
                            <div class="card mx-0 p-4 mb-5" style="border-color: #17a2b8; box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.21);">
                                <div class=" resume-content mr-auto">
                                    <h4 class="mb-3"><i class="fa fa-globe mr-3 text-info"></i><span property="my0:patentNumber">
                                    ''' + patent['my0:patentNumber'] + r'''</span><span property="my0:patentTitle" content="''' + patent['my0:patentTitle'] + r'''"> - ''' + patent['my0:patentTitle'] + r'''</span></h4>
                                    <h4 class="mb-3"><i class="fa fa-pen cl-atlantis"></i>
                                        <span property="my0:patentInventor" content="''' + patent['my0:patentInventor'] + r'''">''' + patent['my0:patentInventor'] + r'''</span>
                                    </h4>
                                    <p property="my0:patentDescription">''' + patent['my0:patentDescription'] + r'''</p>
                                </div>
                                <div class="resume-date text-md-right">
                                    <span property="my0:patentStatus" content="''' + patent['my0:patentStatus'] + r'''"
                                    class="text-primary" hidden>''' + status + r'''</span>
                                    <span property="my0:patentIssuedDate" class="text-primary" content="''' + patent['my0:patentIssuedDate'] + r'''">''' + date_print + r'''</span>
                                </div>
                            </div>
                        </div>
        '''

    text = text + r'''
                </div>
            </section>
    '''

    return text


def generateHTMLPublications(data, lang):

    text = r'''
            <!--====================================================
                                PUBLICATIONS
            ======================================================-->
            <section rel="my0:hasPublication" class="resume-section p-3 p-lg-5 " id="publications">
                <div class="row my-auto">
                    <div class="col-12">
                        <h2 class="text-center">''' + publicationTitle[lang] + r'''</h2>
                        <div class="mb-5 heading-border"></div>
                    </div>
    '''

    publications = sorted(
    data['my0:hasPublication'],
    key=lambda x: x['my0:publiciationDate'], reverse=True
    )

    # print publication info
    for publication in publications:
        date_print = r''''''
        if publication['my0:publiciationDate'] != '':
            date_obj = datetime.strptime(
            publication['my0:publiciationDate'], '%Y-%m-%d')
            date_print = date_obj.strftime("%b %Y")

        text = text + r'''
                        <div class="resume-item col-md-12 col-sm-12 ">
                            <div typeof="my0:Publication" class="resume-item col-md-12 col-sm-12 ">
                                <div class="card mx-0 p-4 mb-5" style="border-color: #17a2b8; box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.21);">
                                    <div class=" resume-content mr-auto">
                                        <h4 class="mb-3"><i class="fa fa-globe mr-3 text-info"></i><span property="my0:publicationTitle"
                                        content="''' + publication['my0:publiciationTitle'] + r'''">''' + publication['my0:publiciationTitle'] + r'''</span></h4>
                                        <h4 class="mb-3"><i class="fa fa-pen cl-atlantis"></i>
                                            <span property="my0:publicationAuthor" content="''' + publication['my0:publicationAuthor'] + r'''">''' + publication['my0:publicationAuthor'] + r'''</span>
                                        </h4>
                                        <p property="my0:publicationDescription">''' + publication['my0:publicationDescription'] + r'''</p>
                                    </div>
                                <div class="resume-date text-md-right">
                                    <span property="my0:publiciationDate" content="''' + publication['my0:publiciationDate'] + r'''" class="text-primary">''' + date_print  + r'''</span>
                                </div>
                            </div>
                        </div>
        '''

    text = text + r'''
                </div>
            </section>
    '''

    return text


def generateHTMLHonors(data, lang):

    text = r'''
            <!--====================================================
                                HONOR / AWARDS
            ======================================================-->
            <section rel="my0:hasHonorAward" class="resume-section p-3 p-lg-5 d-flex flex-column" id="awards">
                <div class="row my-auto">
                    <div class="col-12">
                        <h2 class="text-center">''' + honorTitle[lang] + r'''</h2>
                        <div class="mb-5 heading-border"></div>
                    </div>
                    <div class="main-award" id="award-box">

    '''
    honors = sorted(
    data['my0:hasHonorAward'],
    key=lambda x: x['my0:honorIssuedDate'], reverse=True
    )

    # print honor info
    for honor in honors:
        date_obj = datetime.strptime(honor['my0:honorIssuedDate'], '%Y-%m-%d')

        text = text + r'''
                        <div typeof="my0:HonorAward" class="award">
                            <div class="award-icon"></div>
                            <div class="award-content">
                                <span class="date" property="my0:honorIssuedDate" content="''' + honor['my0:honorIssuedDate'] + r'''">''' + date_obj.strftime("%b %Y") + r'''</span>
                                <h5 class="title"><span property="my0:honorTitle">''' + honor['my0:honorTitle'] + r'''</span></h5>
                                <p property="my0:honorDescription" class="description">''' + honor['my0:honorDescription'] + r'''</p>
                            </div>
                        </div>
        '''

    text = text + r'''
                    </div>
                </div>
            </section>
    '''

    return text


def generateHTMLOtherInfo(data, lang):

    text = r'''
            <!--====================================================
                                OTHER INFORMATION
            ======================================================-->
            <section rel="my0:hasOtherInfo" class="resume-section p-3 p-lg-5 " id="other">
                <div class="row my-auto">
                    <div class="col-12">
                        <h2 class="  text-center">''' + otherInfoTitle[lang] + r'''</h2>
                        <div class="mb-5 heading-border"></div>
                    </div>
    '''

    # print other info
    for other in (data['my0:hasOtherInfo']):
        types = runQueryMainOntology(other['my0:otherInfoType'], lang)
        text = text + r'''
                        <div typeof="my0:OtherInfo" class="resume-item col-md-12 col-sm-12 ">
                            <div class=" resume-content mr-auto">
                                <h4 class="mb-3"><i class="fa fa-globe mr-3 text-info"></i>Category: <span property="my0:otherInfoType"
                                content="''' + other['my0:otherInfoType'] + r'''">''' + types + r'''</span></h4>
                                <p property="my0:otherInfoDescription">''' + other['my0:otherInfoDescription'] + r'''</p>
                            </div>
                        </div>
        '''

    text = text + r'''
                </div>
            </section>
    '''

    return text


def generateHTMLSkills(data, lang):

    text = r'''
                <!--====================================================
                                    SKILLS
                ======================================================-->
                <section rel="my0:hasSkill" class=" d-flex flex-column" id="skills">
    '''

    # print language skills
    text = text + r'''
                    <div class="p-lg-5 p-3 skill-cover">
                        <h3 class="text-center text-white">''' + languageTitle[lang] + r'''</h3>
                        <div class="row text-center my-auto ">
    '''

    for skill in (data['my0:hasSkill']):
        if skill['@type'] == 'my0:LanguageSkill':
            proficiency = runQueryMainOntology(
                skill['my0:languageSkillProficiency'], lang)
            text = text + r'''
                            <div typeof="my0:LanguageSkill" class="col-md-3 col-sm-6">
                                <div class="skill-item">
                                    <h2 property="my0:languageSkillProficiency"
                                    content="''' + skill['my0:languageSkillProficiency'] + r'''"><span class="counter">''' + proficiency + r'''</span></h2>
                                    <p property="my0:skillName">''' + skill['my0:skillName'] + r'''</p>
                                </div>
                            </div>
            '''
    
    text = text + r'''
                        </div>
                    </div>
    '''

    # print tools and technologies skills
    text = text + r'''
                    <div class="p-lg-5 p-3 skill-cover">
                        <h3 class="text-center text-white">''' + toolsTech[lang] + r'''</h3>
                        <div class="row text-center my-auto ">
    '''

    for skill in (data['my0:hasSkill']):
        if skill['@type'] == 'my0:Skill' and skill['my0:skillCategory'] == 'http://example.com/rdf2resume_base_ontology.rdf#ToolsTechnologies' :
            text = text + r'''
                            <div typeof="my0:Skill" class="col-md-3 col-sm-6">
                                <div class="skill-item">
                                    <h2><span class="counter" property="my0:skillLevel" content="''' + skill['my0:skillLevel'] + r'''>''' + skill['my0:skillLevel'] + r'''</span>/5</h2>
                                    <p property="my0:skillName">''' + skill['my0:skillName'] + r'''</p>
                                </div>
                            </div>
            '''

    text = text + r'''
                        </div>
                    </div>
    '''

    # print industry knowledge skills
    text = text + r'''
                    <div class="p-lg-5 p-3 skill-cover">
                        <h3 class="text-center text-white">''' + industrySkills[lang] + r'''</h3>
                        <div class="row text-center my-auto ">
    '''

    for skill in (data['my0:hasSkill']):
        if skill['@type'] == 'my0:Skill' and skill['my0:skillCategory'] == 'http://example.com/rdf2resume_base_ontology.rdf#IndustryKnowledge' :
            text = text + r'''
                            <div typeof="my0:Skill" class="col-md-3 col-sm-6">
                                <div class="skill-item">
                                    <h2><span class="counter" property="my0:skillLevel" content="''' + skill['my0:skillLevel'] + r'''>''' + skill['my0:skillLevel'] + r'''</span>/5</h2>
                                    <p property="my0:skillName">''' + skill['my0:skillName'] + r'''</p>
                                </div>
                            </div>
            '''
    text = text + r'''
                        </div>
                    </div>
    '''

    # print interpersonal skills
    text = text + r'''
                    <div class="p-lg-5 p-3 skill-cover">
                        <h3 class="text-center text-white">''' + interpersonalSkills[lang] + r'''</h3>
                        <div class="row text-center my-auto ">
    '''

    for skill in (data['my0:hasSkill']):
        if skill['@type'] == 'my0:Skill' and skill['my0:skillCategory'] == 'http://example.com/rdf2resume_base_ontology.rdf#InterpersonalSkills' :
            text = text + r'''
                            <div typeof="my0:Skill" class="col-md-3 col-sm-6">
                                <div class="skill-item">
                                    <h2><span class="counter" property="my0:skillLevel" content="''' + skill['my0:skillLevel'] + r'''>''' + skill['my0:skillLevel'] + r'''</span>/5</h2>
                                    <p property="my0:skillName">''' + skill['my0:skillName'] + r'''</p>
                                </div>
                            </div>
            '''
    text = text + r'''
                        </div>
                    </div>
    '''

    # print other skills
    text = text + r'''
                    <div class="p-lg-5 p-3 skill-cover">
                        <h3 class="text-center text-white">''' + otherSkillTitle[lang] + r'''</h3>
                        <div class="row text-center my-auto ">
    '''

    for skill in (data['my0:hasSkill']):
        if skill['@type'] == 'my0:Skill' and skill['my0:skillCategory'] == 'http://example.com/rdf2resume_base_ontology.rdf#OtherSkills' :
            text = text + r'''
                            <div typeof="my0:Skill" class="col-md-3 col-sm-6">
                                <div class="skill-item">
                                    <h2><span class="counter" property="my0:skillLevel" content="''' + skill['my0:skillLevel'] + r'''>''' + skill['my0:skillLevel'] + r'''</span>/5</h2>
                                    <p property="my0:skillName">''' + skill['my0:skillName'] + r'''</p>
                                </div>
                            </div>
            '''
    text = text + r'''
                        </div>
                    </div>
    '''

    return text


def generateHTMLDesign1(data, language):

    main = r''''''

    if (data['my0:aboutPerson']):

        item = data['my0:aboutPerson']
        photo = item['my0:photo']
        # write navigation part
        main = main + generateHTMLNAV(photo, data, language)

        main = main + r'''
        <div typeof="my0:CV" class="container-fluid p-0">
        '''

        # write about part
        main = main + generateHTMLABOUT(item)

    if (data['my0:hasWorkHistory']):
        main = main + generateHTMLWorkExperience(data, language)

    if (data['my0:hasEducation']):
        main = main + generateHTMLEducationCourses(data, language)

    if (data['my0:hasSkill']):
        main = main + generateHTMLSkills(data, language)

    if (data['my0:hasPublication']):
        main = main + generateHTMLPublications(data, language)

    if (data['my0:hasProject']):
        main = main + generateHTMLProject(data, language)

    if (data['my0:hasHonorAward']):
        main = main + generateHTMLHonors(data, language)

    if (data['my0:hasPatent']):
        main = main + generateHTMLPatents(data, language)

    if (data['my0:hasOtherInfo']):
        main = main + generateHTMLOtherInfo(data, language)

    main = main + r'''
        </div>
    '''

    return main


def writeJSONtoHTML(data, filename, language):
    main = r''''''

    main = generateHTMLDesign1(data, language)

    content = header + main + footer

    completeName = os.path.join('build/static/media/html', filename)
    with open(completeName + '.html', 'w') as f:
        f.write(content)

    return f
