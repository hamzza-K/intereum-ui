"use client";

import { Experience, ExperienceField } from "@/utils/types";

interface ExperienceSectionProps {
  experience: Experience[];
  experienceFields: ExperienceField[];
  setExperience: React.Dispatch<React.SetStateAction<Experience[]>>;
  setExperienceFields: React.Dispatch<React.SetStateAction<ExperienceField[]>>;
}

export default function ExperienceSection({
  experience,
  experienceFields,
  setExperience,
  setExperienceFields,
}: ExperienceSectionProps) {
  const handleAddExperience = () => {
    setExperience([
      ...experience,
      { company: "", duration: "", title: "", location: "", duties: [""] },
    ]);
    const newField = {
      id: experienceFields.length + 1,
      experience: "",
      responsibilities: "",
    };
    setExperienceFields([...experienceFields, newField]);
  };

  const handleAddDuty = (index: number) => {
    const updatedExperience = [...experience];
    updatedExperience[index].duties.push("");
    setExperience(updatedExperience);
  };

  const handleRemoveExperience = (index: number) => {
    const updatedExperience = experience.filter((_, i) => i !== index);
    setExperience(updatedExperience);
  };

  const handleRemoveDuty = (experienceIndex: number, dutyIndex: number) => {
    const updatedExperience = [...experience];
    updatedExperience[experienceIndex].duties = updatedExperience[
      experienceIndex
    ].duties.filter((_, i) => i !== dutyIndex);
    setExperience(updatedExperience);
  };

  const handleExperienceChange = (
    index: number,
    field: keyof Experience,
    value: string
  ) => {
    const updatedExperience = [...experience];
    updatedExperience[index] = { ...updatedExperience[index], [field]: value };
    setExperience(updatedExperience);
  };

  const handleDutyChange = (
    experienceIndex: number,
    dutyIndex: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = event.target;
    const updatedExperience = [...experience];
    updatedExperience[experienceIndex].duties[dutyIndex] = value;
    setExperience(updatedExperience);
  };

  return (
    <div className="space-y-3">
      <div className="grid h-20 card rounded-none bg-base-300 bg-[#d8b4fe] mt-10">
        <h1 className="font-bold text-white p-2 font-mono text-2xl">
          Experience
        </h1>
      </div>
      {experience.map((exp, expIndex) => (
        <div key={expIndex} className="mb-8 relative">
          <div className="mb-4">
            <p className="font-bold">Company</p>
            <input
              type="text"
              className="input input-bordered w-full"
              value={exp.company}
              onChange={(e) =>
                handleExperienceChange(expIndex, "company", e.target.value)
              }
            />
          </div>
          <div className="mb-4">
            <p className="font-bold">Duration</p>
            <input
              type="text"
              className="input input-bordered w-full"
              value={exp.duration}
              placeholder="2019 - Present"
              onChange={(e) =>
                handleExperienceChange(expIndex, "duration", e.target.value)
              }
            />
          </div>
          <div className="mb-4">
            <p className="font-bold">Title</p>
            <input
              type="text"
              className="input input-bordered w-full"
              value={exp.title}
              onChange={(e) =>
                handleExperienceChange(expIndex, "title", e.target.value)
              }
            />
          </div>
          <div className="mb-4">
            <p className="font-bold">Location</p>
            <input
              type="text"
              className="input input-bordered w-full"
              value={exp.location}
              onChange={(e) =>
                handleExperienceChange(expIndex, "location", e.target.value)
              }
            />
          </div>
          <div className="space-y-3">
            <p className="font-bold mt-2">Duties</p>
            {exp.duties.map((duty, dutyIndex) => (
              <div key={dutyIndex} className="mb-4 flex items-center">
                <label className="input input-bordered flex items-center flex-grow">
                  <input
                    type="text"
                    className="grow"
                    value={duty}
                    onChange={(e) => handleDutyChange(expIndex, dutyIndex, e)}
                  />
                </label>
                {exp.duties.length > 1 && dutyIndex > 0 && (
                  <button
                    type="button"
                    className="btn btn-error btn-sm rounded text-white font-bold ml-2"
                    onClick={() => handleRemoveDuty(expIndex, dutyIndex)}
                  >
                    x
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              className="btn btn-primary w-full mt-4 py-2"
              onClick={() => handleAddDuty(expIndex)}
            >
              + Add Duty
            </button>
          </div>
          {experience.length > 1 && (
            <div className="pt-4">
              <button
                type="button"
                className="btn btn-error w-full rounded-lg text-white font-bold"
                onClick={() => handleRemoveExperience(expIndex)}
              >
                Remove Experience
              </button>
            </div>
          )}
        </div>
      ))}
      <button
        type="button"
        className="btn btn-secondary w-full mt-4 py-2"
        onClick={handleAddExperience}
      >
        + Add Experience
      </button>
    </div>
  );
}

