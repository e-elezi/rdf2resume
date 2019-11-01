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
projectTitle = {
    "en": "Project",
    "fr": "Le projet",
    "de": "Projekt",
    "it": "Il progetto"
}
publicationTitle = {
    "en": "Publication",
    "fr": "Publication",
    "de": "Veröffentlichung",
    "it": "Pubblicazione"
}
current = {
    "en": "Now",
    "it": "Ora",
    "fr": "À présent",
    "de": "Jetzt"
}
pending = {
    "en": "Pending",
    "it": "Pendenti",
    "fr": "En attendant",
    "de": "Ausstehend"
}
patentTitle = {
    "en": "Patent",
    "fr": "Brevet",
    "de": "Patent",
    "it": "Brevetto"
}
languageTitle = {
    "en": 'Language Skills',
    "de": 'Sprachkenntnisse',
    "fr": "Compétences linguistiques",
    "it": 'Competenze linguistiche'
}
otherSkillTitle = {
    "en": 'Other Skills',
    "de": 'Andere Fähigkeiten',
    "fr": "Autres compétences",
    "it": 'Altre competenze'
}
otherTitle = {
    "en": 'Other',
    "de": 'Andere',
    "fr": "Autres",
    "it": 'Altre'
}
skillTitle = {
    "en": 'Skills',
    "de": 'Fähigkeiten',
    "fr": "Compétences",
    "it": 'Competenze'
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
        if(uri[i] == '/' or uri[i] == '#'):
            index = i
    return uri[index:length]

def doesURIContainWord(uri, word):
    txt = getnameURI(uri)
    if txt.find(word) >= 0:
        return True
    else:
        return False