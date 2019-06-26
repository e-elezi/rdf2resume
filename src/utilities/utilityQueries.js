/*******************************************************************************************************************/
/*******************************************************************************************************************/
/********************************* QUERIES FOR DROPDOWNS VALUES ****************************************************/
/*******************************************************************************************************************/
/*******************************************************************************************************************/

export const fetchAllCountries = () => {
  return "prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#>\n prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>\n prefix xsd: <https://www.w3.org/2001/XMLSchema#>\n prefix owl: <http://www.w3.org/2002/07/owl#>\n prefix ns0: <http://protege.stanford.edu/system#>\n prefix country: <http://www.bpiresearch.com/BPMO/2004/03/03/cdl/Countries#>\n prefix dc: <http://purl.org/dc/terms/>\n prefix dbo: <http://dbpedia.org/resource/classes#>\n prefix esco: <http://data.europa.eu/esco/model>\n  prefix my0: <http://example.com/rdf2resume_ontology.rdf#>\n prefix mybase0: <http://example.com/rdf2resume_base_ontology.rdf#>\n SELECT DISTINCT\n?isoCountry\n?countryObject\n?nameCountry\nWHERE {\n?isoCountry a country:ISO3166DefinedCountry;\n country:referencesCountry ?countryObject.\n?countryObject country:nameEnglish ?nameCountry.\n}";
};

export const fetchAllGenders = () => {
  return "prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#>\n prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>\n prefix xsd: <https://www.w3.org/2001/XMLSchema#>\n prefix owl: <http://www.w3.org/2002/07/owl#>\n prefix ns0: <http://protege.stanford.edu/system#>\n prefix country: <http://www.bpiresearch.com/BPMO/2004/03/03/cdl/Countries#>\n prefix dc: <http://purl.org/dc/terms/>\n prefix dbo: <http://dbpedia.org/resource/classes#>\n prefix esco: <http://data.europa.eu/esco/model>\n  prefix my0: <http://example.com/rdf2resume_ontology.rdf#>\n prefix mybase0: <http://example.com/rdf2resume_base_ontology.rdf#>\n SELECT DISTINCT\n?genderClass\n?genderLabel\nWHERE {\n?genderClass a mybase0:SexProperty;\nrdfs:label ?genderLabel.\n}";
};

export const fetchAllSelfAssessmentProperties = () => {
  return "prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#>\n prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>\n prefix xsd: <https://www.w3.org/2001/XMLSchema#>\n prefix owl: <http://www.w3.org/2002/07/owl#>\n prefix ns0: <http://protege.stanford.edu/system#>\n prefix country: <http://www.bpiresearch.com/BPMO/2004/03/03/cdl/Countries#>\n prefix dc: <http://purl.org/dc/terms/>\n prefix dbo: <http://dbpedia.org/resource/classes#>\n prefix esco: <http://data.europa.eu/esco/model>\n  prefix my0: <http://example.com/rdf2resume_ontology.rdf#>\n prefix mybase0: <http://example.com/rdf2resume_base_ontology.rdf#>\n SELECT DISTINCT\n?SelfAssessmentPropertyClass\n?SelfAssessmentPropertyLabel\n?SelfAssessmentPropertyComment\nWHERE {\n ?SelfAssessmentPropertyClass a mybase0:SelfAssessmentProperty  ;\n rdfs:label ?SelfAssessmentPropertyLabel;\n rdfs:comment ?SelfAssessmentPropertyComment\n }";
};

export const fetchAllLanguageSkillSelfAssessmentProperties = () => {
  return "prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#>\n prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>\n prefix xsd: <https://www.w3.org/2001/XMLSchema#>\n prefix owl: <http://www.w3.org/2002/07/owl#>\n prefix ns0: <http://protege.stanford.edu/system#>\n prefix country: <http://www.bpiresearch.com/BPMO/2004/03/03/cdl/Countries#>\n prefix dc: <http://purl.org/dc/terms/>\n prefix dbo: <http://dbpedia.org/resource/classes#>\n prefix esco: <http://data.europa.eu/esco/model>\n  prefix my0: <http://example.com/rdf2resume_ontology.rdf#>\n prefix mybase0: <http://example.com/rdf2resume_base_ontology.rdf#>\n SELECT DISTINCT\n?LanguageSkillSelfAssessmentPropertyClass\n?LanguageSkillSelfAssessmentPropertyLabel\n?LanguageSkillSelfAssessmentPropertyComment\nWHERE {\n?LanguageSkillSelfAssessmentPropertyClass a mybase0:LanguageSkillSelfAssessmentProperty  ;\nrdfs:label ?LanguageSkillSelfAssessmentPropertyLabel;\nrdfs:comment ?LanguageSkillSelfAssessmentPropertyComment\n}";
};

export const fetchAllTitleProperties = () => {
  return "prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#>\n prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>\n prefix xsd: <https://www.w3.org/2001/XMLSchema#>\n prefix owl: <http://www.w3.org/2002/07/owl#>\n prefix ns0: <http://protege.stanford.edu/system#>\n prefix country: <http://www.bpiresearch.com/BPMO/2004/03/03/cdl/Countries#>\n prefix dc: <http://purl.org/dc/terms/>\n prefix dbo: <http://dbpedia.org/resource/classes#>\n prefix esco: <http://data.europa.eu/esco/model>\n  prefix my0: <http://example.com/rdf2resume_ontology.rdf#>\n prefix mybase0: <http://example.com/rdf2resume_base_ontology.rdf#>\n SELECT DISTINCT\n?TitlePropertyClass\n?TitlePropertyLabel\nWHERE {\n?TitlePropertyClass a mybase0:TitleProperty  ;\nrdfs:label ?TitlePropertyLabel.\n}";
};

export const fetchAllCompanySizes = () => {
  return "prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#>\n prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>\n prefix xsd: <https://www.w3.org/2001/XMLSchema#>\n prefix owl: <http://www.w3.org/2002/07/owl#>\n prefix ns0: <http://protege.stanford.edu/system#>\n prefix country: <http://www.bpiresearch.com/BPMO/2004/03/03/cdl/Countries#>\n prefix dc: <http://purl.org/dc/terms/>\n prefix dbo: <http://dbpedia.org/resource/classes#>\n prefix esco: <http://data.europa.eu/esco/model>\n  prefix my0: <http://example.com/rdf2resume_ontology.rdf#>\n prefix mybase0: <http://example.com/rdf2resume_base_ontology.rdf#>\n SELECT DISTINCT\n?CompanySizeClass\n?CompanySizeLabel\nWHERE {\n?CompanySizeClass a mybase0:CompanySize  ;\nrdfs:label ?CompanySizeLabel.\n}";
};

export const fetchAllCVJobModes = () => {
  return "prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#>\n prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>\n prefix xsd: <https://www.w3.org/2001/XMLSchema#>\n prefix owl: <http://www.w3.org/2002/07/owl#>\n prefix ns0: <http://protege.stanford.edu/system#>\n prefix country: <http://www.bpiresearch.com/BPMO/2004/03/03/cdl/Countries#>\n prefix dc: <http://purl.org/dc/terms/>\n prefix dbo: <http://dbpedia.org/resource/classes#>\n prefix esco: <http://data.europa.eu/esco/model>\n  prefix my0: <http://example.com/rdf2resume_ontology.rdf#>\n prefix mybase0: <http://example.com/rdf2resume_base_ontology.rdf#>\n SELECT DISTINCT\n?CVJobModeClass\n?CVJobModeLabel\n WHERE {\n?CVJobModeClass a mybase0:CVJobMode;\nrdfs:label ?CVJobModeLabel.\n}";
};

export const fetchAllCVCareerLevels = () => {
  return "prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#>\n prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>\n prefix xsd: <https://www.w3.org/2001/XMLSchema#>\n prefix owl: <http://www.w3.org/2002/07/owl#>\n prefix ns0: <http://protege.stanford.edu/system#>\n prefix country: <http://www.bpiresearch.com/BPMO/2004/03/03/cdl/Countries#>\n prefix dc: <http://purl.org/dc/terms/>\n prefix dbo: <http://dbpedia.org/resource/classes#>\n prefix esco: <http://data.europa.eu/esco/model>\n  prefix my0: <http://example.com/rdf2resume_ontology.rdf#>\n prefix mybase0: <http://example.com/rdf2resume_base_ontology.rdf#>\n SELECT DISTINCT\n?CVCareerLevelClass\n?CVCareerLevelLabel\nWHERE {\n?CVCareerLevelClass a mybase0:CVCareerLevel  ;\nrdfs:label ?CVCareerLevelLabel.\n}";
};

export const fetchAllEduDegrees = () => {
  return "prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#>\n prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>\n prefix xsd: <https://www.w3.org/2001/XMLSchema#>\n prefix owl: <http://www.w3.org/2002/07/owl#>\n prefix ns0: <http://protege.stanford.edu/system#>\n prefix country: <http://www.bpiresearch.com/BPMO/2004/03/03/cdl/Countries#>\n prefix dc: <http://purl.org/dc/terms/>\n prefix dbo: <http://dbpedia.org/resource/classes#>\n prefix esco: <http://data.europa.eu/esco/model>\n  prefix my0: <http://example.com/rdf2resume_ontology.rdf#>\n prefix mybase0: <http://example.com/rdf2resume_base_ontology.rdf#>\n SELECT DISTINCT\n?EduDegreeClass\n?EduDegreeLabel\nWHERE {\n?EduDegreeClass a mybase0:EduDegree  ;\nrdfs:label ?EduDegreeLabel.\n}";
};

export const fetchAllOtherCVInfoTypes = () => {
  return "prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#>\n prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>\n prefix xsd: <https://www.w3.org/2001/XMLSchema#>\n prefix owl: <http://www.w3.org/2002/07/owl#>\n prefix ns0: <http://protege.stanford.edu/system#>\n prefix country: <http://www.bpiresearch.com/BPMO/2004/03/03/cdl/Countries#>\n prefix dc: <http://purl.org/dc/terms/>\n prefix dbo: <http://dbpedia.org/resource/classes#>\n prefix esco: <http://data.europa.eu/esco/model>\n  prefix my0: <http://example.com/rdf2resume_ontology.rdf#>\n prefix mybase0: <http://example.com/rdf2resume_base_ontology.rdf#>\n SELECT DISTINCT\n?OtherCVInfoTypeClass\n?OtherCVInfoTypeLabel\nWHERE {\n?OtherCVInfoTypeClass a mybase0:OtherCVInfoType  ;\n rdfs:label ?OtherCVInfoTypeLabel.\n}";
};

export const retrieveCountryValues = countriesObject => {
  let countryNames = [];
  countriesObject.map(obj => {
    countryNames.push(obj.nameCountry.value);
    return "";
  });
  return countryNames;
};

export const retrieveGenderValues = gendersObject => {
  let genderNames = [];
  gendersObject.map(obj => {
    genderNames.push(obj.genderLabel.value);
    return "";
  });
  return genderNames;
};

export const retrieveTitleValues = titlesObject => {
  let titleNames = [];
  titlesObject.map(obj => {
    titleNames.push(obj.TitlePropertyLabel.value);
    return "";
  });
  return titleNames;
};

export const retrieveJobModes = modesObject => {
  let jobModeValues = [];
  modesObject.map(obj => {
    jobModeValues.push(obj.CVJobModeLabel.value);
    return "";
  });
  return jobModeValues;
};

export const retrieveCareerLevels = careerLevelsObject => {
  let careerValues = [];
  careerLevelsObject.map(obj => {
    careerValues.push(obj.CVCareerLevelLabel.value);
    return "";
  });
  return careerValues;
};

export const retrieveCompanySizes = companySizesObj => {
  let companySizesValue = [];
  companySizesObj.map(obj => {
    companySizesValue.push(obj.CompanySizeLabel.value);
    return "";
  });
  return companySizesValue;
};

export const retrieveLngAssessment = lngAssessmentObj => {
  let lngAssessmentValues = [];
  lngAssessmentObj.map(obj => {
    lngAssessmentValues.push(
      obj.LanguageSkillSelfAssessmentPropertyLabel.value
    );
    return "";
  });
  return lngAssessmentValues;
};

export const retrieveAssessment = AssessmentObj => {
  let assessmentValues = [];
  AssessmentObj.map(obj => {
    assessmentValues.push(obj.SelfAssessmentPropertyLabel.value);
    return "";
  });
  return assessmentValues;
};

export const retrieveDegreeValues = DegreesObj => {
  let degreesValues = [];
  DegreesObj.map(obj => {
    degreesValues.push(obj.EduDegreeLabel.value);
    return "";
  });
  return degreesValues;
};

export const retrieveOtherTypes = OthersObjs => {
  let typesNames = [];
  OthersObjs.map(obj => {
    typesNames.push(obj.OtherCVInfoTypeLabel.value);
    return "";
  });
  return typesNames;
};