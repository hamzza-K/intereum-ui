import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  message: string;
};

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method === 'POST') {
    const { formData, experience, projects, education, skills, coursework } = req.body;

    console.log('Form Data:', formData);
    console.log('Experience:', experience);
    console.log('Projects:', projects);
    console.log('Education:', education);
    console.log('Skills:', skills);
    console.log('Coursework:', coursework);

    // Send a success response
    res.status(200).json({ message: 'Data successfully received' });
  } else {
    // Handle any other HTTP method
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
