import _ from "lodash";
import {
  FETCH_CV,
  FETCH_ABOUT_CV,
  FETCH_TARGET,
  FETCH_ABOUT_PERSON,
  FETCH_COURSES,
  FETCH_EDUCATION,
  FETCH_OTHER_INFO,
  FETCH_REFERENCES,
  FETCH_SKILLS,
  FETCH_WORK_HISTORY,
  CREATE_OTHER_INFO,
  REMOVE_OTHER_INFO,
  UPDATE_OTHER_INFO,
  CREATE_IM,
  UPDATE_IM,
  REMOVE_IM,
  CREATE_HONOR,
  UPDATE_HONOR,
  REMOVE_HONOR,
  CREATE_PATENT,
  UPDATE_PATENT,
  REMOVE_PATENT,
  CREATE_PROJECT,
  UPDATE_PROJECT,
  REMOVE_PROJECT,
  CREATE_PUBLICATION,
  UPDATE_PUBLICATION,
  REMOVE_PUBLICATION,
  CREATE_WEBSITE,
  UPDATE_WEBSITE,
  REMOVE_WEBSITE,
  CREATE_REFERENCE,
  UPDATE_REFERENCE,
  REMOVE_REFERENCE,
  CREATE_WORK_HISTORY,
  UPDATE_WORK_HISTORY,
  REMOVE_WORK_HISTORY,
  CREATE_EDUCATION,
  UPDATE_EDUCATION,
  REMOVE_EDUCATION,
  CREATE_COURSE,
  UPDATE_COURSE,
  REMOVE_COURSE,
  CREATE_OTHER_SKILL,
  UPDATE_OTHER_SKILL,
  REMOVE_OTHER_SKILL,
  UPDATE_ABOUT_CV,
  UPDATE_ABOUT_PERSON,
  UPDATE_TARGET,
  UPDATE_SKILLS,
  UPDATE_CV,
  UPDATE_CV_LAST_UPDATE
} from "../actions/types";

// export function generateUUID() { // Public Domain/MIT
//   var d = new Date().getTime();//Timestamp
//   var d2 = (performance && performance.now && (performance.now()*1000)) || 0;//Time in microseconds since page-load or 0 if unsupported
//   return 'Nxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
//       var r = Math.random() * 16;//random number between 0 and 16
//       if(d > 0){//Use timestamp until depleted
//           r = (d + r)%16 | 0;
//           d = Math.floor(d/16);
//       } else {//Use microseconds since page-load if supported
//           r = (d2 + r)%16 | 0;
//           d2 = Math.floor(d2/16);
//       }
//       return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
//   });
// }

const INITIAL_STATE = {
  "my0:hasReference": [],
  "my0:hasWorkHistory": [],
  "my0:cvLastUpdate": "",
  "my0:cvIsConfidential": false,
  "my0:cvCopyright": [{
      "@value": "",
      "@language": "en"
    },
    {
      "@value": "",
      "@language": "de"
    },
    {
      "@value": "",
      "@language": "it"
    },
    {
      "@value": "",
      "@language": "fr"
    },
    {
      "@value": "",
      "@language": "sq"
    }
  ],
  "my0:cvNotes": [{
      "@value": "",
      "@language": "en"
    },
    {
      "@value": "",
      "@language": "de"
    },
    {
      "@value": "",
      "@language": "it"
    },
    {
      "@value": "",
      "@language": "fr"
    },
    {
      "@value": "",
      "@language": "sq"
    }
  ],
  "my0:hasCourse": [],
  "my0:aboutPerson": {
    "my0:hasNationality": [],
    "my0:firstName": "",
    "my0:lastName": "",
    "my0:formerName": "",
    "my0:hasInstantMessaging": [],
    "my0:dateOfBirth": "",
    "@type": "my0:Person",
    "my0:email": "",
    "my0:photo": "",
    "my0:title": "",
    "my0:driversLicence": "",
    "my0:hasCitizenship": [],
    "my0:hasWebsite": [],
    "my0:address": {
      "@type": "my0:Address",
      "my0:country": "",
      "my0:postalCode": "",
      "my0:street": [{
          "@value": "",
          "@language": "en"
        },
        {
          "@value": "",
          "@language": "de"
        },
        {
          "@value": "",
          "@language": "it"
        },
        {
          "@value": "",
          "@language": "fr"
        },
        {
          "@value": "",
          "@language": "sq"
        }
      ],
      "my0:city": [{
          "@value": "",
          "@language": "en"
        },
        {
          "@value": "",
          "@language": "de"
        },
        {
          "@value": "",
          "@language": "it"
        },
        {
          "@value": "",
          "@language": "fr"
        },
        {
          "@value": "",
          "@language": "sq"
        }
      ]
    },
    "my0:phoneNumberHome": "",
    "my0:phoneNumberWork": "",
    "my0:phoneNumberMobile": "",
    "my0:personShortDescription": [{
        "@value": "",
        "@language": "en"
      },
      {
        "@value": "",
        "@language": "it"
      },
      {
        "@value": "",
        "@language": "fr"
      },
      {
        "@value": "",
        "@language": "de"
      },
      {
        "@value": "",
        "@language": "sq"
      },
    ],
    "my0:personLongDescription": [{
        "@value": "",
        "@language": "en"
      },
      {
        "@value": "",
        "@language": "it"
      },
      {
        "@value": "",
        "@language": "fr"
      },
      {
        "@value": "",
        "@language": "de"
      },
      {
        "@value": "",
        "@language": "sq"
      },
    ],
    "my0:gender": ""
  },
  "my0:hasSkill": [],
  "@type": "my0:CV",
  "my0:hasTarget": {
    "@type": "my0:Target",
    "my0:targetJobDescription": [{
        "@value": "",
        "@language": "en"
      },
      {
        "@value": "",
        "@language": "de"
      },
      {
        "@value": "",
        "@language": "it"
      },
      {
        "@value": "",
        "@language": "fr"
      },
      {
        "@value": "",
        "@language": "sq"
      }
    ],
    "my0:targetJobTitle": [{
        "@value": "",
        "@language": "en"
      },
      {
        "@value": "",
        "@language": "de"
      },
      {
        "@value": "",
        "@language": "it"
      },
      {
        "@value": "",
        "@language": "fr"
      },
      {
        "@value": "",
        "@language": "sq"
      }
    ],
    "my0:targetWeeksNoticePeriod": [{
        "@value": "",
        "@language": "en"
      },
      {
        "@value": "",
        "@language": "de"
      },
      {
        "@value": "",
        "@language": "it"
      },
      {
        "@value": "",
        "@language": "fr"
      },
      {
        "@value": "",
        "@language": "sq"
      }
    ],
    "my0:targetCountry": [],
    "my0:targetConditionWillRelocate": true,
    "my0:targetConditionWillTravel": "",
    "my0:conditionWillRelocate": true,
    "my0:targetSalaryRange": "",
    "my0:targetCompanySize": "",
    "my0:targetCareerLevel": "",
    "my0:targetCompanyDescription": [{
        "@value": "",
        "@language": "en"
      },
      {
        "@value": "",
        "@language": "de"
      },
      {
        "@value": "",
        "@language": "it"
      },
      {
        "@value": "",
        "@language": "fr"
      },
      {
        "@value": "",
        "@language": "sq"
      }
    ],
    "my0:targetCompanyField": [],
    "my0:targetRegion": []
  },
  "my0:hasOtherInfo": [],
  "my0:hasPublication": [],
  "my0:hasPatent": [],
  "my0:hasProject": [],
  "my0:hasHonorAward": [],
  "my0:hasEducation": [],
  "my0:cvIsActive": true,
  "@context": {
    "rdfs": "http://www.w3.org/2000/01/rdf-schema#",
    "rdf": "http://www.w3.org/1999/02/22-rdf-syntax-ns#",
    "country": "http://www.bpiresearch.com/BPMO/2004/03/03/cdl/Countries#",
    "my0": "http://example.com/rdf2resume_ontology.rdf#",
    "xsd": "http://www.w3.org/2001/XMLSchema#",
    "mybase0": "http://example.com/rdf2resume_base_ontology.rdf#"
  }
}

function replaceLanguageValue(data, language, value) {
  let length = data.length;
  for (let i = 0; i < length; i++) {
    if (data[i]["@language"] === language) {
      data[i]["@value"] = value;
      break;
    }
  }
  return data;
}

function orderListByDate(listObject, dateName) {
  console.log(listObject);
  let newOrderedList = listObject.sort(function (a, b) {
    // Turn your strings into dates, and then subtract them
    // to get a value that is either negative, positive, or zero.
    return new Date(b[dateName]) - new Date(a[dateName]);
  });
  return newOrderedList
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_CV:
      return {
        ...state, cv: action.payload
      };
    case FETCH_ABOUT_CV:
      return {
        ...state, aboutCV: action.payload
      };
    case FETCH_ABOUT_PERSON:
      return {
        ...state, aboutPerson: action.payload
      };
    case FETCH_TARGET:
      return {
        ...state, target: action.payload
      };
    case FETCH_EDUCATION:
      return {
        ...state, education: action.payload
      };
    case FETCH_COURSES:
      return {
        ...state, courses: action.payload
      };
    case FETCH_WORK_HISTORY:
      return {
        ...state, workHistory: action.payload
      };
    case FETCH_SKILLS:
      return {
        ...state, skills: action.payload
      };
    case FETCH_REFERENCES:
      return {
        ...state, references: action.payload
      };
    case FETCH_OTHER_INFO:
      return {
        ...state["my0:hasOtherInfo"], ..._.mapKeys(action.payload, "id")
      };
    case CREATE_OTHER_INFO:
      let otherinfos = {
        ...state
      };
      otherinfos['my0:hasOtherInfo'].push(action.payload);
      return otherinfos;
    case UPDATE_OTHER_INFO:
      let updateotherinfos = {
        ...state
      };
      updateotherinfos['my0:hasOtherInfo'][action.payload.index] = action.payload.object;
      return updateotherinfos;
    case REMOVE_OTHER_INFO:
      let removedotherinfo = {
        ...state
      };
      removedotherinfo = removedotherinfo["my0:hasOtherInfo"];
      let removedotherinfos = _.filter(removedotherinfo, function (item, index) {
        return index !== action.payload;
      });
      return {
        ...state, "my0:hasOtherInfo": removedotherinfos
      };
    case CREATE_PUBLICATION:
      let pubs = {
        ...state
      };
      let puArray = pubs['my0:hasPublication'];
      puArray.push(action.payload);
      let sortedpuArray = orderListByDate(puArray, "my0:publicationDate");
      pubs['my0:hasPublication'] = sortedpuArray;
      return pubs;
    case UPDATE_PUBLICATION:
      let updatedpubs = {
        ...state
      };
      let uppuArray = updatedpubs['my0:hasPublication'];
      uppuArray[action.payload.index] = action.payload.object;
      let sorteduppuArray = orderListByDate(uppuArray, "my0:publicationDate");
      updatedpubs['my0:hasPublication'] = sorteduppuArray;
      return updatedpubs;
    case REMOVE_PUBLICATION:
      let removepub = {
        ...state
      };
      removepub = removepub["my0:hasPublication"];
      let removedpubss = _.filter(removepub, function (item, index) {
        return index !== action.payload;
      });
      return {
        ...state, "my0:hasPublication": removedpubss
      };
    case CREATE_PATENT:
      let pats = {
        ...state
      };
      let paArray = pats['my0:hasPatent'];
      paArray.push(action.payload);
      let sortedpaArray = orderListByDate(paArray, "my0:patentIssuedDate");
      pats['my0:hasPatent'] = sortedpaArray;
      return pats;
    case UPDATE_PATENT:
      let updatedpats = {
        ...state
      };
      let uppaArray = updatedpats['my0:hasPatent'];
      uppaArray[action.payload.index] = action.payload.object;
      let sorteduppaArray = orderListByDate(uppaArray, "my0:patentIssuedDate");
      updatedpats['my0:hasPatent'] = sorteduppaArray;
      return updatedpats;
    case REMOVE_PATENT:
      let removepat = {
        ...state
      };
      removepat = removepat["my0:hasPatent"];
      let removedpatss = _.filter(removepat, function (item, index) {
        return index !== action.payload;
      });
      return {
        ...state, "my0:hasPatent": removedpatss
      };
    case CREATE_PROJECT:
      let pros = {
        ...state
      };
      let poArray = pros['my0:hasProject'];
      poArray.push(action.payload);
      let sortedpoArray = orderListByDate(poArray, "my0:projectStartDate");
      pros['my0:hasProject'] = sortedpoArray;
      return pros;
    case UPDATE_PROJECT:
      let updatedpros = {
        ...state
      };
      let uppoArray = updatedpros['my0:hasProject'];
      uppoArray[action.payload.index] = action.payload.object;
      let sorteduppoArray = orderListByDate(uppoArray, "my0:projectStartDate");
      updatedpros['my0:hasProject'] = sorteduppoArray;
      return updatedpros;
    case REMOVE_PROJECT:
      let removepros = {
        ...state
      };
      removepros = removepros["my0:hasProject"];
      let removeprosss = _.filter(removepros, function (item, index) {
        return index !== action.payload;
      });
      return {
        ...state, "my0:hasProject": removeprosss
      };
    case CREATE_HONOR:
      let hons = {
        ...state
      };
      let honsArray = hons['my0:hasHonorAward']
      honsArray.push(action.payload);
      let sortedHonsArray = orderListByDate(honsArray, "my0:honorIssuedDate");
      hons['my0:hasHonorAward'] = sortedHonsArray;
      return hons;
    case UPDATE_HONOR:
      let updateshons = {
        ...state
      };
      let uphonsArray = updateshons['my0:hasHonorAward']
      uphonsArray[action.payload.index] = action.payload.object;
      let sortedupHonsArray = orderListByDate(uphonsArray, "my0:honorIssuedDate");
      updateshons['my0:hasHonorAward'] = sortedupHonsArray;
      return updateshons;
    case REMOVE_HONOR:
      let removehons = {
        ...state
      };
      removehons = removehons["my0:hasHonorAward"];
      let removehonss = _.filter(removehons, function (item, index) {
        return index !== action.payload;
      });
      return {
        ...state, "my0:hasHonorAward": removehonss
      };
    case CREATE_REFERENCE:
      let references = {
        ...state
      };
      references['my0:hasReference'].push(action.payload);
      return references;
    case UPDATE_REFERENCE:
      let updatereferences = {
        ...state
      };
      updatereferences['my0:hasReference'][action.payload.index] = action.payload.object;
      return updatereferences;
    case REMOVE_REFERENCE:
      let removereference = {
        ...state
      };
      removereference = removereference["my0:hasReference"];
      let removereferences = _.filter(removereference, function (item, index) {
        return index !== action.payload;
      });
      return {
        ...state, "my0:hasReference": removereferences
      };
    case CREATE_WORK_HISTORY:
      let workhistories = {
        ...state
      };
      let workArray = workhistories['my0:hasWorkHistory'];
      workArray.push(action.payload);
      let sortedworkArray = orderListByDate(workArray, "my0:startDate");
      workhistories['my0:hasWorkHistory'] = sortedworkArray;
      return workhistories;
    case UPDATE_WORK_HISTORY:
      let updateworkhistories = {
        ...state
      };
      let upworkArray = updateworkhistories['my0:hasWorkHistory'];
      upworkArray[action.payload.index] = action.payload.object;
      let sortedupworkArray = orderListByDate(upworkArray, "my0:startDate");
      updateworkhistories['my0:hasWorkHistory'] = sortedupworkArray;
      return updateworkhistories;
    case REMOVE_WORK_HISTORY:
      let removeworkhistory = {
        ...state
      };
      removeworkhistory = removeworkhistory["my0:hasWorkHistory"];
      let removeworkhistorys = _.filter(removeworkhistory, function (item, index) {
        return index !== action.payload;
      });
      return {
        ...state, "my0:hasWorkHistory": removeworkhistorys
      };
    case CREATE_EDUCATION:
      let educations = {
        ...state
      };
      let eduArray = educations['my0:hasEducation'];
      eduArray.push(action.payload);
      let sortededuArray = orderListByDate(eduArray, "my0:eduStartDate");
      educations['my0:hasEducation'] = sortededuArray;
      return educations;
    case UPDATE_EDUCATION:
      let updateeducations = {
        ...state
      };
      let upeduArray = updateeducations['my0:hasEducation'];
      upeduArray[action.payload.index] = action.payload.object;
      let sortedupeduArray = orderListByDate(upeduArray, "my0:eduStartDate");
      updateeducations['my0:hasEducation'] = sortedupeduArray;
      return updateeducations;
    case REMOVE_EDUCATION:
      let removeeducation = {
        ...state
      };
      removeeducation = removeeducation["my0:hasEducation"];
      let removeeducations = _.filter(removeeducation, function (item, index) {
        return index !== action.payload;
      });
      return {
        ...state, "my0:hasEducation": removeeducations
      };
    case CREATE_COURSE:
      let courses = {
        ...state
      };
      let coArray = courses['my0:hasCourse'];
      coArray.push(action.payload);
      let sortedcoArray = orderListByDate(coArray, "my0:courseStartDate");
      courses['my0:hasCourse'] = sortedcoArray;
      return courses;
    case UPDATE_COURSE:
      let updatecourses = {
        ...state
      };
      let upcoArray = updatecourses['my0:hasCourse'];
      upcoArray[action.payload.index] = action.payload.object;;
      let sortedupcoArray = orderListByDate(upcoArray, "my0:courseStartDate");
      updatecourses['my0:hasCourse'] = sortedupcoArray;
      return updatecourses;
    case REMOVE_COURSE:
      let removecourses = {
        ...state
      };
      removecourses = removecourses["my0:hasCourse"];
      let removecoursess = _.filter(removecourses, function (item, index) {
        return index !== action.payload;
      });
      return {
        ...state, "my0:hasCourse": removecoursess
      };
    case CREATE_OTHER_SKILL:
      let otherskills = {
        ...state
      };
      otherskills['my0:hasSkill'].push(action.payload);
      return otherskills;
    case UPDATE_OTHER_SKILL:
      let updatedskill = {
        ...state
      };
      updatedskill['my0:hasSkill'][action.payload.index] = action.payload.object;
      return updatedskill;
    case REMOVE_OTHER_SKILL:
      let removedskills = {
        ...state
      };
      removedskills = removedskills["my0:hasSkill"];
      let removedskillss = _.filter(removedskills, function (item, index) {
        return index !== action.payload;
      });
      return {
        ...state, "my0:hasSkill": removedskillss
      };
    case UPDATE_ABOUT_CV:
      let aboutcv = {
        ...state
      };
      let property = aboutcv["my0:" + action.payload.id];
      if (action.payload.language) {
        property = replaceLanguageValue(property, action.payload.language, action.payload.value);
        aboutcv["my0:" + action.payload.id] = property;
      } else {
        aboutcv["my0:" + action.payload.id] = action.payload.value;
      }
      return aboutcv;
    case UPDATE_CV_LAST_UPDATE:
      let aboutcvUpd = {
        ...state
      };
      let today = new Date();
      let currdate = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
      aboutcvUpd["my0:cvLastUpdate"] = currdate;
      return aboutcvUpd;
    case UPDATE_ABOUT_PERSON:
      let aboutperson = {
        ...state
      };
      if (action.payload.secondLevel && action.payload.secondLevel !== undefined) {
        let propertyPersonal = aboutperson['my0:aboutPerson']["my0:" + action.payload.secondLevel]["my0:" + action.payload.id];
        if (action.payload.language) {
          propertyPersonal = replaceLanguageValue(propertyPersonal, action.payload.language, action.payload.value);
          aboutperson['my0:aboutPerson']["my0:" + action.payload.secondLevel]["my0:" + action.payload.id] = propertyPersonal;
        } else {
          aboutperson['my0:aboutPerson']["my0:" + action.payload.secondLevel]["my0:" + action.payload.id] = action.payload.value;
        }
      } else {
        let propertyPersonal = aboutperson['my0:aboutPerson']["my0:" + action.payload.id];
        if (action.payload.language) {
          propertyPersonal = replaceLanguageValue(propertyPersonal, action.payload.language, action.payload.value);
          aboutperson['my0:aboutPerson']["my0:" + action.payload.id] = propertyPersonal;
        } else {
          aboutperson['my0:aboutPerson']["my0:" + action.payload.id] = action.payload.value;
        }
      }
      return aboutperson;
    case UPDATE_SKILLS:
      let updatedSkills = {
        ...state
      };
      updatedSkills['my0:hasSkill'] = action.payload;
      return updatedSkills;
    case UPDATE_TARGET:
      let updatetarget = {
        ...state
      };
      let propertyTarget = updatetarget['my0:hasTarget']["my0:" + action.payload.id];
      if (action.payload.language) {
        propertyTarget = replaceLanguageValue(propertyTarget, action.payload.language, action.payload.value);
        updatetarget['my0:hasTarget']["my0:" + action.payload.id] = propertyTarget;
      } else {
        updatetarget['my0:hasTarget']["my0:" + action.payload.id] = action.payload.value;
      }
      return updatetarget;
    case UPDATE_CV:
      return {
        ...action.payload
      };
    case CREATE_WEBSITE:
      let aps = {
        ...state
      };
      aps['my0:aboutPerson']['my0:hasWebsite'].push({
        "@type": "my0:Website",
        "my0:websiteURL": "",
        "my0:websiteType": ""
      });
      return aps;
    case UPDATE_WEBSITE:
      let uaps = {
        ...state
      };
      uaps['my0:aboutPerson']['my0:hasWebsite'][action.payload.id][action.payload.name] = action.payload.value;
      return uaps;
    case REMOVE_WEBSITE:
      let removedimsdd = {
        ...state
      };
      removedimsdd = removedimsdd["my0:aboutPerson"];
      let removedimss = _.filter(removedimsdd['my0:hasWebsite'], function (item, index) {
        return index !== action.payload;
      });
      removedimsdd['my0:hasWebsite'] = removedimss;
      return {
        ...state, "my0:aboutPerson": removedimsdd
      };
    case CREATE_IM:
      let ap = {
        ...state
      };
      ap['my0:aboutPerson']['my0:hasInstantMessaging'].push({
        "@type": "my0:InstantMessaging",
        "my0:instantMessagingName": "",
        "my0:instantMessagingUsername": ""
      });
      return ap;
    case UPDATE_IM:
      let uap = {
        ...state
      };
      uap['my0:aboutPerson']['my0:hasInstantMessaging'][action.payload.id][action.payload.name] = action.payload.value;
      return uap;
    case REMOVE_IM:
      let removedim = {
        ...state
      };
      removedim = removedim["my0:aboutPerson"];
      let removedims = _.filter(removedim['my0:hasInstantMessaging'], function (item, index) {
        return index !== action.payload;
      });
      removedim['my0:hasInstantMessaging'] = removedims;
      return {
        ...state, "my0:aboutPerson": removedim
      };
    default:
      return state;
  }
};