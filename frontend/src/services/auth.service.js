import axios from "axios";

const API_URL = "http://localhost:8080/api/auth/";

const register = (username, email, password) => {
  return axios.post(API_URL + "signup", {
    username,
    email,
    password,
  });
};

const adduser = (username, email, password,subscribed) => {
  return axios.post(API_URL + "adduser", {
    username,
    email,
    password,
    subscribed,
  });
};
const getalluser = () => {
  return axios.get(API_URL + "alluser");
};
const getUser = (id) => {
  return axios.get(API_URL + `user/${id}`);
};

const finduserByname = (name) => {
  return axios.get(API_URL + `alluser?username=${name}`);
};


const updateuser=(id, data)=> {
  console.log("url",API_URL +`edituser/${id}`);
  console.log("data",data);
  return axios.put(API_URL +`edituser/${id}`, data);
}

const deleteAllUser=()=> {
  return axios.delete(API_URL +"users");
}

const deleteUser=(id)=> {
  return axios.delete(API_URL +`/deleteuser/${id}`);
}

const login = (username, password) => {
  return axios
    .post(API_URL + "signin", {
      username,
      password,
    })
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

export default {
  register,
  adduser,
  login,
  logout,
  getCurrentUser,
  getalluser,deleteAllUser,getUser,updateuser,finduserByname
};
