import React, { useState } from "react";
import AuthService from "../services/auth.service";

const Profile = () => {
  const currentUser = AuthService.getCurrentUser();
  const [users, setUsers] = useState(currentUser);
  
  const updateSubscribed=(status)=> {
    
    var data = {
      id: currentUser.id,
      username: currentUser.username,
      email: currentUser.email,
      subscribed: status
    };


    AuthService.updateuser(currentUser.id, data)
      .then(response => {
        setUsers(data)
        console.log(response.data);
        const localstoragedata = {
          ...JSON.parse(localStorage.getItem('user')),
          ...data
      };
        localStorage.setItem("user", JSON.stringify(localstoragedata));
      })
      .catch(e => {
        console.log("respnse",e.response);
        console.log(e);
      });
  
  
  }

  return (
    <div className="container">
      <header className="jumbotron">
        <h3>
          <strong>{currentUser.username}</strong> Profile
        </h3>
        <p>{users.subscribed ? "Thanks for being a subscribed user" : "Kindly subscribe to view unintrupped videos"}</p>
      </header>
      <p>
        <strong>Token:</strong> {currentUser.accessToken.substring(0, 20)} ...{" "}
        {currentUser.accessToken.substr(currentUser.accessToken.length - 20)}
      </p>
      <p>
        <strong>Id:</strong> {currentUser.id}
      </p>
      <p>
        <strong>Email:</strong> {currentUser.email}
      </p>
      <p>
        <strong>Subsciption:</strong> {users.subscribed ? "Subscribed" : "Not subscribed"}

        {users.subscribed ? (
              <button
                className="badge badge-primary mr-2"
                onClick={() => updateSubscribed(false)}
              >
                UnSubscribe
              </button>
            ) : (
              <button
                className="badge badge-primary mr-2"
                onClick={() => updateSubscribed(true)}
              >
                Subscribe
              </button>
            )}
      </p>
      <strong>Authorities:</strong>
      <ul>
        {currentUser.roles &&
          currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}
      </ul>
    </div>
  );
};

export default Profile;
