import React, { Component } from "react";
import AuthService from "../services/auth.service";
export default class User extends Component {
  constructor(props) {
    super(props);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangeSubscribed = this.onChangeSubscribed.bind(this);
    this.getUser = this.getUser.bind(this);
    this.updateSubscribed = this.updateSubscribed.bind(this);
    this.updateUser = this.updateUser.bind(this);
    this.deleteUser = this.deleteUser.bind(this);

    this.state = {
      currentUser: {
        id: null,
        username: "",
        email: "",
        subscribed: false
      },
      message: ""
    };
  }

  componentDidMount() {
    this.getUser(this.props.match.params.id);
  }

  onChangeUsername(e) {
    const username = e.target.value;

    this.setState(function(prevState) {
      return {
        currentUser: {
          ...prevState.currentUser,
          username: username
        }
      };
    });
  }

  onChangeEmail(e) {
    const email = e.target.value;
    
    this.setState(prevState => ({
      currentUser: {
        ...prevState.currentUser,
        email: email
      }
    }));
  }
  onChangeSubscribed(e) {
    const subscribed = e.target.value;
    
    this.setState(prevState => ({
      currentUser: {
        ...prevState.currentUser,
        subscribed: subscribed
      }
    }));
  }

  getUser(id) {
    AuthService.getUser(id)
      .then(response => {
        this.setState({
          currentUser: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateSubscribed(status) {
    var data = {
      id: this.state.currentUser.id,
      username: this.state.currentUser.username,
      email: this.state.currentUser.email,
      subscribed: status
    };

    AuthService.updateuser(this.state.currentUser.id, data)
      .then(response => {
        this.setState(prevState => ({
          currentUser: {
            ...prevState.currentUser,
            subscribed: status
          }
        }));
        console.log(response.data);
      })
      .catch(e => {
        console.log("respnse",e.response);
        console.log(e);
      });
  }

  updateUser() {
    console.log("currentuser",this.state.currentUser);
    
    AuthService.updateuser(
      this.state.currentUser.id,
      this.state.currentUser
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "The User was updated successfully!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteUser() {    
    AuthService.delete(this.state.currentUser.id)
      .then(response => {
        console.log(response.data);
        this.props.history.push('/tutorials')
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { currentUser } = this.state;

    return (
      <div>
        {currentUser ? (
          <div className="edit-form">
            <h4>User</h4>
            <form>
              <div className="form-group">
                <label htmlFor="username">username</label>
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  value={currentUser.username}
                  onChange={this.onChangeUsername}
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">email</label>
                <input
                  type="text"
                  className="form-control"
                  id="email"
                  value={currentUser.email}
                  onChange={this.onChangeEmail}
                />
              </div>
               <div className="form-group">
                <label htmlFor="subscribed">subscribed</label>
                <input
                  type="text"
                  className="form-control"
                  id="subscribed"
                  value={currentUser.subscribed}
                  onChange={this.onChangeSubscribed}
                  disabled={true} />
              </div>

              <div className="form-group">
                <label>
                  <strong>Status:</strong>
                </label>
                {currentUser.subscribed ? "Subscribed" : "Not Subscribed"}
              </div>
            </form>

            {currentUser.subscribed ? (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updateSubscribed(false)}
              >
                UnSubscribe
              </button>
            ) : (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updateSubscribed(true)}
              >
                Subscribe
              </button>
            )}

            <button
              className="badge badge-danger mr-2"
              onClick={this.deleteUser}
            >
              Delete
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateUser}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a User...</p>
          </div>
        )}
      </div>
    );
  }
}
