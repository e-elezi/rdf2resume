/*******************************************************************************************************************/
/*******************************************************************************************************************/
/********************************* QUERIES FOR DROPDOWNS VALUES ****************************************************/
/*******************************************************************************************************************/
/*******************************************************************************************************************/

const prefixes = "prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#>\n prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>\n prefix xsd: <https://www.w3.org/2001/XMLSchema#>\n prefix owl: <http://www.w3.org/2002/07/owl#>\n prefix ns0: <http://protege.stanford.edu/system#>\n prefix country: <http://www.bpiresearch.com/BPMO/2004/03/03/cdl/Countries#>\n prefix dc: <http://purl.org/dc/terms/>\n prefix dbo: <http://dbpedia.org/resource/classes#>\n prefix esco: <http://data.europa.eu/esco/model>\n  prefix my0: <http://example.com/rdf2resume_ontology.rdf#>\n prefix mybase0: <http://example.com/rdf2resume_base_ontology.rdf#>\n ";

export const fetchAllCountries = () => {
  return prefixes + "SELECT DISTINCT\n?isoCountry\n?objectURI\n?label\nWHERE {\n?isoCountry a country:ISO3166DefinedCountry;\n country:referencesCountry ?objectURI.\n?objectURI country:nameEnglish ?label.\n}";
};

export const fetchAllGenders = () => {
  return prefixes + "SELECT DISTINCT\n?objectURI\n?label\nWHERE {\n?objectURI a mybase0:SexProperty;\nrdfs:label ?label.\n}";
};

export const fetchAllSelfAssessmentProperties = () => {
  return prefixes + "SELECT DISTINCT\n?objectURI\n?label\n?comment\nWHERE {\n ?objectURI a mybase0:SelfAssessmentProperty  ;\n rdfs:label ?label;\n rdfs:comment ?comment\n }";
};

export const fetchAllLanguageSkillSelfAssessmentProperties = () => {
  return prefixes + "SELECT DISTINCT\n?objectURI\n?label\n?comment\nWHERE {\n?objectURI a mybase0:LanguageSkillSelfAssessmentProperty  ;\nrdfs:label ?label;\nrdfs:comment ?comment\n}";
};

export const fetchAllTitleProperties = () => {
  return prefixes + "SELECT DISTINCT\n?objectURI\n?label\nWHERE {\n?objectURI a mybase0:TitleProperty  ;\nrdfs:label ?label.\n}";
};

export const fetchAllCompanySizes = () => {
  return prefixes + "SELECT DISTINCT\n?objectURI\n?label\nWHERE {\n?objectURI a mybase0:CompanySize  ;\nrdfs:label ?label.\n}";
};

export const fetchAllCVJobModes = () => {
  return prefixes + "SELECT DISTINCT\n?objectURI\n?label\n WHERE {\n?objectURI a mybase0:CVJobMode;\nrdfs:label ?label.\n}";
};

export const fetchAllCVCareerLevels = () => {
  return prefixes + "SELECT DISTINCT\n?objectURI\n?label\nWHERE {\n?objectURI a mybase0:CVCareerLevel  ;\nrdfs:label ?label.\n}";
};

export const fetchAllEduDegrees = () => {
  return prefixes + "SELECT DISTINCT\n?objectURI\n?label\nWHERE {\n?objectURI a mybase0:EduDegree  ;\nrdfs:label ?label.\n}";
};

export const fetchAllOtherCVInfoTypes = () => {
  return prefixes + "SELECT DISTINCT\n?objectURI\n?label\nWHERE {\n?objectURI a mybase0:OtherCVInfoType  ;\n rdfs:label ?label.\n}";
};

export const retrieveCountryValues = countriesObject => {
  let countryNames = [];
  countriesObject.map(obj => {
    countryNames.push( { "@type": obj.objectURI.value, value: obj.label.value });
    //countryNames.push( obj.label.value);
    return "";
  });
  return countryNames;
};

export const retrieveGenderValues = gendersObject => {
  let genderNames = [];
  gendersObject.map(obj => {
    genderNames.push({ "@type": obj.objectURI.value, value: obj.label.value })
    return "";
  });
  return genderNames;
};

export const retrieveTitleValues = titlesObject => {
  let titleNames = [];
  titlesObject.map(obj => {
    titleNames.push({ "@type": obj.objectURI.value, value: obj.label.value });
    return "";
  });
  return titleNames;
};

export const retrieveJobModes = modesObject => {
  let jobModeValues = [];
  modesObject.map(obj => {
    jobModeValues.push({ "@type": obj.objectURI.value, value: obj.label.value });
    return "";
  });
  return jobModeValues;
};

export const retrieveCareerLevels = careerLevelsObject => {
  let careerValues = [];
  careerLevelsObject.map(obj => {
    careerValues.push({ "@type": obj.objectURI.value, value: obj.label.value });
    return "";
  });
  return careerValues;
};

export const retrieveCompanySizes = companySizesObj => {
  let companySizesValue = [];
  companySizesObj.map(obj => {
    companySizesValue.push({ "@type": obj.objectURI.value, value: obj.label.value });
    return "";
  });
  return companySizesValue;
};

export const retrieveLngAssessment = lngAssessmentObj => {
  let lngAssessmentValues = [];
  lngAssessmentObj.map(obj => {
    lngAssessmentValues.push({ "@type": obj.objectURI.value, value: obj.label.value })
    return "";
  });
  return lngAssessmentValues;
};

export const retrieveAssessment = AssessmentObj => {
  let assessmentValues = [];
  AssessmentObj.map(obj => {
    assessmentValues.push({ "@type": obj.objectURI.value, value: obj.label.value })
    return "";
  });
  return assessmentValues;
};

export const retrieveDegreeValues = DegreesObj => {
  let degreesValues = [];
  DegreesObj.map(obj => {
    degreesValues.push({ "@type": obj.objectURI.value, value: obj.label.value })
    return "";
  });
  return degreesValues;
};

export const retrieveOtherTypes = OthersObjs => {
  let typesNames = [];
  OthersObjs.map(obj => {
    typesNames.push({ "@type": obj.objectURI.value, value: obj.label.value });
    return "";
  });
  return typesNames;
};