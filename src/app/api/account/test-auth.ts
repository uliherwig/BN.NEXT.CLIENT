// pages/api/account/test-auth.ts
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    console.log('test-auth:', req);
  if (req.method === 'GET') {
    const accessToken = req.cookies['access-token'];

    if (!accessToken) {
      return res.status(401).json({ error: 'No access token' });
    }

    // Simulate a request to your business API
    const response = await fetch(`http://localhost:5044/Account/test-auth`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'        
      },
    });

    const data = await response.json();

    if (response.ok) {
      res.status(200).json(data);
    } else {
      res.status(response.status).json(data);
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}