"use client";
import { useState } from "react";
import ExperienceSection from "../components/ExperienceSection";
import ProjectSection from "../components/ProjectSection";
import EducationSection from "../components/EducationSection";
import SkillsSection from "../components/SkillsSection";
import CourseworkSection from "../components/CourseworkSection";
import FormFields from "../components/FormFields";
import { Experience, ExperienceField, Project, Education } from "@/utils/types";

export default function MainForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    location: "",
    phone: "",
    github: "",
    website: "",
    jobDescription: "",
  });

  const [experience, setExperience] = useState<Experience[]>([
    { company: "", duration: "", title: "", location: "", duties: [""] },
  ]);

  const [experienceFields, setExperienceFields] = useState<ExperienceField[]>([
    { id: 1, experience: "", responsibilities: "" },
  ]);

  const [projects, setProjects] = useState<Project[]>([
    { name: "", skills: [], date: "", details: [""] },
  ]);

  const [education, setEducation] = useState<Education[]>([
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

  const [skills, setSkills] = useState([""]);
  const [coursework, setCoursework] = useState([""]);

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  const payload = {
    personal: {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      github: formData.github,
      website: formData.website,
    },
    education: education.map((edu) => ({
      id: String(Math.random()),
      university: edu.institution,
      degree: edu.degree,
      graduationStartYear: Number(edu.graduationStart),
      graduationEndYear: Number(edu.graduationEnd),
      gpa: edu.gpa,
      location: edu.location,
    })),
    coursework,
    experiences: experience.map((exp) => ({
      id: String(Math.random()),
      company: exp.company,
      title: exp.title,
      employmentDates: exp.duration,
      location: exp.location,
      details: exp.duties,
    })),
    projects: projects.map((proj) => ({
      id: String(Math.random()),
      title: proj.name,
      technologies: proj.skills,
      date: proj.date,
      details: proj.details,
    })),
    skills: {
      languages: skills,
      developerTools: [],
      technologiesFrameworks: [],
    },
    job_description: {
      description: formData.jobDescription,
    },
  };

  try {
    const response = await fetch('/api/submitForm', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error('Failed to download PDF');
    }

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'resume.pdf';
    link.click();
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Error downloading PDF:', error);
  }
};


  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-4xl rounded-lg p-8 md:p-12 lg:w-3/4">
        <form onSubmit={handleSubmit}>
          <FormFields formData={formData} setFormData={setFormData} />
          <ExperienceSection
            experience={experience}
            experienceFields={experienceFields}
            setExperience={setExperience}
            setExperienceFields={setExperienceFields}
          />
          <ProjectSection projects={projects} setProjects={setProjects} />
          <EducationSection education={education} setEducation={setEducation} />
          <SkillsSection skills={skills} setSkills={setSkills} />
          <CourseworkSection
            coursework={coursework}
            setCoursework={setCoursework}
          />
          {/* Job Description Field */}
          <div className="my-4">
            <label className="block text-sm font-medium text-gray-700">
              Job Description
            </label>
            <textarea
              value={formData.jobDescription}
              onChange={(e) =>
                setFormData({ ...formData, jobDescription: e.target.value })
              }
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              placeholder="Enter job description"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-3 rounded-lg mt-4 hover:bg-blue-600"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

