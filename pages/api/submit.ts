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

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).end("Method Not Allowed");
  }

  const form = formidable({ multiples: false });

  try {
    const { fields, files } = await new Promise<{
      fields: formidable.Fields;
      files: formidable.Files;
    }>((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) reject(err);
        else resolve({ fields, files });
      });
    });

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
      filename: uploadedFile.originalFilename || "resume.pdf",
      contentType: uploadedFile.mimetype || "application/pdf",
    });
    formData.append("job_description", description);

    const apiRes = await axios.post(process.env.PROD_API_ROUTE!, formData, {
      headers: formData.getHeaders(),
    });

    return res.status(apiRes.status).json(apiRes.data);
  } catch (error: any) {
    console.error("Error handling form submit:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
