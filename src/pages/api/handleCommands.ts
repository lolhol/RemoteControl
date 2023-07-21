import path from "path";
import { promises as fs } from "fs";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const name = String(req.query.name);
  const fileContents = JSON.parse(await fs.readFile("json/data.json", "utf8"));
  console.log(fileContents[name]);
  res.status(200).json({ message: "Welcome to API Routes!" });

  /*switch (requestMethod) {
    case "POST":
      res
        .status(200)
        .json({ message: `You submitted the following data: ${body}` });

    // handle other HTTP methods
    default:
      res.status(200).json({ message: "Welcome to API Routes!" });
  }*/
}

export async function readFile() {
  return JSON.parse(await fs.readFile("json/data.json", "utf8"));
}
