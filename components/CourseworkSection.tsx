"use client";

interface CourseworkSectionProps {
  coursework: string[];
  setCoursework: React.Dispatch<React.SetStateAction<string[]>>;
}

export default function CourseworkSection({
  coursework,
  setCoursework,
}: CourseworkSectionProps) {
  const handleAddCourse = () => {
    setCoursework([...coursework, ""]);
  };

  const handleRemoveCourse = (index: number) => {
    setCoursework(coursework.filter((_, i) => i !== index));
  };

  const handleCourseChange = (index: number, value: string) => {
    setCoursework(
      coursework.map((course, i) => (i === index ? value : course))
    );
  };

  return (
    <div className="space-y-3">
      <div className="grid h-20 card rounded-none bg-base-300 bg-[#d8b4fe] mt-10">
        <h1 className="font-bold text-white p-2 font-mono text-2xl">
          Coursework
        </h1>
      </div>
      {coursework.map((course, index) => (
        <div key={index} className="mb-4 flex items-center">
          <label className="input input-bordered flex items-center flex-grow">
            <input
              type="text"
              className="grow"
              value={course}
              onChange={(e) => handleCourseChange(index, e.target.value)}
            />
          </label>
          {coursework.length > 1 && index > 0 && (
            <button
              type="button"
              className="btn btn-error btn-sm rounded-full text-white font-bold ml-2"
              onClick={() => handleRemoveCourse(index)}
            >
              x
            </button>
          )}
        </div>
      ))}
      <button
      type="button"
        className="btn btn-secondary w-full mt-4 py-2"
        onClick={handleAddCourse}
      >
        + Add Course
      </button>
    </div>
  );
}
