import StorageAdaptor from './StorageAdaptor';

const API_URL = "http://localhost:3000/";
const AUTH_URL = "http://localhost:3000/auth/"

function receive(url,cb){
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
  return fetch(API_URL+url,{
    headers:constructHeadersForRequest({}),
    method:"delete"
  }).then((checkStatus))
    .then(cb);
}


function checkStatus(response) {
  if (response.ok) {
    setNewAuthDetails(response.headers);
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
  }).then(checkStatus)
  .then((response)=>{
    var heads = response.headers;


  response.json().then((responseBody)=>{
    StorageAdaptor.setObject("current_user_data",responseBody.data);
    setNewAuthDetails(heads);
    StorageAdaptor.setItem("authenticated","true");
    if(cb){
      cb(responseBody);
    }
  });
});
}
function extractAuthDetails(headers){
  var authDetails = {
     "access-token": headers.get("access-token"),
     "token-type": headers.get("token-type"),
     expiry: headers.get("expiry"),
     uid: headers.get("uid"),
  };
  return authDetails;
}
function setNewAuthDetails(headers){
  var authDetails = extractAuthDetails(headers);
  StorageAdaptor.setObject("auth_details",authDetails);
}
function isAuthenticated(){
  return StorageAdaptor.getItem("authenticated") === true;
}
function constructHeadersForRequest(headers1){
  console.log(headers1);
  var authentication_headers=StorageAdaptor.getObject("auth_details");
  console.log(authentication_headers);
  var headers = Object.assign(headers1,authentication_headers);
  console.log(headers);
  return headers;
}

function parseJSON(response) {
  return response.json();
}

const AuthStore = {authenticate,deauthenticate,receive,send,destroy,isAuthenticated};
export default AuthStore;
