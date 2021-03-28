import React from "react";
import ProjectSummary from "./ProjectSummary";
import { Link } from "react-router-dom";

const ProjectList = ({ projects }) => {
  return (
    <div className="project-list section">
      {projects &&
        projects.map((project) => {
          return (
            <Link key={project.id} to={"/project/" + project.id}>
              <ProjectSummary
                key={project.id}
                title={project.title}
                content={project.content}
                authorFirstName={project.authorFirstName}
                authorLastName={project.authorLastName}
                createdAt={project.createdAt}
              />
            </Link>
          );
        })}
    </div>
  );
};

export default ProjectList;
