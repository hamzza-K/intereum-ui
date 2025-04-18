import type { NextApiRequest, NextApiResponse } from "next";
import formidable from "formidable";
import fs from "fs";
import axios from "axios";
import FormData from "form-data";

// Disable default body parser
export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).end("Method Not Allowed");
  }

  const form = formidable({ multiples: false });

  form.parse(req, async (err, fields, files) => {
    try {
      if (err) {
        console.error("Form parsing error:", err);
        return res.status(500).json({ error: "Form parsing error" });
      }

      const uploadedFile = Array.isArray(files.resume_file)
        ? files.resume_file[0]
        : files.resume_file;

      const description = Array.isArray(fields.description)
        ? fields.description[0]
        : fields.description;

      if (!uploadedFile || !description) {
        return res.status(400).json({ error: "Missing file or description" });
      }

      const formData = new FormData();
      formData.append("resume_file", fs.createReadStream(uploadedFile.filepath), {
        filename: uploadedFile.originalFilename ? uploadedFile.originalFilename : "resume.pdf",
        contentType: uploadedFile.mimetype ? uploadedFile.mimetype : "application/pdf",
      });
      formData.append("job_description", description);

      // 🔥 POST to FastAPI
      const apiRes = await axios.post(process.env.API_ROUTE!, formData, {
        headers: formData.getHeaders(),
      });

      return res.status(apiRes.status).json(apiRes.data); // ✅ Ensure we respond to client
    } catch (error: any) {
      console.error("Error forwarding to FastAPI:", error);
      return res.status(500).json({ error: "Failed to forward data to backend" });
    }
  });
}

