import path from "path";
import { promises as fs } from "fs";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const name = String(req.query.name);

  const fileContents = JSON.parse(await fs.readFile("json/data.json", "utf8"));
  const finalContents = fileContents[name];
  let result = false;

  if (finalContents) {
    result = true;
  }

  res.status(200).json(result);
}
