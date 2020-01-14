from SPARQLWrapper import SPARQLWrapper, JSON

def processNameSpacesTo_(name):
	return name.replace(" ", "_")

def runQueryDBPEDIA(objectName, lang):
    sparql = SPARQLWrapper("http://dbpedia.org/sparql",returnFormat=JSON)
    sparql.setQuery("""
    SELECT ?d WHERE {
	?country rdfs:label \"""" + objectName  + """\"@""" + lang + """.
	?country foaf:isPrimaryTopicOf ?d.}""")
    sparql.setReturnFormat(JSON)
    results = sparql.query().convert()
    results = results["results"]["bindings"]
    text = ''
    if(len(results)>=1):
        text = results[0]['d']['value']
    return text

def runQueryMainOntology(objectName, lang):
    sparql = SPARQLWrapper("http://localhost:3030/resume/sparql",returnFormat=JSON)
    sparql.setQuery("""
	PREFIX owl: <http://www.w3.org/2002/07/owl#>
	PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
	PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
	PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
	PREFIX foaf: <http://xmlns.com/foaf/0.1/>
	PREFIX dc: <http://purl.org/dc/elements/1.1/>
	prefix country: <http://www.bpiresearch.com/BPMO/2004/03/03/cdl/Countries#>
	PREFIX my0: <http://example.com/rdf2resume_ontology.rdf#>
	PREFIX mybase0: <http://example.com/rdf2resume_base_ontology.rdf#>
	SELECT  ?o WHERE {
	<""" + objectName + """> rdfs:label ?o.
	FILTER(lang(?o) = \"""" + lang + """\")
	}
	""")
    sparql.setReturnFormat(JSON)
    results = sparql.query().convert()
    results = results["results"]["bindings"]
    text = ''
    if(len(results)>=1):
        text = results[0]['o']['value']
    return text

def runQueryCountryMainOntology(objectName, lang):
    sparql = SPARQLWrapper("http://localhost:3030/resume/sparql",returnFormat=JSON)
    sparql.setQuery("""
	PREFIX owl: <http://www.w3.org/2002/07/owl#>
	PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
	PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
	PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
	PREFIX foaf: <http://xmlns.com/foaf/0.1/>
	PREFIX dc: <http://purl.org/dc/elements/1.1/>
	prefix country: <http://www.bpiresearch.com/BPMO/2004/03/03/cdl/Countries#>
	PREFIX my0: <http://example.com/rdf2resume_ontology.rdf#>
	PREFIX mybase0: <http://example.com/rdf2resume_base_ontology.rdf#>
	SELECT  ?o WHERE {
	<""" + objectName + """> country:nameEnglish ?o.
	FILTER(lang(?o) = \"""" + lang + """\")
	}
	""")
    sparql.setReturnFormat(JSON)
    results = sparql.query().convert()
    results = results["results"]["bindings"]
    text = ''
    if(len(results)>=1):
        text = results[0]['o']['value']
    return text