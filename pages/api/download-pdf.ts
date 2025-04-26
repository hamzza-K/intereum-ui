import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

// Allow large payloads if needed
export const config = {
  api: {
    bodyParser: true,
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).end("Method Not Allowed");
  }


  try {
    const fastApiRes = await axios.post(process.env.PROD_PDF_ROUTE!, req.body, {
      responseType: "arraybuffer", // 👈 This is important to handle binary data (PDF)
      headers: {
        "Content-Type": "application/json",
        Accept: "application/pdf",
      },
    });

    const contentDispositon = fastApiRes.headers["content-disposition"];
    const filenameMatch = contentDispositon?.match('/filename="(.+)"/');
    const filename = filenameMatch?.[1] || "resume.pdf";

    // Set headers to prompt browser download
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);
    res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, max-age=0");

    return res.status(200).send(fastApiRes.data);
  } catch (error: any) {
    console.error("Error downloading PDF:", error);
    return res.status(500).json({ error: "Failed to fetch PDF from backend." });
  }
}
