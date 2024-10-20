// pages/submit.tsx
import { useState, ChangeEvent, FormEvent } from 'react';

interface PersonalInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  github: string;
  website: string;
}

interface Education {
  id: string;
  university: string;
  degree: string;
  graduationStartYear: number | string;
  graduationEndYear: number | string;
  gpa: string;
  location: string;
}

interface Experience {
  id: string;
  company: string;
  title: string;
  employmentDates: string;
  location: string;
  details: string[];
}

interface Project {
  id: string;
  title: string;
  technologies: string[];
  date: string;
  details: string[];
}

interface Skills {
  languages: string[];
  developerTools: string[];
  technologiesFrameworks: string[];
}

interface JobDescription {
  description: string;
}

interface FormData {
  personal: PersonalInfo;
  education: Education[];
  coursework: string[];
  experiences: Experience[];
  projects: Project[];
  skills: Skills;
  job_description: JobDescription;
}

export default function SubmitPage() {
  const [formData, setFormData] = useState<FormData>({
    personal: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      github: '',
      website: ''
    },
    education: [{
      id: '1',
      university: '',
      degree: '',
      graduationStartYear: '',
      graduationEndYear: '',
      gpa: '',
      location: ''
    }],
    coursework: [],
    experiences: [{
      id: '1',
      company: '',
      title: '',
      employmentDates: '',
      location: '',
      details: ['']
    }],
    projects: [{
      id: '1',
      title: '',
      technologies: [''],
      date: '',
      details: ['']
    }],
    skills: {
      languages: [''],
      developerTools: [''],
      technologiesFrameworks: ['']
    },
    job_description: {
      description: ''
    }
  });

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    section: keyof FormData,
    index: number,
    field: string,
    subfield?: number
  ) => {
    const value = e.target.value;
    setFormData(prev => {
      const newFormData = { ...prev };
      if (subfield !== undefined) {
        newFormData[section][index][field][subfield] = value;
      } else if (field) {
        (newFormData[section][index] as any)[field] = value;
      } else {
        (newFormData[section] as any) = value;
      }
      return newFormData;
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const response = await fetch('/api/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });
    const result = await response.json();
    console.log(result);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Personal Information</h2>
      <input
        type="text"
        placeholder="First Name"
        value={formData.personal.firstName}
        onChange={(e) => handleInputChange(e, 'personal', 0, 'firstName')}
      />
      <input
        type="text"
        placeholder="Last Name"
        value={formData.personal.lastName}
        onChange={(e) => handleInputChange(e, 'personal', 0, 'lastName')}
      />
      {/* Add other personal fields similarly */}

      <h2>Education</h2>
      {/* Repeat similar inputs for education, coursework, experiences, projects, skills, and job_description */}
      {/* Example: */}
      <input
        type="text"
        placeholder="University"
        value={formData.education[0].university}
        onChange={(e) => handleInputChange(e, 'education', 0, 'university')}
      />
      {/* Add fields for 'degree', 'graduationStartYear', 'graduationEndYear', 'gpa', and 'location' */}

      <h2>Skills</h2>
      {/* Add inputs for languages, developer tools, technologies/frameworks */}

      <h2>Job Description</h2>
      <textarea
        placeholder="Job Description"
        value={formData.job_description.description}
        onChange={(e) => handleInputChange(e, 'job_description', 0, 'description')}
      />

      <button type="submit">Submit</button>
    </form>
  );
}
