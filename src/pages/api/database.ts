import type { NextApiRequest, NextApiResponse } from 'next';

import { execQuery } from '@/utils/sql';

//* Execute a query passed in the body and return the result.
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const result = await execQuery(JSON.parse(req.body).query);
    res.status(200).json({ result });
  } catch (error) {
    console.log(
      'Encountered error when executing:',
      JSON.parse(req.body).query
    );
    console.log(error);
    res.status(500).json({ error });
  }
}
