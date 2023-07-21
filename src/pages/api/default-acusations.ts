import path from "path";
import { promises as fs } from "fs";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const fileContents = JSON.parse(
    await fs.readFile("json/acusations.json", "utf8")
  );
  const finalContents = fileContents["acusations"];
  res.status(200).json(finalContents);
}
