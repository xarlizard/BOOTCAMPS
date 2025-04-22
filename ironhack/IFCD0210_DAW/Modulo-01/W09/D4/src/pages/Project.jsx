import React from "react";
import ProjectHero from "@/components/ProjectHero";
import ProjectsRow from "@/components/ProjectsRow";
import Newsletter from "@/components/Newsletter";

const Project = () => {
  return (
    <div>
      <ProjectHero />
      <ProjectsRow variant={false} />
      <Newsletter />
      <br />
    </div>
  );
};

export default Project;
