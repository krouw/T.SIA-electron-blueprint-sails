import axios from 'axios';

export function loginServer(data){
  return dispach =>{
    return axios.post('/auth',data).then( res => {
      const token = res.data.token;
      localStorage.setItem('jwToken',token);
    });
  }
}

export function userSignipRequest(userData){
  return dispach =>{
    return axios.post('http://localhost:1337/auth/signup',userData);
  }
}
