import * as fs from "fs";
import { NextApiRequest, NextApiResponse } from "next";

let session: any;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const filePath = "json/data.json";
  let contents: any = JSON.parse(fs.readFileSync(filePath, "utf8"));
  const name = String(req.query.name);

  if (!contents[name]) {
    res.status(200).json({ sucess: false });
  } else {
    contents[name] = [];
  }

  fs.writeFileSync("json/data.json", JSON.stringify(contents));

  res.status(200).json({ sucess: true });
}
