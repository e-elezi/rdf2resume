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
  UPDATE_CV
} from "../actions/types";
import { 
  // getDataOfId, 
  getDataOfType, 
  // setDataOfId, 
  createObjInGraph,
  updateObjInGraph,
  removeObjInGraph,
  setDataOfId
 } from '../utilities/utilityFunctions';

export function generateUUID() { // Public Domain/MIT
  var d = new Date().getTime();//Timestamp
  var d2 = (performance && performance.now && (performance.now()*1000)) || 0;//Time in microseconds since page-load or 0 if unsupported
  return 'Nxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16;//random number between 0 and 16
      if(d > 0){//Use timestamp until depleted
          r = (d + r)%16 | 0;
          d = Math.floor(d/16);
      } else {//Use microseconds since page-load if supported
          r = (d2 + r)%16 | 0;
          d2 = Math.floor(d2/16);
      }
      return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
  });
}

var id_CV = generateUUID();
var id_aboutPerson = generateUUID();
var id_personAddress = generateUUID();
var id_target = generateUUID();
var id_CommunicationSkills = generateUUID();
var id_OrganisationalSkills = generateUUID();
var id_JobRelatedSkills = generateUUID();
var id_DigitalSkills = generateUUID();

const INITIAL_STATE = {
  "@context": {
    "country": "http://www.bpiresearch.com/BPMO/2004/03/03/cdl/Countries#",
    "my0": "http://example.com/rdf2resume_ontology.rdf#",
    "mybase0": "http://example.com/rdf2resume_base_ontology.rdf#",
    "rdf": "http://www.w3.org/1999/02/22-rdf-syntax-ns#",
    "rdfs": "http://www.w3.org/2000/01/rdf-schema#",
    "xsd": "http://www.w3.org/2001/XMLSchema#"
  },
  "@graph": [
    {
      "@id": "_:" + id_CV,
      "@type" : "my0:CV",
      "my0:cvTitle" : "",
      "my0:cvNotes" : "",
      "my0:cvIsActive" : true,
      "my0:cvIsConfidential" : false,
      "my0:cvLastUpdated" : "",
      "my0:cvCopyright" : "",
      "my0:aboutPerson" : {
        "@id" : "_:" + id_aboutPerson
      },
      "my0:hasCourse": [],
      "my0:hasEducation": [],
      "my0:hasOtherInfo": [],
      "my0:hasReference": [],
      "my0:hasSkill": [
        {
          "@id": "_:" + id_CommunicationSkills
        },
        {
          "@id": "_:" + id_DigitalSkills
        },
        {
          "@id": "_:" + id_JobRelatedSkills
        },
        {
          "@id": "_:" + id_OrganisationalSkills
        }
      ],
      "my0:hasWorkHistory": [],
      "my0:target": {
        "@id": "_:" + id_target
      }
    },
    {
      "@id" : "_:" + id_aboutPerson,
      "@type": "my0:Person",
      "my0:firstName" : "",
      "my0:lastName" : "",
      "my0:photo" : "",
      "my0:hasCitizenship" : [],
      "my0:hasNationality" : [],
      "my0:website" : "",
      "my0:dateOfBirth" : "",
      "my0:gender" : "",
      "my0:driversLicence" : "",
      "my0:hasTelephoneNumber" : [],
      "my0:email" : "",
      "my0:title" : "",
      "my0:hasInstantMessaging" : [],
      "my0:address" : {
        "@id" : "_:" + id_personAddress
      }
    },
    {
      "@id" : "_:" + id_personAddress,
      "@type": "my0:Address",
        "my0:city" : "",
        "my0:country" : "",
        "my0:street" : "",
        "my0:postalCode" : ""
    },
    {
      "@id": "_:" + id_target,
      "@type": "my0:Target",
      "my0:conditionWillRelocate": true,
      "my0:conditionWillTravel": true,
      "my0:targetCompanyCountry": [],
      "my0:targetCompanyDescription": "",
      "my0:targetCompanyIndustry": [],
      "my0:targetCompanyLocality": "",
      "my0:targetCompanySize": "",
      "my0:targetJobCareerLevel": "",
      "my0:targetJobDescription": "",
      "my0:targetJobMode": "",
      "my0:targetJobTitle": "",
      "my0:targetSalaryCurrency": "",
      "my0:targetSalaryRange": "",
      "my0:weeksNoticePeriod": ""
    },
    {
      "@id": "_:" + id_CommunicationSkills,
      "@type": "my0:CommunicationSkills",
      "my0:skillDescription": "kot"
    },
    {
      "@id": "_:" + id_OrganisationalSkills,
      "@type": "my0:OrganisationalSkills",
      "my0:skillDescription": ""
    },
    {
      "@id": "_:" + id_JobRelatedSkills,
      "@type": "my0:JobRelatedSkills",
      "my0:skillDescription": ""
    },
    {
      "@id": "_:" + id_DigitalSkills,
      "@type": "my0:DigitalSkills",
      "my0:hasICTCertificate": false,
      "my0:otherDigitalSkills": "",
      "my0:informationProcessing": "",
      "my0:communication": "",
      "my0:contentCreation": "",
      "my0:safety": "",
      "my0:problemSolving": ""
    }
  ]
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_CV:
      return { ...state, cv: action.payload };
    case FETCH_ABOUT_CV:
      return { ...state, aboutCV: action.payload };
    case FETCH_ABOUT_PERSON:
      return { ...state, aboutPerson: action.payload };
    case FETCH_TARGET:
      return { ...state, target: action.payload };
    case FETCH_EDUCATION:
      return { ...state, education: action.payload };
    case FETCH_COURSES:
      return { ...state, courses: action.payload };
    case FETCH_WORK_HISTORY:
      return { ...state, workHistory: action.payload };
    case FETCH_SKILLS:
      return { ...state, skills: action.payload };
    case FETCH_REFERENCES:
      return { ...state, references: action.payload };
    case FETCH_OTHER_INFO:
      return { ...state["my0:hasOtherInfo"], ..._.mapKeys(action.payload, "id") };
    case CREATE_OTHER_INFO:
      return createObjInGraph({...state}, 'my0:hasOtherInfo', action.payload) ;
    case UPDATE_OTHER_INFO:
      return updateObjInGraph({...state}, action.payload);
    case REMOVE_OTHER_INFO:
        return removeObjInGraph({...state}, 'my0:hasOtherInfo', action.payload);
    case CREATE_REFERENCE:
      let referencegraphs =  createObjInGraph({...state}, 'my0:hasReference', action.payload.reference);
      referencegraphs['@graph'].push(action.payload.person);
      referencegraphs['@graph'].push(action.payload.address);
      referencegraphs['@graph'].push(action.payload.workHistory);
      referencegraphs['@graph'].push(action.payload.organization);
      return referencegraphs;
    case UPDATE_REFERENCE:
      let referenceUpdate = updateObjInGraph({...state}, action.payload.reference);
      referenceUpdate = updateObjInGraph({...referenceUpdate}, action.payload.person);
      referenceUpdate = updateObjInGraph({...referenceUpdate}, action.payload.address);
      referenceUpdate = updateObjInGraph({...referenceUpdate}, action.payload.workHistory);
      referenceUpdate = updateObjInGraph({...referenceUpdate}, action.payload.organization);
      return referenceUpdate;
    case REMOVE_REFERENCE:
      //first remove address
      let removedreferences = removeObjInGraph({...state}, 'my0:hasReference', action.payload.reference);
      //then remove organization
      removedreferences = removeObjInGraph({...removedreferences}, 'my0:hasReference', action.payload.person);
      //finally remove course
      removedreferences = removeObjInGraph({...removedreferences}, 'my0:hasReference', action.payload.address);
      removedreferences = removeObjInGraph({...removedreferences}, 'my0:hasReference', action.payload.workHistory);
      removedreferences = removeObjInGraph({...removedreferences}, 'my0:hasReference', action.payload.organization);
      return removedreferences;
    case CREATE_WORK_HISTORY:
      let workgraphs =  createObjInGraph({...state}, 'my0:hasWorkHistory', action.payload.workHistory);
      workgraphs['@graph'].push(action.payload.organization);
      workgraphs['@graph'].push(action.payload.address);
      return workgraphs;
    case UPDATE_WORK_HISTORY:
      let workgraphUpdate = updateObjInGraph({...state}, action.payload.workHistory);
      workgraphUpdate = updateObjInGraph({...workgraphUpdate}, action.payload.organization);
      workgraphUpdate = updateObjInGraph({...workgraphUpdate}, action.payload.address);
      return workgraphUpdate;
    case REMOVE_WORK_HISTORY:
      //first remove address
      let removedGraphs = removeObjInGraph({...state}, 'my0:hasWorkHistory', action.payload.address);
      //then remove organization
      removedGraphs = removeObjInGraph({...removedGraphs}, 'my0:hasWorkHistory', action.payload.organization);
      //finally remove course
      removedGraphs = removeObjInGraph({...removedGraphs}, 'my0:hasWorkHistory', action.payload.workHistory);
      return removedGraphs;
    case CREATE_EDUCATION:
      let educationsgraphs =  createObjInGraph({...state}, 'my0:hasEducation', action.payload.education);
      educationsgraphs['@graph'].push(action.payload.organization);
      educationsgraphs['@graph'].push(action.payload.address);
      return educationsgraphs;
    case UPDATE_EDUCATION:
      let edugraphsUpdate = updateObjInGraph({...state}, action.payload.education);
      edugraphsUpdate = updateObjInGraph({...edugraphsUpdate}, action.payload.organization);
      edugraphsUpdate = updateObjInGraph({...edugraphsUpdate}, action.payload.address);
      return edugraphsUpdate;
    case REMOVE_EDUCATION:
      //first remove address
      let removedEdus = removeObjInGraph({...state}, 'my0:hasEducation', action.payload.address);
      //then remove organization
      removedEdus = removeObjInGraph({...removedEdus}, 'my0:hasEducation', action.payload.organization);
      //finally remove course
      removedEdus = removeObjInGraph({...removedEdus}, 'my0:hasEducation', action.payload.education);
      return removedEdus;
    case CREATE_COURSE:
      let coursesgraphs =  createObjInGraph({...state}, 'my0:hasCourse', action.payload.course);
      coursesgraphs['@graph'].push(action.payload.organization);
      coursesgraphs['@graph'].push(action.payload.organizationAddress);
      return coursesgraphs;
    case UPDATE_COURSE:
      let coursegraphsUpdate = updateObjInGraph({...state}, action.payload.course);
      coursegraphsUpdate = updateObjInGraph({...coursegraphsUpdate}, action.payload.organization);
      coursegraphsUpdate = updateObjInGraph({...coursegraphsUpdate}, action.payload.organizationAddress);
      return coursegraphsUpdate;
    case REMOVE_COURSE:
      //first remove address
      let removedCourses = removeObjInGraph({...state}, 'my0:hasCourse', action.payload.address);
      //then remove organization
      removedCourses = removeObjInGraph({...removedCourses}, 'my0:hasCourse', action.payload.organization);
      //finally remove course
      removedCourses = removeObjInGraph({...removedCourses}, 'my0:hasCourse', action.payload.course);
      return removedCourses;
    case CREATE_OTHER_SKILL:
      let otherskills = {...state};
      otherskills["@graph"].push(action.payload);
      return otherskills;
    case UPDATE_OTHER_SKILL:
        let updateSkills = updateObjInGraph({...state}, action.payload);
        return updateSkills;
    case REMOVE_OTHER_SKILL:
      //first remove address
      let removedskills = removeObjInGraph({...state}, 'my0:hasSkill', action.payload);
      return removedskills;
    case UPDATE_ABOUT_CV:
      let aboutcv = { ...state};
      let graphs = aboutcv['@graph'];
      let length = graphs.length;
      for(let i=0; i < length; i++){
        if(graphs[i]['@type']==='my0:CV'){
          graphs[i]["my0:" + action.payload.id] = action.payload.value;
        }
      }
      return { ...state, "@graph": graphs };
    case UPDATE_ABOUT_PERSON:
      let aboutperson = { ...state};
      let obj = getDataOfType(aboutperson, 'my0:CV');
      let id = obj['my0:aboutPerson']['@id'];
      let kgraphs = aboutperson['@graph'];
      let klength = kgraphs.length;
      for(let i=0; i < klength; i++){
        if(kgraphs[i]['@id']===id){
          if(action.payload.super) {
            let idAddress = kgraphs[i]['my0:address']['@id'];
            for(let j=0; j < klength; j++){
              if(kgraphs[j]['@id']===idAddress){
                if(action.payload.isURI) 
                kgraphs[j]['my0:' + action.payload.id] = action.payload.value["@type"];
                else
                kgraphs[j]['my0:' + action.payload.id] = action.payload.value;
                break;
              }
            }
          }
          else if(action.payload.isURI) 
          kgraphs[i]['my0:' + action.payload.id] = action.payload.value["@type"];
          else
          kgraphs[i]['my0:' + action.payload.id] = action.payload.value;
          break;
        }
      }
      return { ...state, "@graph": kgraphs };
    case UPDATE_SKILLS:
      let updatedSkills = {...state};
      let skillsgraphs = updatedSkills['@graph'];
      let skillslength = skillsgraphs.length;
      for(let i=0; i < skillslength; i++){
        if(skillsgraphs[i]['@id']===action.payload.id){
          skillsgraphs[i][action.payload.property] = action.payload.value;
          break;
        }
      }
      updatedSkills["@graph"] = skillsgraphs; 
      return updatedSkills;
    case UPDATE_TARGET:
        let targies = { ...state};
        let objs = getDataOfType(targies, 'my0:CV');
        let idtarget = objs['my0:target']['@id'];
        let targetgraphs = targies['@graph'];
        let targetlength = targetgraphs.length;
        for(let i=0; i < targetlength; i++){
          if(targetgraphs[i]['@id']===idtarget){
            // console.log(action.payload);
            if(action.payload.isURI) 
            targetgraphs[i]['my0:' + action.payload.id] = action.payload.value["@type"];
            else
            targetgraphs[i]['my0:' + action.payload.id] = action.payload.value;
            break;
          }
        }
        // console.log(targetgraphs);
        return { ...state, "@graph": targetgraphs };
    case UPDATE_CV:
      return { ...action.payload};
    case CREATE_IM:
      //step 1 add new id to aboutPerson
      let newimID = generateUUID();
      let ap = { ...state};
      let k = getDataOfType(ap, 'my0:CV');
      let nid = k['my0:aboutPerson']['@id'];
      let imgraphs = ap['@graph'];
      let nlength = imgraphs.length;
      for(let i=0; i < nlength; i++){
        if(imgraphs[i]['@id']===nid){
          imgraphs[i]['my0:hasInstantMessaging'].push({ '@id': "_:" + newimID });
        }
      }
       //step 2 create this object with this new id in graph
      imgraphs.push({
        "@id":  "_:" + newimID,
        "@type": "my0:InstantMessaging",
        "my0:instantMessagingName": "",
        "my0:instantMessagingUsername": ""
      });
      return { ...state, "@graph": imgraphs };
    case UPDATE_IM:
      let uap = { ...state};
      let uimgraphs = uap['@graph'];
      let uength = uimgraphs.length;
      for(let i=0; i < uength; i++){
        if(uimgraphs[i]['@id']===action.payload.id){
          uimgraphs[i][action.payload.name] = action.payload.value;
          break;
        }
      }
      return { ...state, "@graph": uimgraphs };
    case REMOVE_IM:
      let kobj = getDataOfType(state, 'my0:CV');
      let knid = kobj['my0:aboutPerson']['@id'];
      //remove instant messaging obj with that id
      let rap = { ...state};
      let rimgraphs = rap['@graph'];
      let myremoveotherim = _.filter(rimgraphs, function(item, index) { return item['@id'] !== action.payload; });

      //remove from aboutPerson
      let rlength = myremoveotherim.length;
      for(let i=0; i<rlength; i++){
        if(myremoveotherim[i]['@id']===knid){
          let removeem = _.filter(myremoveotherim[i]['my0:hasInstantMessaging'], function(item, index) { return item['@id'] !== action.payload; });
          myremoveotherim[i]['my0:hasInstantMessaging'] = removeem;
        }
      }
      return { ...state, "@graph": myremoveotherim };
    default:
      return state;
  }
};
