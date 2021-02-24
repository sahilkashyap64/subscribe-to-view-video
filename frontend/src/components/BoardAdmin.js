import React, { useState, useEffect } from "react";

import UserService from "../services/user.service";

import VideoPlayer2 from './VideoPlayer2';
const BoardAdmin = () => {
  const [content, setContent] = useState("");

  const [videourl, setVideourl] = useState("");
  const [publictutorial, setPublictutorial] = useState([]);
 const currentIndex= -1;
  useEffect(() => {
    UserService.getAdminBoard().then(
      (response) => {
        setContent(response.data);
      },
      (error) => {
        const _content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setContent(_content);
      }
    );

    UserService.getPublishedTutorials().then(
      (response) => {
        setPublictutorial(response.data);
      },
      (error) => {
        const _publictutorial =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();

          setPublictutorial(_publictutorial);
      }
    );
  }, []);

  return (
    <div className="container">
      <header className="jumbotron">
        <h3>{content}</h3>
        Admin can play any video,no restriction
      </header>
      <div className="col-md-6">
      <h4>Tutorials List</h4>

          <ul className="list-group">
            {publictutorial &&
              publictutorial.map((tutorial, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => setVideourl(tutorial.url)}
                  key={index}
                >
                  {tutorial.title}<br></br>Click me
                </li>
              ))}
          </ul></div>
      <div className="col-md-6">

<VideoPlayer2 src={videourl} registered={true} subscribed={true} />
          </div>
    </div>
  );
};

export default BoardAdmin;
