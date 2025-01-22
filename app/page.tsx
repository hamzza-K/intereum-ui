"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const router = useRouter();
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [description, setDescription] = useState<string>("");

  const handleFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const files = Array.from(event.target.files);
      setUploadedFiles(files);
    }
  };

  return (
    <div
      className="w-full h-screen flex flex-col items-center justify-center
      bg-gradient-to-br from-neutral-800 to-neutral-950 px-4"
    >
      <h1 className="text-3xl font-bold mb-4 font-mono" style={{ color: "wheat" }}>
        INTEREUM
      </h1>

      {/* Upload Button */}
      <div className="w-full max-w-md flex flex-col items-center space-y-4">
        <label
          htmlFor="file-upload"
          className="bg-neutral-800 font-semibold py-2 px-6 w-3/4 max-w-md text-center font-mono border-b-2 border-neutral-700
          hover:border-neutral-300 transition duration-200 ease-in-out flex items-center justify-center cursor-pointer"
        >
          Upload File
          <span className="ml-2">▼</span>
        </label>
        <input
          id="file-upload"
          type="file"
          onChange={handleFileInputChange}
          multiple
          className="hidden"
        />
        {uploadedFiles.length > 0 && (
          <p className="text-gray-400 text-sm text-center">
          {uploadedFiles[0].name}
          </p>
        )}

        {/* Description Input */}
        <textarea
          placeholder="Enter description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-3/4 max-w-md bg-neutral-700 text-gray-300 placeholder-gray-500 px-4 py-2 h-20 outline-none
          focus:ring-2 focus:ring-neutral-500 resize-none text-sm"
        />

        {/* Submit Button */}
        <button
          className="bg-neutral-800 font-semibold py-2 px-6 w-3/4 max-w-md text-center font-mono border-b-2 border-neutral-700
          hover:border-neutral-300 transition duration-200 ease-in-out active:border-neutral-600"
          onClick={() => {
            console.log({ uploadedFiles, description });
            // Uncomment to navigate: router.push("/next-page");
          }}
        >
          Submit
        </button>
      </div>
      <footer className="absolute bottom-8 text-white text-sm sm:text-lg flex items-center font-mono">
        <span style={{ color: "wheat", fontFamily: "monospace", fontSize: 14 }}>
          Made with ❤ by{" "}
          <span className="cursor-pointer hover:underline">
            <a href="https://hamzza.vercel.app/">Hamzza</a>
          </span>
        </span>
      </footer>
    </div>
  );
}

