import StorageAdaptor from './StorageAdaptor';


const API_URL = "https://diswebtion-api.herokuapp.com/";
const AUTH_URL = API_URL+"auth/";

function receive(url,cb){
  if(!isAuthenticated()){
      return "login"; //meaning a need to transition to Login
  }

    var receiveHeaders = {
      accept: 'application/json',
    };
    var completeHeaders = constructHeadersForRequest(receiveHeaders);

    return fetch(API_URL+url,{
      headers:completeHeaders
    })
      .then(checkStatus)
      .then(parseJSON)
      .then(cb);
}

function send(url,obj,cb){
  if(!isAuthenticated()){
    return "login";
  }
  var sendHeaders = {
    'accept': 'application/json',
    'Content-Type': 'application/json'
  };
  var completeHeaders=constructHeadersForRequest(sendHeaders);
  return fetch(API_URL+url,{
    headers: completeHeaders,
    method:"post",
    body:JSON.stringify(obj)
  }).then(checkStatus)
    .then(parseJSON)
    .then(cb);
}

function destroy(url,cb){
  if(!isAuthenticated()){
    return "login";
  }
  return fetch(API_URL+url,{
    headers:constructHeadersForRequest({}),
    method:"delete"
  }).then((checkStatus))
    .then(cb);
}


function checkStatus(response) {

  if (response.ok) {
  //  setNewAuthDetails(response.headers);
    return response;
  }else if (response.status === 401) {
    deauthenticate();
  }
  const error = new Error(`HTTP Error ${response.statusText}`);
  error.status = response.statusText;
  error.response = response;
  console.log(error); // eslint-disable-line no-console
  //throw error;

}

function deauthenticate(){
  StorageAdaptor.remove("current_user_data");
  StorageAdaptor.remove("authenticated");
  StorageAdaptor.remove("auth_details");
  //TODO: transition to login page
}
function authenticate(email,password,cb){
  fetch(AUTH_URL+"sign_in?email="+email+"&password="+password,{
    method:"post",
  }).then((response)=>{
      if (!response.ok) {
      return;
    }
    setNewAuthDetails(response.headers);
  response.json().then((responseBody)=>{

    StorageAdaptor.setObject("current_user_data",responseBody.data);
    StorageAdaptor.setItem("authenticated","true");

    if(cb){
      cb(responseBody);
    }
  });
});
}
function extractAuthDetails(headers){

  var authDetails = {};
  authDetails["access-token"]=headers.get("access-token");
  authDetails["expiry"]=headers.get("expiry");
  authDetails["uid"]=headers.get("uid");
  authDetails["client"]=headers.get("client");
  authDetails["token-type"]=headers.get("token-type");
  return authDetails;
}
function setNewAuthDetails(headers){


  if(headers.get("access-token")){

    //deauthenticate();


    var authDetails = extractAuthDetails(headers);

    StorageAdaptor.setObject("auth_details",authDetails);
  }

}
function isAuthenticated(){

  return StorageAdaptor.getItem("authenticated") === "true";
}
function constructHeadersForRequest(headers1){
  var authentication_headers=StorageAdaptor.getObject("auth_details");
  var headers = Object.assign(headers1,authentication_headers);

  return headers;
}

function parseJSON(response) {
  if(response){
    return response.json();
  }else{
    return {error:"error"};
  }

}

const Store = {authenticate,deauthenticate,receive,send,destroy,isAuthenticated};
export default Store;
