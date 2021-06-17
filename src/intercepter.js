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



  axios.interceptors.response.use(function (response) {

    return response;
  }, function (error) {

    console.log("Error :" ,error.response.status)
    let {status}=error.response
    if(status===403 ){
      // history.push("/login")
      return refreshAccessToken(history)
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
          return await axios.get(BOOK_URL)
      }
  } catch (err) {
      history.replace('/login')
  }
}
