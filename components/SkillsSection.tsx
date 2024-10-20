"use client";

interface SkillsSectionProps {
  skills: string[];
  setSkills: React.Dispatch<React.SetStateAction<string[]>>;
}

export default function SkillsSection({
  skills,
  setSkills,
}: SkillsSectionProps) {
  const handleAddSkill = () => {
    setSkills([...skills, ""]);
  };

  const handleRemoveSkill = (index: number) => {
    setSkills(skills.filter((_, i) => i !== index));
  };

  const handleSkillChange = (index: number, value: string) => {
    setSkills(skills.map((skill, i) => (i === index ? value : skill)));
  };

  return (
    <div className="space-y-3">
      <div className="grid h-20 card rounded-none bg-base-300 bg-[#d8b4fe] mt-10">
        <h1 className="font-bold text-white p-2 font-mono text-2xl">Skills</h1>
      </div>
      {skills.map((skill, index) => (
        <div key={index} className="mb-4 flex items-center">
          <label className="input input-bordered flex items-center flex-grow">
            <input
              type="text"
              className="grow"
              value={skill}
              onChange={(e) => handleSkillChange(index, e.target.value)}
            />
          </label>
          {skills.length > 1 && index > 0 && (
            <button
              type="button"
              className="btn btn-error btn-sm rounded-full text-white font-bold ml-2"
              onClick={() => handleRemoveSkill(index)}
            >
              x
            </button>
          )}
        </div>
      ))}
      <button
        type="button"
        className="btn btn-secondary w-full mt-4 py-2"
        onClick={handleAddSkill}
      >
        + Add Skill
      </button>
    </div>
  );
}
