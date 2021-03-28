import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { createProject } from "../../store/actions/projectActions";

const CreateProject = (props) => {
  const [title, setTitle] = useState(String);
  const [content, setContent] = useState(String);
  const [project, setProject] = useState({});

  const { createProject, auth } = props;

  const handleChange = (event) => {
    if (event.id === "title") {
      setTitle(event.value);
    } else {
      setContent(event.value);
    }
  };

  useEffect(() => {
    setProject(
      JSON.parse(
        JSON.stringify({
          title,
          content,
        })
      )
    );
  }, [title, content]);

  const handleSubmit = (event) => {
    event.preventDefault();
    createProject(project);
    props.history.push("/");
  };

  if (auth.isEmpty) {
    return <Redirect to="/signin" />;
  } else {
    return (
      <div className="container">
        <form onSubmit={(event) => handleSubmit(event)} className="white">
          <h5 className="grey-text text-darken-3">Create new project</h5>
          <div className="input-field">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(event) => handleChange(event.target)}
            />
          </div>
          <div className="input-field">
            <label htmlFor="content">Project Content</label>
            <textarea
              className="materialize-textarea"
              id="content"
              onChange={(event) => handleChange(event.target)}
            />
          </div>
          <button type="submit" className="btn pink lighten-1 zz-depth-0">
            Create Project
          </button>
        </form>
      </div>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createProject: (project) => dispatch(createProject(project)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateProject);
