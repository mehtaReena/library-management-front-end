import axios from "axios";
export default function setUpInterceptor(history){

axios.interceptors.request.use(function (req) {
    let access_Token= localStorage.getItem('access_Token')
    console.log(access_Token)
    if(!access_Token){
      console.log("")
    }
    else{
      req.headers['Authorization']= 'Bearer '+access_Token;
    }

    return req

  }, function (error) {
     console.log( "Error :",  error.message)
    return Promise.reject(error);
  });



  axios.interceptors.response.use(function(response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
}, async function(error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    let { status } = error.response
    let originalRequest = error.config
    if (status === 403) {
        await refreshAccessToken()
        return axios(originalRequest)
    } else if (status === 401) {
        history.replace('/login')
    }
    return Promise.reject(error);
});
}

async function refreshAccessToken(history) {
  try {
    const REFERESH_URL = 'http://localhost:3300/auth/token';
    const BOOK_URL = 'http://localhost:3300/books';
      let refresh_Token = window.localStorage.getItem('refresh_Token')
      let response = await axios.post(REFERESH_URL, {
          token: refresh_Token,
      })
      // console.log(" refreshAccessToken " ,response.data)
      if (response.status === 200) {

          window.localStorage.setItem('access_Token', response.data.access_token)
          // return await axios.get(BOOK_URL)
          return response.data.access_token

      }
  } catch (err) {
      history.replace('/login')
  }
}
