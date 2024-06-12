'use client'
import React from 'react';

interface FormData {
  contact: string;
  email: string;
  github: string;
  website: string;
  education: {
    institution: string;
    duration: string;
    degree: string;
    location: string;
  };
  coursework: string[];
  experience: {
    company: string;
    duration: string;
    position: string;
    location: string;
    responsibilities: string[];
  }[];
  projects: {
    name: string;
    technologies: string;
    date: string;
    details: string[];
  }[];
  skills: {
    languages: string;
    tools: string;
    technologies: string;
  };
}

interface ResumeProps {
  formData: FormData;
}

const Resume: React.FC<ResumeProps> = ({ formData }) => {
  return (
    <div className="container">
      {/* Insert the HTML template here */}
    <title>Hamza Khan - Resume</title>
<body>
    <div className="container">
        
        <div className="header">
            <h1>Hamza Khan</h1>
            <p>Karachi, Sindh, 75500</p>
            
            <p className="contact-info">
                <span>{formData.contact}</span> |
                <a href="mailto:{formData.email}">{formData.email}</a> |
                <a href="{formData.github}">{formData.github}</a> |
                <a href="{formData.website}">{formData.website}</a>
            </p>
        </div>

        
        <div className="section">
            <div className="section-title">Education</div>
            <div className="sub-section">
                <h2>
                    <span>{formData.education.institution}</span>
                    <span>{formData.education.duration}</span>
                </h2>
                <h3>
                    <span>{formData.education.degree}</span>
                    <span>{formData.education.location}</span>
                </h3>
            </div>
        </div>

        
        <div className="section">
            <div className="section-title">Relevant Coursework</div>
            <div className="sub-section">
                <ul className="relevant-coursework-list">
                    {formData.coursework.map((course) => (
                        <li>{course}</li>
                    ))}
                </ul>
            </div>
        </div>

        <div className="section">
            <div className="section-title">Experience</div>
            {formData.experience.map((exp) => (
                <div className="sub-section">
                    <h2>
                        <span>{exp.company}</span>
                        <span>{exp.duration}</span>
                    </h2>
                    <h3>
                        <span>{exp.position}</span>
                        <span>{exp.location}</span>
                    </h3>
                    <ul>
                        {exp.responsibilities.map((responsibility) => (
                            <li>{responsibility}</li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>

        <div className="section">
            <div className="section-title">Projects</div>
            {formData.projects.map((project) => (
                <div className="sub-section">
                    <div className="project-details">
                        <div className="project-name-tech">
                            <h2>{project.name}</h2>
                            <span className="skills">{project.technologies}</span>
                        </div>
                        <p>{project.date}</p>
                    </div>
                    <ul>
                        {project.details.map((detail) => (
                            <li>{detail}</li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>

        <div className="section">
            <div className="section-title">Technical Skills</div>
            <div className="sub-section">
                <p><strong>Languages:</strong> {formData.skills.languages}</p>
                <p><strong>Developer Tools:</strong> {formData.skills.tools}</p>
                <p><strong>Technologies/Frameworks:</strong> {formData.skills.technologies}</p>
            </div>
        </div>
    </div>
</body>

    </div>
  );
};

export default Resume;
