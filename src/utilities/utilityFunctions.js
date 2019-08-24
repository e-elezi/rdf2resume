import axios from "axios";
import _ from "lodash";

export const getLabelFromURI = uri => {
  let uriIndex = uri.lastIndexOf("#");
  return uri.substring(uriIndex);
};

// export const processInitialEndpointData = (head, results) => {
//   let varNames = head.vars;
//   results = results.bindings;
// };

export const handleUpload = async data => {
  const response = await axios.post("/submit_form", data);
  return response;
};

export const processDataBeforeSubmit = cvData => {
  // let education = Object.values(cvData.education);
  // cvData.education = education;
  // let courses = Object.values(cvData.courses);
  // cvData.courses = courses;
  // let workHistory = Object.values(cvData.workHistory);
  // cvData.workHistory = workHistory;
  // let references = Object.values(cvData.references);
  // cvData.references = references;
  // let otherInfo = Object.values(cvData.otherInfo);
  // cvData.otherInfo = otherInfo;
  // let OtherSkills = Object.values(cvData.skills.OtherSkills);
  // cvData.skills.OtherSkills = OtherSkills;
  console.log(handleUpload(cvData));
};


export function getDataOfType(data, type) {
  let graphs = data['@graph'];
  let length = graphs.length;
  for(let i=0; i < length; i++){
    if(graphs[i]['@type']===type){
      return graphs[i];
    }
  }
}

export function getDataOfId(data, id) {
  let graphs = data['@graph'];
  let length = graphs.length;
  for(let i=0; i < length; i++){
    if(graphs[i]['@id']===id){
      return graphs[i];
    }
  }
}

export function getDataArrayOfType(data, type) {
  let graphs = data['@graph'];
  let myarr = [];
  let length = graphs.length;
  for(let i=0; i < length; i++){
    if(graphs[i]['@type']===type){
      myarr.push(graphs[i]);
    }
  }
  return myarr;
}

export function setDataOfId(data, id, property, value) {
  let graphs = data['@graph'];
  let length = graphs.length;
  for(let i=0; i < length; i++){
    if(graphs[i]['@id']===id){
      graphs[i][property] = value;
      return data;
    }
  }
}

export function createObjInGraph(data, whereToAppend, obj) {
  //step 1 add new id to CV object
  let otherInfos = { ...data};
  let kc = getDataOfType(otherInfos, 'my0:CV');
  let kcid = kc['@id'];
  let othergraphs = otherInfos['@graph'];
  let nlengths = othergraphs.length;
  for(let i=0; i < nlengths; i++){
    if(othergraphs[i]['@id']===kcid){
      othergraphs[i][whereToAppend].push({ '@id': obj['@id'] });
    }
  }
  //step 2 create this object with this new id in graph
  othergraphs.push(obj);
  otherInfos['@graph'] = othergraphs;
  return otherInfos;
}

export function updateObjInGraph(data, obj) {
  let otherInfosU = { ...data};
  let othergraphsU = otherInfosU['@graph'];
  let nlengthU = othergraphsU.length;
  for(let i=0; i < nlengthU; i++){
    if(othergraphsU[i]['@id'] === obj['@id']){
      othergraphsU[i] = obj;
    }
  }
  otherInfosU['@graph'] = othergraphsU;
  return otherInfosU ;
}

export function removeObjInGraph(data, property ,id) {
  let kotbj = getDataOfType(data, 'my0:CV');
  let knidd = kotbj['@id'];
  //remove obj with that id
  let kot = { ...data};
  let kotgraphs = kot['@graph'];
  let myremoveotherinfo = _.filter(kotgraphs, function(item, index) { return item['@id'] !== id; });
  
  //remove from CV obj
  let kotlength = myremoveotherinfo.length;
  for(let i=0; i<kotlength; i++){
    if(myremoveotherinfo[i]['@id']===knidd){
      let removeemkot = _.filter(myremoveotherinfo[i][property], function(item, index) { return item['@id'] !== id; });
      myremoveotherinfo[i][property] = removeemkot;
    }
  }
  kot['@graph'] = myremoveotherinfo;
  return kot;
}