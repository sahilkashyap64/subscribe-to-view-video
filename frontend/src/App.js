import React, { useState, useEffect } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AuthService from "./services/auth.service";

import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Profile from "./components/Profile";
import BoardUser from "./components/BoardUser";
import BoardModerator from "./components/BoardModerator";
import BoardAdmin from "./components/BoardAdmin";

import AddTutorial from "./components/add-tutorial.component";
import AddUser from "./components/add-user.component";
import Tutorial from "./components/tutorial.component";
import User from "./components/user.component";
import TutorialsList from "./components/tutorials-list.component";
import UsersList from "./components/users-list.component";

const App = () => {
  const [showModeratorBoard, setShowModeratorBoard] = useState(false);
  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
      setShowModeratorBoard(user.roles.includes("ROLE_MODERATOR"));
      setShowAdminBoard(user.roles.includes("ROLE_ADMIN"));
    }
  }, []);

  const logOut = () => {
    AuthService.logout();
  };

  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <Link to={"/"} className="navbar-brand">
          Task
        </Link>
        <div className="navbar-nav mr-auto">
        {currentUser ?(  <li className="nav-item">
              <Link to={"/user"} className="nav-link">
                User Home
              </Link>
            </li>): (<li className="nav-item">
            <Link to={"/home"} className="nav-link">
              Public Home
            </Link>
          </li>)}
          {showAdminBoard && ( <li className="nav-item">
              <Link to={"/tutorials"} className="nav-link">
                Tutorials
              </Link>
            </li>)}
            {showAdminBoard && (<li className="nav-item">
              <Link to={"/add"} className="nav-link">
                Add tutorial
              </Link>
            </li>)}
            {showAdminBoard && (<li className="nav-item">
              <Link to={"/adduser"} className="nav-link">
                Add user
              </Link>
            </li>)}
             {showAdminBoard && (<li className="nav-item">
              <Link to={"/alluser"} className="nav-link">
                All user
              </Link>
            </li>)}
          {showModeratorBoard && (
            <li className="nav-item">
              <Link to={"/mod"} className="nav-link">
                Moderator Board
              </Link>
            </li>
          )}

          {showAdminBoard && (
            <li className="nav-item">
              <Link to={"/admin"} className="nav-link">
                Admin Board
              </Link>
            </li>
          )}

        </div>

        {currentUser ? (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/profile"} className="nav-link">
                {currentUser.username}
              </Link>
            </li>
            <li className="nav-item">
              <a href="/login" className="nav-link" onClick={logOut}>
                LogOut
              </a>
            </li>
          </div>
        ) : (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/login"} className="nav-link">
                Login
              </Link>
            </li>

            <li className="nav-item">
              <Link to={"/register"} className="nav-link">
                Sign Up
              </Link>
            </li>
          </div>
        )}
      </nav>

      <div className="container mt-3">
        <Switch>
          <Route exact path={["/", "/home"]} component={Home} />
          <Route exact path="/tutorials" component={TutorialsList} />
          <Route exact path="/alluser" component={UsersList} />
          <Route exact path="/add" component={AddTutorial} />
          <Route exact path="/adduser" component={AddUser} />
            <Route path="/tutorials/:id" component={Tutorial} />
            <Route path="/users/:id" component={User} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/profile" component={Profile} />
          <Route path="/user" component={BoardUser} />
          <Route path="/mod" component={BoardModerator} />
          <Route path="/admin" component={BoardAdmin} />
        </Switch>
      </div>
    </div>
  );
};

export default App;
