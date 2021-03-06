import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateAvatar } from '../../store/actions/userAction';

class UploadAvatar extends Component {
  state = {
    showPreview: false,
    selectedFile: null,
    selectedFilePreview: null,
    //TOGGLE COMPONENT WITH PROPS FROM PARENT
    showComponent: false,
  };

  _onChange = (e) => {
    console.log('changed', e.target.files[0]);
    if (!e.target.files[0]) {
      return this.setState({
        selectedFilePreview: null,
        showPreview: false,
      });
    }

    this.setState({
      showPreview: true,
      selectedFile: e.target.files[0],
      selectedFilePreview: URL.createObjectURL(e.target.files[0]),
    });
  };

  _upload = (e) => {
    e.preventDefault();
    // CREATE FormData()
    const fd = new FormData();
    fd.append('file', this.state.selectedFile);
    fd.append('id', this.props.id);

    // console.log('fd', fd);
    // console.log('selectedFile', this.state.selectedFile);
    this.props.updateAvatar(fd, this.props.history);
  };

  render() {
    return (
      //RECEIVES PROPS TO OPEN OR CLOSE COMPONENT FROM --- Profile.js---
      <div
        className={
          this.props.open
            ? 'profile__avatar'
            : 'profile__avatar profile__avatar--hide'
        }
      >
        <h1 className="profile__avatar-heading">Upload Avatar</h1>
        <div className="profile__avatar-container">
          {this.state.showPreview ? (
            <div className="profile__avatar-container--preview ">
              <img
                src={this.state.selectedFilePreview}
                alt="preview"
                className="profile__avatar-container--preview-img"
              />
            </div>
          ) : null}
          <form onSubmit={this._upload} className="profile__avatar-form">
            <input
              type="file"
              name="hero"
              className="profile__avatar-form--input"
              onChange={this._onChange}
            />
            <button className="btn" type="submit">
              {this.props.loading ? 'Loading..' : 'Submit'}
            </button>
          </form>
          {/* PROPS COMING FROM PARENT  */}
          {this.props.message ? (
            <div className=" profile__avatar-form--message  message">
              <span className="profile__avatar-form--message-text ">
                {this.props.message}
              </span>
            </div>
          ) : null}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = { updateAvatar };

export default connect(mapStateToProps, mapDispatchToProps)(UploadAvatar);
