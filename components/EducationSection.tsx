"use client";

interface Education {
  institution: string;
  degree: string;
  duration: string;
  graduationStart: string;
  graduationEnd: string;
  gpa: string;
  location: string;
}

interface EducationSectionProps {
  education: Education[];
  setEducation: React.Dispatch<React.SetStateAction<Education[]>>;
}

export default function EducationSection({
  education,
  setEducation,
}: EducationSectionProps) {
  const handleAddEducation = () => {
    setEducation([
      ...education,
      {
        institution: "",
        degree: "",
        duration: "",
        graduationStart: "",
        graduationEnd: "",
        gpa: "",
        location: "",
      },
    ]);
  };

  const handleRemoveEducation = (index: number) => {
    setEducation(education.filter((_, i) => i !== index));
  };

  const handleEducationChange = (
    index: number,
    field: keyof Education,
    value: string
  ) => {
    setEducation(
      education.map((edu, i) =>
        i === index ? { ...edu, [field]: value } : edu
      )
    );
  };

  return (
    <div className="space-y-3">
      <div className="grid h-20 card rounded-none bg-base-300 bg-[#d8b4fe] mt-10">
        <h1 className="font-bold text-white p-2 font-mono text-2xl">Education</h1>
      </div>
      {education.map((edu, index) => (
        <div key={index} className="mb-8 relative">
          {index > 0 && <div className="divider divider-error"></div>}
          <div className="mb-4">
            <p className="font-bold">Institution</p>
            <input
              type="text"
              className="input input-bordered w-full"
              value={edu.institution}
              onChange={(e) =>
                handleEducationChange(index, "institution", e.target.value)
              }
            />
          </div>
          <div className="mb-4">
            <p className="font-bold">Degree</p>
            <input
              type="text"
              className="input input-bordered w-full"
              value={edu.degree}
              onChange={(e) =>
                handleEducationChange(index, "degree", e.target.value)
              }
            />
          </div>
          <div className="mb-4">
            <p className="font-bold">Graduation</p>
            <div className="flex w-full">
              <input
                type="text"
                placeholder="Start Date"
                className="input input-bordered flex-grow"
                value={edu.graduationStart}
                onChange={(e) =>
                  handleEducationChange(index, "graduationStart", e.target.value)
                }
              />
              <div className="divider lg:divider-horizontal"></div>
              <input
                type="text"
                placeholder="End Date"
                className="input input-bordered flex-grow"
                value={edu.graduationEnd}
                onChange={(e) =>
                  handleEducationChange(index, "graduationEnd", e.target.value)
                }
              />
            </div>
          </div>
          <div className="mb-4">
            <p className="font-bold">GPA</p>
            <input
              type="text"
              className="input input-bordered w-full"
              value={edu.gpa}
              onChange={(e) =>
                handleEducationChange(index, "gpa", e.target.value)
              }
            />
          </div>
          <div className="mb-4">
            <p className="font-bold">Location</p>
            <input
              type="text"
              className="input input-bordered w-full"
              value={edu.location}
              onChange={(e) =>
                handleEducationChange(index, "location", e.target.value)
              }
            />
          </div>
          {education.length > 1 && index > 0 && (
            <div className="pt-4">
              <button
                type="button"
                className="btn btn-error w-full text-white font-bold"
                onClick={() => handleRemoveEducation(index)}
              >
                Remove Education
              </button>
            </div>
          )}
        </div>
      ))}
      <button
        className="btn btn-secondary w-full mt-4 py-2"
        onClick={handleAddEducation}
      >
        + Add Education
      </button>
    </div>
  );
}

