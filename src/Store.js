const API_URL = "http://localhost:3000/";


function receive(url,cb){
    return fetch(API_URL+url,{
      accept: 'application/json',
    }).then(checkStatus)
      .then(parseJSON)
      .then(cb);
}

function send(url,obj,cb){
  return fetch(API_URL+url,{
    headers: {
      'accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method:"post",
    body:JSON.stringify(obj)
  }).then(checkStatus)
    .then(parseJSON)
    .then(cb);
}

function destroy(url,cb){
  return fetch(API_URL+url,{
    method:"delete"
  }).then((checkStatusNoThrow))
    .then(cb);
}


function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const error = new Error(`HTTP Error ${response.statusText}`);
  error.status = response.statusText;
  error.response = response;
  console.log(error); // eslint-disable-line no-console
  throw error;
}

function checkStatusNoThrow(response){
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const error = new Error(`HTTP Error ${response.statusText}`);
  error.status = response.statusText;
  error.response = response;
  console.log(error); // eslint-disable-line no-console
  return response;
}

function parseJSON(response) {
  return response.json();
}

const Store = {receive,send,destroy};
export default Store;
