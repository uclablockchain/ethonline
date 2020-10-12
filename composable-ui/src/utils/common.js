import axios from 'axios';

const GenericAPICall = (options, res, error) => {

  var config = {
    method: options.method,
    url: options.url,
    headers: options.headers
  }

  axios(config)
    .then(res)
    .catch(error);
}


  export  {GenericAPICall};