import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  console.log('Received Payload:', req.body);

  try {
    const processResponse = await fetch(
      'https://intereum-15483616172.us-east1.run.app/process-data/',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(req.body),
      }
    );

    if (!processResponse.ok) {
      return res
        .status(processResponse.status)
        .json({ message: 'Failed to process data' });
    }

    const processedData = await processResponse.json();

    const pdfResponse = await fetch(
      'https://intereum-15483616172.us-east1.run.app/create-pdf/',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(processedData),
      }
    );

    if (!pdfResponse.ok) {
      return res
        .status(pdfResponse.status)
        .json({ message: 'Failed to generate PDF' });
    }

    const pdfBuffer = await pdfResponse.arrayBuffer();

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=resume.pdf');
    res.status(200).send(Buffer.from(pdfBuffer));
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

