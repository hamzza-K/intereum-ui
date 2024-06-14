'use client'
import { useState, ChangeEvent } from 'react';

interface Field {
  id: number;
  value: string;
}

export default function Home() {
  const [name, setName] = useState<string>('');
  const [jobTitle, setJobTitle] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [contact, setContact] = useState<string>('');
  const [experienceFields, setExperienceFields] = useState<Field[]>([{ id: 1, value: '' }]);
  const [responsibilities, setResponsibilities] = useState<string>('');
  const [projectFields, setProjectFields] = useState<Field[]>([{ id: 1, value: '' }]);
  const [achievements, setAchievements] = useState<string>('');
  const [skillFields, setSkillFields] = useState<Field[]>([{ id: 1, value: '' }]);

  const handleAddExperience = () => {
    const newField = { id: experienceFields.length + 1, value: '' };
    setExperienceFields([...experienceFields, newField]);
  };

  const handleAddProject = () => {
    const newField = { id: projectFields.length + 1, value: '' };
    setProjectFields([...projectFields, newField]);
  };

  const handleAddSkill = () => {
    const newField = { id: skillFields.length + 1, value: '' };
    setSkillFields([...skillFields, newField]);
  };

  const handleRemoveExperience = (id: number) => {
    setExperienceFields(experienceFields.filter(field => field.id !== id));
  };

  const handleRemoveProject = (id: number) => {
    setProjectFields(projectFields.filter(field => field.id !== id));
  };

  const handleRemoveSkill = (id: number) => {
    setSkillFields(skillFields.filter(field => field.id !== id));
  };

  const handleExperienceChange = (id: number, event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setExperienceFields(experienceFields.map(field => (field.id === id ? { ...field, value } : field)));
  };

  const handleProjectChange = (id: number, event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setProjectFields(projectFields.map(field => (field.id === id ? { ...field, value } : field)));
  };

  const handleSkillChange = (id: number, event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSkillFields(skillFields.map(field => (field.id === id ? { ...field, value } : field)));
  };

  const handleSave = () => {
    const formData = {
      name,
      jobTitle,
      email,
      contact,
      experiences: experienceFields.map(field => field.value),
      responsibilities,
      projects: projectFields.map(field => field.value),
      achievements,
      skills: skillFields.map(field => field.value),
    };

    console.log('Form Data:', formData);
    // You can send this data to a server or save it to localStorage here.
  };

  return (
    <div className="p-4 sm:p-10 flex justify-center items-center min-h-screen">
      <div className="w-full max-w-lg">
        <div className="mt-10 space-y-3">
          <p className="font-bold">Job Title</p>
          <label className="input input-bordered flex items-center gap-2">
            <input
              type="text"
              className="grow"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
            />
          </label>
          <p className="font-bold">Name</p>
          <label className="input input-bordered flex items-center gap-2">
            <input
              type="text"
              className="grow"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          <p className="font-bold">Email</p>
          <label className="input input-bordered flex items-center gap-2">
            <input
              type="text"
              className="grow"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <p className="font-bold">Contact</p>
          <label className="input input-bordered flex items-center gap-2">
            <input
              type="text"
              className="grow"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
            />
          </label>
        </div>


        <div className="space-y-3">
          <div className='grid h-20 card rounded-none bg-base-300 bg-[#d8b4fe] mt-10'>
            <h1 className='font-bold text-white p-2 font-mono text-2xl'>
            Experience
            </h1></div>
          {experienceFields.map((field, index) => (
            <div key={field.id} className="mb-4 flex items-center">
              <label className="input input-bordered flex items-center flex-grow">
                <input
                  type="text"
                  className="grow"
                  value={field.value}
                  onChange={(e) => handleExperienceChange(field.id, e)}
                />
              </label>
              {experienceFields.length > 1 && index > 0 && (
                <button
                  className="btn btn-warning btn-sm rounded-full text-white font-bold ml-2"
                  onClick={() => handleRemoveExperience(field.id)}
                >
                  x
                </button>
              )}
            </div>
          ))}
          <p className="font-bold">Responsibilities</p>
          <textarea
            className="textarea textarea-bordered textarea-lg w-full mt-4"
            value={responsibilities}
            onChange={(e) => setResponsibilities(e.target.value)}
          ></textarea>
          <button className="btn btn-primary w-full mt-4 py-2" onClick={handleAddExperience}>
            + Add Experience
          </button>
        </div>

        <div className="space-y-3">
          <div className='grid h-20 card rounded-none bg-base-300 bg-[#d8b4fe] mt-10'>
            <h1 className='font-bold text-white p-2 font-mono text-2xl'>
            Projects
            </h1></div>
          {projectFields.map((field, index) => (
            <div key={field.id} className="mb-8 flex items-center">
              <label className="input input-bordered flex items-center flex-grow">
                <input
                  type="text"
                  className="grow"
                  value={field.value}
                  onChange={(e) => handleProjectChange(field.id, e)}
                />
              </label>
              {projectFields.length > 1 && index > 0 && (
                <button
                  className="btn btn-warning btn-sm rounded-full text-white font-bold ml-2"
                  onClick={() => handleRemoveProject(field.id)}
                >
                  x
                </button>
              )}
            </div>
          ))}
          <p className="font-bold">Achievements</p>
          <textarea
            className="textarea textarea-bordered textarea-lg w-full mt-4"
            value={achievements}
            onChange={(e) => setAchievements(e.target.value)}
          ></textarea>
          <button className="btn btn-primary w-full mt-4 py-2" onClick={handleAddProject}>
            + Add Project
          </button>
        </div>

        <div className="space-y-3">
          <div className='grid h-20 card rounded-none bg-base-300 bg-[#d8b4fe] mt-10'>
            <h1 className='font-bold text-white p-2 font-mono text-2xl'>
            Skills
            </h1></div>
          {skillFields.map((field, index) => (
            <div key={field.id} className="mb-8 flex items-center">
              <label className="input input-bordered flex items-center flex-grow">
                <input
                  type="text"
                  className="grow"
                  value={field.value}
                  onChange={(e) => handleSkillChange(field.id, e)}
                />
              </label>
              {skillFields.length > 1 && index > 0 && (
                <button
                  className="btn btn-warning btn-sm rounded-full text-white font-bold ml-2"
                  onClick={() => handleRemoveSkill(field.id)}
                >
                  x
                </button>
              )}
            </div>
          ))}
          <button className="btn btn-primary w-full mt-4 py-2" onClick={handleAddSkill}>
            + Add Skill
          </button>
        </div>
        <button className="btn btn-warning w-full mt-8" onClick={handleSave}>
          Save
        </button>
      </div>
    </div>
  );
}

