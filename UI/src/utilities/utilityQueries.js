/*******************************************************************************************************************/
/*******************************************************************************************************************/
/********************************* QUERIES FOR DROPDOWNS VALUES ****************************************************/
/*******************************************************************************************************************/
/*******************************************************************************************************************/

const prefixes = "prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#>\n prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>\n prefix xsd: <https://www.w3.org/2001/XMLSchema#>\n prefix owl: <http://www.w3.org/2002/07/owl#>\n prefix ns0: <http://protege.stanford.edu/system#>\n prefix country: <http://www.bpiresearch.com/BPMO/2004/03/03/cdl/Countries#>\n prefix dc: <http://purl.org/dc/terms/>\n prefix dbo: <http://dbpedia.org/resource/classes#>\n prefix esco: <http://data.europa.eu/esco/model>\n  prefix my0: <http://example.com/resume2rdf_ontology.rdf#>\n prefix myvalue0: <http://example.com/resume2rdf_value_ontology.rdf#>\n ";

export const fetchMainProperties = (object) => {
  return prefixes + 'SELECT DISTINCT\n?object ?enlabel ?delabel ?itlabel ?sqlabel ?frlabel\nWHERE {\n?object rdfs:domain ' + object + '.\n ?object rdfs:label ?enlabel, ?delabel, ?itlabel, ?frlabel, ?sqlabel.\nFILTER(lang(?enlabel) = "en")\nFILTER(lang(?delabel) = "de")\nFILTER(lang(?itlabel) = "it")\nFILTER(lang(?frlabel) = "fr")\nFILTER(lang(?sqlabel) = "sq")}'
};

export const retrieveMainProperties = object => {
  let objectNames = [];
  object.map(obj => {
    objectNames.push( { 
      "@type": obj.object.value,
      "en": obj.enlabel.value,
      "de": obj.delabel.value,
      "it": obj.itlabel.value,
      "fr": obj.frlabel.value,
      "sq": obj.sqlabel.value
     });
    return "";
  });
  return objectNames;
};

export const fetchMainPropertiesLanguage = () => {
  return prefixes + 'SELECT DISTINCT\n?object ?enlabel ?delabel ?itlabel ?sqlabel ?frlabel\nWHERE {\n?object rdfs:domain  my0:LanguageSkill.\n ?object rdfs:label ?enlabel, ?delabel, ?itlabel, ?frlabel, ?sqlabel.\nFILTER(lang(?enlabel) = "en")\nFILTER(lang(?delabel) = "de")\nFILTER(lang(?itlabel) = "it")\nFILTER(lang(?sqlabel) = "sq")\nFILTER(lang(?frlabel) = "fr")'
};

export const retrieveMainPropertiesLanguage = object => {
  let objectNames = [];
  object.map(obj => {
    objectNames.push( { 
      "@type": obj.object.value,
      "en": obj.enlabel.value,
      "de": obj.delabel.value,
      "it": obj.itlabel.value,
      "fr": obj.frlabel.value,
      "sq": obj.sqlabel.value
     });
    return "";
  });
  return objectNames;
};

export const fetchAllCountries = () => {
  return prefixes + 'SELECT DISTINCT\n?isoCountry\n?objectURI\n?enlabel ?sqlabel ?delabel ?itlabel ?frlabel\nWHERE {\n?isoCountry a country:ISO3166DefinedCountry;\n country:referencesCountry ?objectURI.\n?objectURI country:nameEnglish ?enlabel, ?delabel, ?itlabel, ?sqlabel, ?frlabel.\n FILTER(lang(?enlabel)= "en") \n FILTER(lang(?delabel)= "de") \n FILTER(lang(?sqlabel) = "sq") \n FILTER(lang(?itlabel)= "it") \n FILTER(lang(?frlabel)= "fr") \n}'
};

export const retrieveCountryValues = countriesObject => {
  let countryNames = [];
  countriesObject.map(obj => {
    countryNames.push( { 
      "@type": obj.objectURI.value,
      "en": obj.enlabel.value,
      "de": obj.delabel.value,
      "it": obj.itlabel.value,
      "fr": obj.frlabel.value,
      "sq": obj.sqlabel.value
     });
    return "";
  });
  return countryNames;
};

export const fetchBaseProperties = (object) => {
  return prefixes + 'SELECT DISTINCT\n?object ?enlabel ?delabel ?itlabel ?sqlabel ?frlabel\nWHERE {\n?object a ' + object + '.\n ?object rdfs:label ?enlabel, ?delabel, ?sqlabel, ?itlabel, ?frlabel.\nFILTER(lang(?enlabel) = "en")\nFILTER(lang(?delabel) = "de")\nFILTER(lang(?sqlabel) = "sq")\nFILTER(lang(?itlabel) = "it")\nFILTER(lang(?frlabel) = "fr")}'
};

export const retrieveBaseProperties = object => {
  let objectNames = [];
  object.map(obj => {
    objectNames.push( { 
      "@type": obj.object.value,
      "en": obj.enlabel.value,
      "de": obj.delabel.value,
      "it": obj.itlabel.value,
      "fr": obj.frlabel.value,
      "sq": obj.sqlabel.value
     });
    return "";
  });
  return objectNames;
};