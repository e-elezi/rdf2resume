/*******************************************************************************************************************/
/*******************************************************************************************************************/
/********************************* QUERIES FOR CV ******************************************************************/
/*******************************************************************************************************************/
/*******************************************************************************************************************/

export const fetchCVQuery = (firstName, lastName) => {
  return (
    'prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#>\n prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>\n prefix xsd: <https://www.w3.org/2001/XMLSchema#>\n prefix owl: <http://www.w3.org/2002/07/owl#>\n prefix ns0: <http://protege.stanford.edu/system#>\n prefix country: <http://www.bpiresearch.com/BPMO/2004/03/03/cdl/Countries#>\n prefix dc: <http://purl.org/dc/terms/>\n prefix dbo: <http://dbpedia.org/resource/classes#>\n prefix esco: <http://data.europa.eu/esco/model>\n  prefix my0: <http://example.com/rdf2resume_ontology.rdf#>\n prefix mybase0: <http://example.com/rdf2resume_base_ontology.rdf#>\n SELECT DISTINCT\n ?cv\n  WHERE {\n ?cv a my0:CV;\n my0:aboutPerson ?person.\n ?person my0:firstName "' +
    firstName +
    '";\n my0:lastName "' +
    lastName +
    '".\n }'
  );
};

export const fetchAboutCV = cvURI => {
  return (
    "prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#>\n prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>\n prefix xsd: <https://www.w3.org/2001/XMLSchema#>\n prefix owl: <http://www.w3.org/2002/07/owl#>\n prefix ns0: <http://protege.stanford.edu/system#>\n prefix country: <http://www.bpiresearch.com/BPMO/2004/03/03/cdl/Countries#>\n prefix dc: <http://purl.org/dc/terms/>\n prefix dbo: <http://dbpedia.org/resource/classes#>\n prefix esco: <http://data.europa.eu/esco/model>\n  prefix my0: <http://example.com/rdf2resume_ontology.rdf#>\n prefix mybase0: <http://example.com/rdf2resume_base_ontology.rdf#>\n SELECT DISTINCT\n ?cvTitle\n?cvNotes\n?cvCopyright\n?cvIsConfidential\n?cvIsActive\nWHERE {\n OPTIONAL { <" +
    cvURI +
    "> my0:cvTitle ?cvTitle}\n OPTIONAL { <" +
    cvURI +
    "> my0:cvNotes ?cvNotes}\n OPTIONAL { <" +
    cvURI +
    "> my0:cvCopyright ?cvCopyright}\n OPTIONAL { <" +
    cvURI +
    "> my0:cvIsConfidential ?cvIsConfidential}\n OPTIONAL { <" +
    cvURI +
    "> my0:cvIsActive ?cvIsActive}\n}"
  );
};

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
