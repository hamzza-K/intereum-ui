// pages/api/submit.ts
import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const data = req.body;
    res.status(200).json({ success: true, data });
  } else {
    res.status(405).json({ message: 'Only POST requests are allowed' });
  }
}
