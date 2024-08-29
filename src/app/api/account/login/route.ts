import { NextRequest, NextResponse } from 'next/server';
import { basicFetch, basicPost } from '../../fetchFunctions';
import { NextApiRequest, NextApiResponse } from 'next';

const AUTH_URL = process.env.IDENTITY_API_URL;

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const result = await basicPost<any>(`${AUTH_URL}/account/login`, body);
        

        if (result['error']) {
            return NextResponse.json(result, { status: 401 });
        }

        if (result['accessToken']) {
            const response = NextResponse.json(result, { status: 200 });
            response.headers.set('Set-Cookie', `access-token=${result['accessToken']}; Path=/; HttpOnly`);
            response.headers.set('Set-Cookie', `refresh-token=${result['refreshToken']}; Path=/; HttpOnly`);
           
            return response;
        }

        return NextResponse.json({ error: 'unexpected error' }, { status: 500 });

    } catch (error) {
        console.error('Error fetching data:', error);
        return NextResponse.json({ error: error }, { status: 500 });
    }
}

export async function GET(req: NextApiRequest) {

    if (req.method === 'GET') {
        const accessToken = req.cookies['access-token'];

        console.log('accessToken:', accessToken);

        if (!accessToken) {
            return null;
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
        return data;

      
    } else {
        return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
    }
}
