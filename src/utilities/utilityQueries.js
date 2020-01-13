/*******************************************************************************************************************/
/*******************************************************************************************************************/
/********************************* QUERIES FOR DROPDOWNS VALUES ****************************************************/
/*******************************************************************************************************************/
/*******************************************************************************************************************/

const prefixes = "prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#>\n prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>\n prefix xsd: <https://www.w3.org/2001/XMLSchema#>\n prefix owl: <http://www.w3.org/2002/07/owl#>\n prefix ns0: <http://protege.stanford.edu/system#>\n prefix country: <http://www.bpiresearch.com/BPMO/2004/03/03/cdl/Countries#>\n prefix dc: <http://purl.org/dc/terms/>\n prefix dbo: <http://dbpedia.org/resource/classes#>\n prefix esco: <http://data.europa.eu/esco/model>\n  prefix my0: <http://example.com/rdf2resume_ontology.rdf#>\n prefix myvalue0: <http://example.com/rdf2resume_value_ontology.rdf#>\n ";

export const fetchMainProperties = (object) => {
  return prefixes + 'SELECT DISTINCT\n?object ?enlabel ?delabel ?itlabel ?frlabel\nWHERE {\n?object rdfs:domain ' + object + '.\n ?object rdfs:label ?enlabel, ?delabel, ?itlabel, ?frlabel.\nFILTER(lang(?enlabel) = "en")\nFILTER(lang(?delabel) = "de")\nFILTER(lang(?itlabel) = "it")\nFILTER(lang(?frlabel) = "fr")}'
};

export const retrieveMainProperties = object => {
  let objectNames = [];
  object.map(obj => {
    objectNames.push( { 
      "@type": obj.object.value,
      "en": obj.enlabel.value,
      "de": obj.delabel.value,
      "it": obj.itlabel.value,
      "fr": obj.frlabel.value
     });
    return "";
  });
  return objectNames;
};

export const fetchMainPropertiesLanguage = () => {
  return prefixes + 'SELECT DISTINCT\n?object ?enlabel ?delabel ?itlabel ?frlabel\nWHERE {\n?object rdfs:domain  my0:LanguageSkill.\n ?object rdfs:label ?enlabel, ?delabel, ?itlabel, ?frlabel.\nFILTER(lang(?enlabel) = "en")\nFILTER(lang(?delabel) = "de")\nFILTER(lang(?itlabel) = "it")\nFILTER(lang(?frlabel) = "fr")'
};

export const retrieveMainPropertiesLanguage = object => {
  let objectNames = [];
  object.map(obj => {
    objectNames.push( { 
      "@type": obj.object.value,
      "en": obj.enlabel.value,
      "de": obj.delabel.value,
      "it": obj.itlabel.value,
      "fr": obj.frlabel.value
     });
    return "";
  });
  return objectNames;
};

export const fetchAllCountries = () => {
  return prefixes + 'SELECT DISTINCT\n?isoCountry\n?objectURI\n?enlabel ?delabel ?itlabel ?frlabel\nWHERE {\n?isoCountry a country:ISO3166DefinedCountry;\n country:referencesCountry ?objectURI.\n?objectURI country:nameEnglish ?enlabel, ?delabel, ?itlabel, ?frlabel.\n FILTER(lang(?enlabel)= "en") \n FILTER(lang(?delabel)= "de") \n FILTER(lang(?itlabel)= "it") \n FILTER(lang(?frlabel)= "fr") \n}'
};

export const retrieveCountryValues = countriesObject => {
  let countryNames = [];
  countriesObject.map(obj => {
    countryNames.push( { 
      "@type": obj.objectURI.value,
      "en": obj.enlabel.value,
      "de": obj.delabel.value,
      "it": obj.itlabel.value,
      "fr": obj.frlabel.value
     });
    return "";
  });
  return countryNames;
};

export const fetchBaseProperties = (object) => {
  return prefixes + 'SELECT DISTINCT\n?object ?enlabel ?delabel ?itlabel ?frlabel\nWHERE {\n?object a ' + object + '.\n ?object rdfs:label ?enlabel, ?delabel, ?itlabel, ?frlabel.\nFILTER(lang(?enlabel) = "en")\nFILTER(lang(?delabel) = "de")\nFILTER(lang(?itlabel) = "it")\nFILTER(lang(?frlabel) = "fr")}'
};

export const retrieveBaseProperties = object => {
  let objectNames = [];
  object.map(obj => {
    objectNames.push( { 
      "@type": obj.object.value,
      "en": obj.enlabel.value,
      "de": obj.delabel.value,
      "it": obj.itlabel.value,
      "fr": obj.frlabel.value
     });
    return "";
  });
  return objectNames;
};

// export const fetchAllRegions = () => {
//   return prefixes + 'SELECT DISTINCT\n?objectURI\n?enlabel ?delabel ?itlabel ?frlabel\nWHERE {\n?objectURI a mybase0:RegionProperty;\nrdfs:label ?enlabel ?delabel ?itlabel ?frlabel.\n FILTER(lang(?enlabel)= "en") \n FILTER(lang(?delabel)= "de") \n FILTER(lang(?itlabel)= "it") \n FILTER(lang(?frlabel)= "fr") \n}'
// };

// export const retrieveRegionsValues = objt => {
//   let objtNames = [];
//   objt.map(obj => {
//     objtNames.push({ 
//       "@type": obj.objectURI.value, 
//       "en": obj.enlabel.value,
//       "de": obj.delabel.value,
//       "it": obj.itlabel.value,
//       "fr": obj.frlabel.value
//     })
//     return "";
//   });
//   return objtNames;
// };

// export const fetchAllGenders = () => {
//   return prefixes + 'SELECT DISTINCT\n?objectURI\n?enlabel ?delabel ?itlabel ?frlabel\nWHERE {\n?objectURI a mybase0:GenderProperty;\nrdfs:label ?enlabel ?delabel ?itlabel ?frlabel.\n FILTER(lang(?enlabel)= "en") \n FILTER(lang(?delabel)= "de") \n FILTER(lang(?itlabel)= "it") \n FILTER(lang(?frlabel)= "fr") \n}'
// };

// export const retrieveGenderValues = gendersObject => {
//   let genderNames = [];
//   gendersObject.map(obj => {
//     genderNames.push({ 
//       "@type": obj.objectURI.value, 
//       "en": obj.enlabel.value,
//       "de": obj.delabel.value,
//       "it": obj.itlabel.value,
//       "fr": obj.frlabel.value
//     })
//     return "";
//   });
//   return genderNames;
// };

// export const fetchAllPatentStatuses = () => {
//   return prefixes + 'SELECT DISTINCT\n?objectURI\n?enlabel ?delabel ?itlabel ?frlabel\nWHERE {\n?objectURI a mybase0:StatusProperty;\nrdfs:label ?enlabel ?delabel ?itlabel ?frlabel.\n FILTER(lang(?enlabel)= "en") \n FILTER(lang(?delabel)= "de") \n FILTER(lang(?itlabel)= "it") \n FILTER(lang(?frlabel)= "fr") \n}'
// };

// export const retrievePatentStatusValues = patentsObject => {
//   let patentNames = [];
//   patentsObject.map(obj => {
//     patentNames.push({ 
//       "@type": obj.objectURI.value, 
//       "en": obj.enlabel.value,
//       "de": obj.delabel.value,
//       "it": obj.itlabel.value,
//       "fr": obj.frlabel.value
//     })
//     return "";
//   });
//   return patentNames;
// };

// export const fetchAllIMTypes = () => {
//   return prefixes + 'SELECT DISTINCT\n?objectURI\n?enlabel ?delabel ?itlabel ?frlabel\nWHERE {\n?objectURI a mybase0:InstantMessagingTypeProperty;\nrdfs:label ?enlabel ?delabel ?itlabel ?frlabel.\n FILTER(lang(?enlabel)= "en") \n FILTER(lang(?delabel)= "de") \n FILTER(lang(?itlabel)= "it") \n FILTER(lang(?frlabel)= "fr") \n}'
// };

// export const retrieveIMValues = IMObject => {
//   let IMNames = [];
//   IMObject.map(obj => {
//     IMNames.push({ 
//       "@type": obj.objectURI.value, 
//       "en": obj.enlabel.value,
//       "de": obj.delabel.value,
//       "it": obj.itlabel.value,
//       "fr": obj.frlabel.value
//     })
//     return "";
//   });
//   return IMNames;
// };

// export const fetchAllWebsiteTypes = () => {
//   return prefixes + 'SELECT DISTINCT\n?objectURI\n?enlabel ?delabel ?itlabel ?frlabel\nWHERE {\n?objectURI a mybase0:WebsiteTypeProperty;\nrdfs:label ?enlabel ?delabel ?itlabel ?frlabel.\n FILTER(lang(?enlabel)= "en") \n FILTER(lang(?delabel)= "de") \n FILTER(lang(?itlabel)= "it") \n FILTER(lang(?frlabel)= "fr") \n}'
// };

// export const retrieveWebsiteValues = WebsiteObject => {
//   let WebsiteNames = [];
//   WebsiteObject.map(obj => {
//     WebsiteNames.push({ 
//       "@type": obj.objectURI.value, 
//       "en": obj.enlabel.value,
//       "de": obj.delabel.value,
//       "it": obj.itlabel.value,
//       "fr": obj.frlabel.value
//     })
//     return "";
//   });
//   return WebsiteNames;
// };

// export const fetchAllLanguageSkillsProficiencies = () => {
//   return prefixes + 'SELECT DISTINCT\n?objectURI\n?enlabel ?delabel ?itlabel ?frlabel\n?comment\nWHERE {\n?objectURI a mybase0:LanguageSkillProficiencyProperty  ;\nrdfs:label ?enlabel ?delabel ?itlabel ?frlabel;\nrdfs:comment ?comment. \n FILTER(lang(?enlabel)= "en") \n FILTER(lang(?delabel)= "de") \n FILTER(lang(?itlabel)= "it") \n FILTER(lang(?frlabel)= "fr") \n}'
// };

// export const retrieveLngAssessment = lngAssessmentObj => {
//   let lngAssessmentValues = [];
//   lngAssessmentObj.map(obj => {
//     lngAssessmentValues.push({ 
//       "@type": obj.objectURI.value, 
//       "en": obj.enlabel.value,
//       "de": obj.delabel.value,
//       "it": obj.itlabel.value,
//       "fr": obj.frlabel.value 
//     })
//     return "";
//   });
//   return lngAssessmentValues;
// };

// export const fetchAllTitleProperties = () => {
//   return prefixes + 'SELECT DISTINCT\n?objectURI\n?enlabel ?delabel ?itlabel ?frlabel\nWHERE {\n?objectURI a mybase0:TitleProperty  ;\nrdfs:label ?enlabel ?delabel ?itlabel ?frlabel.\n FILTER(lang(?enlabel)= "en") \n FILTER(lang(?delabel)= "de") \n FILTER(lang(?itlabel)= "it") \n FILTER(lang(?frlabel)= "fr") \n}'
// };

// export const retrieveTitleValues = titlesObject => {
//   let titleNames = [];
//   titlesObject.map(obj => {
//     titleNames.push({ 
//       "@type": obj.objectURI.value, 
//       "en": obj.enlabel.value,
//       "de": obj.delabel.value,
//       "it": obj.itlabel.value,
//       "fr": obj.frlabel.value 
//     });
//     return "";
//   });
//   return titleNames;
// };

// export const fetchAllCompanySizes = () => {
//   return prefixes + 'SELECT DISTINCT\n?objectURI\n?enlabel ?delabel ?itlabel ?frlabel\nWHERE {\n?objectURI a mybase0:CompanySize  ;\nrdfs:label ?enlabel ?delabel ?itlabel ?frlabel.\n FILTER(lang(?enlabel)= "en") \n FILTER(lang(?delabel)= "de") \n FILTER(lang(?itlabel)= "it") \n FILTER(lang(?frlabel)= "fr") \n}'
// };


// export const retrieveCompanySizes = companySizesObj => {
//   let companySizesValue = [];
//   companySizesObj.map(obj => {
//     companySizesValue.push({ 
//       "@type": obj.objectURI.value, 
//       "en": obj.enlabel.value,
//       "de": obj.delabel.value,
//       "it": obj.itlabel.value,
//       "fr": obj.frlabel.value 
//     });
//     return "";
//   });
//   return companySizesValue;
// };

// export const fetchAllCVJobModes = () => {
//   return prefixes + 'SELECT DISTINCT\n?objectURI\n?enlabel ?delabel ?itlabel ?frlabel\n WHERE {\n?objectURI a mybase0:CVJobMode;\nrdfs:label ?enlabel ?delabel ?itlabel ?frlabel.\n FILTER(lang(?enlabel)= "en") \n FILTER(lang(?delabel)= "de") \n FILTER(lang(?itlabel)= "it") \n FILTER(lang(?frlabel)= "fr") \n}'
// };

// export const retrieveJobModes = modesObject => {
//   let jobModeValues = [];
//   modesObject.map(obj => {
//     jobModeValues.push({ 
//       "@type": obj.objectURI.value, 
//       "en": obj.enlabel.value,
//       "de": obj.delabel.value,
//       "it": obj.itlabel.value,
//       "fr": obj.frlabel.value 
//     });
//     return "";
//   });
//   return jobModeValues;
// };

// export const fetchAllCVCareerLevels = () => {
//   return prefixes + 'SELECT DISTINCT\n?objectURI\n?enlabel ?delabel ?itlabel ?frlabel\nWHERE {\n?objectURI a mybase0:CVCareerLevel  ;\nrdfs:label ?enlabel ?delabel ?itlabel ?frlabel.\n FILTER(lang(?enlabel)= "en") \n FILTER(lang(?delabel)= "de") \n FILTER(lang(?itlabel)= "it") \n FILTER(lang(?frlabel)= "fr") \n}'
// };

// export const retrieveCareerLevels = careerLevelsObject => {
//   let careerValues = [];
//   careerLevelsObject.map(obj => {
//     careerValues.push({ 
//       "@type": obj.objectURI.value, 
//       "en": obj.enlabel.value,
//       "de": obj.delabel.value,
//       "it": obj.itlabel.value,
//       "fr": obj.frlabel.value 
//     });
//     return "";
//   });
//   return careerValues;
// };

// export const fetchAllEduDegrees = () => {
//   return prefixes + 'SELECT DISTINCT\n?objectURI\n?enlabel ?delabel ?itlabel ?frlabel\nWHERE {\n?objectURI a mybase0:EduDegree  ;\nrdfs:label ?enlabel ?delabel ?itlabel ?frlabel.\n FILTER(lang(?enlabel)= "en") \n FILTER(lang(?delabel)= "de") \n FILTER(lang(?itlabel)= "it") \n FILTER(lang(?frlabel)= "fr") \n}'
// };

// export const retrieveDegreeValues = DegreesObj => {
//   let degreesValues = [];
//   DegreesObj.map(obj => {
//     degreesValues.push({ 
//       "@type": obj.objectURI.value, 
//       "en": obj.enlabel.value,
//       "de": obj.delabel.value,
//       "it": obj.itlabel.value,
//       "fr": obj.frlabel.value 
//     })
//     return "";
//   });
//   return degreesValues;
// };

// export const fetchAllOtherCVInfoTypes = () => {
//   return prefixes + 'SELECT DISTINCT\n?objectURI\n?enlabel ?delabel ?itlabel ?frlabel\nWHERE {\n?objectURI a mybase0:OtherCVInfoType  ;\n rdfs:label ?enlabel ?delabel ?itlabel ?frlabel.\n FILTER(lang(?enlabel)= "en") \n FILTER(lang(?delabel)= "de") \n FILTER(lang(?itlabel)= "it") \n FILTER(lang(?frlabel)= "fr") \n}'
// };

// export const retrieveOtherTypes = OthersObjs => {
//   let typesNames = [];
//   OthersObjs.map(obj => {
//     typesNames.push({ 
//       "@type": obj.objectURI.value, 
//       "en": obj.enlabel.value,
//       "de": obj.delabel.value,
//       "it": obj.itlabel.value,
//       "fr": obj.frlabel.value 
//     });
//     return "";
//   });
//   return typesNames;
// };

// export const fetchAllIndustryTypes = () => {
//   return prefixes + 'SELECT DISTINCT\n?objectURI\n?enlabel ?delabel ?itlabel ?frlabel\nWHERE {\n?objectURI a mybase0:IndustryType  ;\n rdfs:label ?enlabel ?delabel ?itlabel ?frlabel.\n FILTER(lang(?enlabel)= "en") \n FILTER(lang(?delabel)= "de") \n FILTER(lang(?itlabel)= "it") \n FILTER(lang(?frlabel)= "fr") \n}'
// };

// export const retrieveIndustryTypes = IndustryObjs => {
//   let IndustryNames = [];
//   IndustryObjs.map(obj => {
//     IndustryNames.push({ 
//       "@type": obj.objectURI.value, 
//       "en": obj.enlabel.value,
//       "de": obj.delabel.value,
//       "it": obj.itlabel.value,
//       "fr": obj.frlabel.value 
//     });
//     return "";
//   });
//   return IndustryNames;
// };

