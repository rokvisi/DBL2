import type { NextApiRequest, NextApiResponse } from "next";
import pool from "@/lib/sql";

//* Execute a query passed in the body and return the result.
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const result = await new Promise((resolve, reject) => {
      pool.query(JSON.parse(req.body).query, function parseResult(err, results) {
        if (err) reject(err);
        else resolve(results);
      });
    });

    res.status(200).json({ result });
  } catch (error) {
    res.status(500).json({ error });
  }
}
