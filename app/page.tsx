"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import * as pdfjsLib from "pdfjs-dist";
import * as mammoth from "mammoth";

pdfjsLib.GlobalWorkerOptions.workerSrc =
  process.env.NEXT_PUBLIC_PDF_WORKER_SRC!;

export default function Home() {
  const router = useRouter();
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [description, setDescription] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFileInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files) {
      const files = Array.from(event.target.files);
      setUploadedFiles(files);
    }
  };

  const extractText = async (file: File) => {
    try {
      if (file.type === "application/pdf") {
        const arrayBuffer = await file.arrayBuffer();
        const loadingTask = pdfjsLib.getDocument(arrayBuffer);
        const pdf = await loadingTask.promise;
        let text = "";

        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const content = await page.getTextContent();
          text += content.items.map((item) => item).join(" ") + "\n";
        }
        return text;
      } else if (
        file.type ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      ) {
        const arrayBuffer = await file.arrayBuffer();
        const result = await mammoth.extractRawText({ arrayBuffer });
        return result.value;
      }
      throw new Error("Unsupported file type");
    } catch (error) {
      console.error("Error extracting text:", error);
      throw new Error("Failed to extract text from file");
    }
  };

  const handleSubmit = async () => {
    if (uploadedFiles.length === 0 || !description) {
      alert("Please upload a file and enter a description");
      return;
    }

    setIsSubmitting(true);

    try {
      // Get only the last uploaded file
      const lastFile: File | undefined = uploadedFiles[uploadedFiles.length - 1];
      // const content = await extractText(lastFile);
      // console.log("Resume Text: ", content);

      console.log("Description: ", description);

      const formData = new FormData();

      formData.append('resume_file', lastFile);
      formData.append('description', description);

      const response = await fetch("/api/submit", {
        method: "POST",
        body: formData
      });

      const data = await response.json();
      console.log("📦 Extracted Data:", data);

      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);

    } catch (error) {
      console.error("Submission error:", error);
      alert("Submission failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-gradient-to-br from-neutral-800 to-neutral-950 px-4">
      <h1
        className="text-3xl font-bold mb-4 font-mono"
        style={{ color: "wheat" }}
      >
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
          className="hidden"
          accept=".pdf,.docx"
        />
        {uploadedFiles.length > 0 && (
          <div className="text-gray-400 text-sm text-center">
            {uploadedFiles.map((file, index) => (
              <p key={index}>{file.name}</p>
            ))}
          </div>
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
          hover:border-neutral-300 transition duration-200 ease-in-out active:border-neutral-600 disabled:opacity-50"
          onClick={handleSubmit}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Processing..." : "Submit"}
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
