import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import { NotFoundPage } from "../../NotFoundPage";
import ProjectDetailsView from "./ProjectDetailsView";
import { getProjectContentBySlug } from "./projectContentRegistry";

const ProjectDetailsRoute = () => {
  const { slug } = useParams<{ slug: string }>();

  const projectContent = slug ? getProjectContentBySlug(slug) : undefined;

  if (!projectContent) {
    return (
      <>
        <Helmet>
          <title>Project not found - Julia's Portfolio</title>
          <meta
            name="description"
            content="The project you are looking for could not be found."
          />
        </Helmet>
        <NotFoundPage />
      </>
    );
  }

  return <ProjectDetailsView content={projectContent} />;
};

export default ProjectDetailsRoute;

