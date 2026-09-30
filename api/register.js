import { neon } from '@neondatabase/serverless';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Yalnız POST sorğuları qəbul edilir' });
  }

  const { full_name, age, email, password } = req.body;

  try {
    const sql = neon(process.env.DATABASE_URL);
    
    await sql`
      INSERT INTO users (full_name, age, email, password)
      VALUES (${full_name}, ${age}, ${email}, ${password})
    `;

    return res.status(200).json({ success: true });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
