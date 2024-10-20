"use client";

export interface FormFieldsProps {
  formData: {
    // jobTitle: string;
    firstName: string;
    lastName: string;
    email: string;
    // contact: string;
    location: string;
    phone: string;
    github: string;
    website: string;
    jobDescription: string;
  };
  setFormData: React.Dispatch<
    React.SetStateAction<{
      // jobTitle: string;
      firstName: string;
      lastName: string;
      email: string;
      // contact: string;
      location: string;
      phone: string;
      github: string;
      website: string;
      jobDescription: string;
    }>
  >;
}

export default function FormFields({ formData, setFormData }: FormFieldsProps) {
  const handleChange = (field: keyof typeof formData, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  return (
    <div className="space-y-4">
      {/* <div>
        <p className="font-bold">Job Title</p>
        <input
          type="text"
          className="input input-bordered w-full"
          value={formData.jobTitle}
          onChange={(e) => handleChange("jobTitle", e.target.value)}
        />
      </div> */}
      <div>
        <p className="font-bold">Name</p>
        <div className="flex w-full">
          <input
            type="text"
            placeholder="First Name"
            className="input input-bordered flex-grow"
            value={formData.firstName}
            onChange={(e) => handleChange("firstName", e.target.value)}
          />
          <div className="divider lg:divider-horizontal"></div>
          <input
            type="text"
            placeholder="Last Name"
            className="input input-bordered flex-grow"
            value={formData.lastName}
            onChange={(e) => handleChange("lastName", e.target.value)}
          />
        </div>
      </div>
      <div>
        <p className="font-bold">Email</p>
        <input
          type="email"
          className="input input-bordered w-full"
          value={formData.email}
          onChange={(e) => handleChange("email", e.target.value)}
        />
      </div>
      {/* <div>
        <p className="font-bold">Contact</p>
        <input
          type="text"
          className="input input-bordered w-full"
          value={formData.contact}
          onChange={(e) => handleChange("contact", e.target.value)}
        />
      </div> */}
      <div>
        <p className="font-bold">Location</p>
        <input
          type="text"
          className="input input-bordered w-full"
          value={formData.location}
          onChange={(e) => handleChange("location", e.target.value)}
        />
      </div>
      <div>
        <p className="font-bold">Phone</p>
        <input
          type="text"
          className="input input-bordered w-full"
          value={formData.phone}
          onChange={(e) => handleChange("phone", e.target.value)}
        />
      </div>
      <div>
        <p className="font-bold">GitHub</p>
        <input
          type="text"
          className="input input-bordered w-full"
          value={formData.github}
          onChange={(e) => handleChange("github", e.target.value)}
        />
      </div>
      <div>
        <p className="font-bold">Website</p>
        <input
          type="text"
          className="input input-bordered w-full"
          value={formData.website}
          onChange={(e) => handleChange("website", e.target.value)}
        />
      </div>
    </div>
  );
}

