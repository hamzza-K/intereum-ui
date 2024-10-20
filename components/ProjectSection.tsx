"use client";

interface Project {
  name: string;
  skills: string[];
  date: string;
  details: string[];
}

interface ProjectSectionProps {
  projects: Project[];
  setProjects: React.Dispatch<React.SetStateAction<Project[]>>;
}

export default function ProjectSection({
  projects,
  setProjects,
}: ProjectSectionProps) {
  const handleAddSkill = (
    projectIndex: number,
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    event.preventDefault();

    if (event.key === "Enter" && event.currentTarget.value.trim() !== "") {
      const newProjects = [...projects];
      const skill = event.currentTarget.value.trim();
      if (!newProjects[projectIndex].skills.includes(skill)) {
        newProjects[projectIndex].skills.push(skill);
      }
      setProjects(newProjects);
      event.currentTarget.value = ""; // Clear input field
    }
  };

  const handleRemoveSkill = (projectIndex: number, skillIndex: number) => {
    const newProjects = [...projects];
    newProjects[projectIndex].skills.splice(skillIndex, 1);
    setProjects(newProjects);
  };

  const handleAddProjectDetail = (projectIndex: number) => {
    const newProjects = [...projects];
    newProjects[projectIndex].details.push("");
    setProjects(newProjects);
  };

  const handleRemoveProjectDetail = (
    projectIndex: number,
    detailIndex: number
  ) => {
    const newProjects = [...projects];
    newProjects[projectIndex].details = newProjects[
      projectIndex
    ].details.filter((_, index) => index !== detailIndex);
    setProjects(newProjects);
  };

  const handleProjectDetailChange = (
    projectIndex: number,
    detailIndex: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = event.target;
    const newProjects = [...projects];
    newProjects[projectIndex].details[detailIndex] = value;
    setProjects(newProjects);
  };

  return (
    <div className="space-y-3">
      <div className="grid h-20 card rounded-none bg-base-300 bg-[#d8b4fe] mt-10">
        <h1 className="font-bold text-white p-2 font-mono text-2xl">Projects</h1>
      </div>
      {projects.map((project, projectIndex) => (
        <div key={projectIndex} className="mb-8">
          <div className="mb-4">
            <p className="font-bold">Project Name</p>
            <input
              type="text"
              className="input input-bordered w-full"
              value={project.name}
              onChange={(e) => {
                const newProjects = [...projects];
                newProjects[projectIndex].name = e.target.value;
                setProjects(newProjects);
              }}
            />
          </div>
          <div className="mb-4">
            <p className="font-bold">Skills</p>
            <div className="flex flex-wrap gap-2 mb-2">
              {project.skills.map((skill, skillIndex) => (
                <div key={skillIndex} className="badge badge-primary">
                  {skill}
                  <svg
                    onClick={() => handleRemoveSkill(projectIndex, skillIndex)}
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 ml-2 cursor-pointer"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                    type="button"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </div>
              ))}
            </div>
            <input
              type="text"
              className="input input-bordered w-full"
              placeholder="Enter a skill and press Enter"
              onKeyDown={(e) => handleAddSkill(projectIndex, e)}
            />
          </div>
          <div className="mb-4">
            <p className="font-bold">Date</p>
            <input
              type="text"
              placeholder="March 2024"
              className="input input-bordered w-full"
              value={project.date}
              onChange={(e) => {
                const newProjects = [...projects];
                newProjects[projectIndex].date = e.target.value;
                setProjects(newProjects);
              }}
            />
          </div>
          <div className="space-y-3">
            <p className="font-bold mt-2">Details</p>
            {project.details.map((detail, detailIndex) => (
              <div key={detailIndex} className="mb-4 flex items-center">
                <label className="input input-bordered flex items-center flex-grow">
                  <input
                    type="text"
                    className="grow"
                    value={detail}
                    onChange={(e) =>
                      handleProjectDetailChange(projectIndex, detailIndex, e)
                    }
                  />
                </label>
                {project.details.length > 1 && detailIndex > 0 && (
                  <button
                    type="button"
                    className="btn btn-warning btn-sm rounded-full text-white font-bold ml-2"
                    onClick={() =>
                      handleRemoveProjectDetail(projectIndex, detailIndex)
                    }
                  >
                    x
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              className="btn btn-primary w-full mt-4 py-2"
              onClick={() => handleAddProjectDetail(projectIndex)}
            >
              + Add Detail
            </button>
          </div>
        </div>
      ))}
      <button
        type="button"
        className="btn btn-secondary w-full mt-4 py-2"
        onClick={() =>
          setProjects([
            ...projects,
            { name: "", skills: [], date: "", details: [""] },
          ])
        }
      >
        + Add Project
      </button>
    </div>
  );
}

