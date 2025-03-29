import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { name, email } = req.body;

        // Dummy response (You can connect this to a database)
        return res.status(200).json({ message: `User ${name} with email ${email} created successfully!` });
    }

    return res.status(405).json({ message: 'Method Not Allowed' });
}
