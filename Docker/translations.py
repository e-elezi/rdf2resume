workTitle = {
    "en": 'Work experience',
    "sq": 'Eksperiencë Pune',
    "de": 'Berufserfahrung',
    "fr": 'Expérience de travail',
    "it": 'Esperienza di lavoro'
}
educationTitle = {
    "en": 'Education',
    "sq": 'Arsimi',
    "de": 'Ausbildung',
    "fr": "L'éducation",
    "it": 'Educazione'
}
projectTitle = {
    "en": "Project",
    "sq": "Projekti",
    "fr": "Le projet",
    "de": "Projekt",
    "it": "Il progetto"
}
honorTitle = {
    "en": "Honor & Awards",
    "sq": "Nderime dhe çmime",
    "fr": "Prix et distinctions",
    "de": "Ehrungen & Auszeichnungen",
    "it": "Premi e riconoscimenti"
}
publicationTitle = {
    "en": "Publication",
    "sq": "Botime",
    "fr": "Publication",
    "de": "Veröffentlichung",
    "it": "Pubblicazione"
}
current = {
    "en": "Now",
    "it": "Ora",
    "sq": "Tani",
    "fr": "À présent",
    "de": "Jetzt"
}
pending = {
    "en": "Pending",
    "sq": "Në pritje",
    "it": "Pendenti",
    "fr": "En attendant",
    "de": "Ausstehend"
}
patentTitle = {
    "en": "Patent",
    "sq": "Patenta",
    "fr": "Brevet",
    "de": "Patent",
    "it": "Brevetto"
}
languageTitle = {
    "en": 'Language Skills',
    "sq": "Aftësitë linguistike",
    "de": 'Sprachkenntnisse',
    "fr": "Compétences linguistiques",
    "it": 'Competenze linguistiche'
}
otherSkillTitle = {
    "en": 'Other Skills',
    "sq": "Aftësi të tjera",
    "de": 'Andere Fähigkeiten',
    "fr": "Autres compétences",
    "it": 'Altre competenze'
}
otherTitle = {
    "en": 'Other',
    "sq": "Të tjera",
    "de": 'Andere',
    "fr": "Autres",
    "it": 'Altre'
}
skillTitle = {
    "en": 'Skills',
    "sq": "Aftësitë",
    "de": 'Fähigkeiten',
    "fr": "Compétences",
    "it": 'Competenze'
}
referenceTitle = [
    {
        "en": 'References',
        "sq": "Referencat",
        "de": 'Referenzen',
        "fr": "Les références",
        "it": 'Riferimenti'
    },
    {
        "en": 'References upon request.',
        "sq": "Referencat sipas kërkesës",
        "de": 'Referenzen auf Anfrage.',
        "fr": "Références sur demande.",
        "it": 'Riferimenti su richiesta.'
    }
]
courseTitle = {
    "en": 'Course/Training',
    "sq": "Kurse/Trajnime",
    "de": 'Kurs/Training',
    "fr": "Cours/Training",
    "it": 'Corso/Training'
}
aboutMeTitle = {
    "en": 'About me',
    "sq": "Rreth meje",
    "de": 'Über mich',
    "fr": "À mon sujet",
    "it": 'Su di me'
}
otherInfoTitle = {
    "en": 'Other Information',
    "sq": "Informacion tjetër",
    "de": 'Sonstige Informationen',
    "fr": "Autres informations",
    "it": 'Altre informazioni'
}
skilllevel = [
    {
        "en": 'Good Level',
        "sq": "Nivel i mirë",
        "de": 'Gutes Niveau',
        "fr": "Bon niveau",
        "it": 'Buon livello'
    },
    {
        "en": 'Intermediate',
        "sq": "Mesatar",
        "de": 'Mittelstufe',
        "fr": "Intermédiaire",
        "it": 'Intermedio'
    },
    {
        "en": 'Basic level',
        "sq": "Nivel bazë",
        "de": 'Grundstufe',
        "fr": "Niveau de base",
        "it": 'Livello base'
    }
]

toolsTech = {
    "en": 'Tools & Technologies',
    "de": 'Werkzeuge und Technologien',
    "fr": "Outils et technologies",
    "it": 'Strumenti e tecnologie',
    "sq": 'Vegla dhe Teknologji'
}

industrySkills = {
    "en": 'Industry Knowledge',
    "de": 'Branchenkenntnisse',
    "fr": "Connaissance de l'industrie",
    "it": 'Conoscenza del settore',
    "sq": 'Njohuritë e industrisë'
}

interpersonalSkills = {
    "en": 'Interpersonal Skills',
    "de": 'Zwischenmenschliche Fähigkeiten',
    "fr": "Compétences interpersonnelles",
    "it": 'Competenze interpersonali'
}

def getnameURI(uri):
    index = 0
    length = len(uri)
    for i in range(length):
        if uri[i] == '#':
            index = i
    return uri[index + 1:length]


def doesURIContainWord(uri, word):
    txt = getnameURI(uri)
    if txt.find(word) >= 0:
        return True
    else:
        return False

def getValueFromLang(arrayObj, lang):
    length = len(arrayObj)
    for i in range(length):
        if arrayObj[i]["@language"] == lang:
            return arrayObj[i]["@value"]
    return ''
