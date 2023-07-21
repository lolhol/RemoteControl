import { getSession } from "next-auth/react";
import * as fs from "fs";

export default async function handler(req: any, res: any) {
  const name = JSON.parse(req.body).currentSession.user.name;
  const filePath = "json/user-chat.json";
  let contents: any = JSON.parse(fs.readFileSync(filePath, "utf8"));

  if (contents[name]) {
    res.status(200).json({ content: contents[name] });
  } else {
    res.status(200).json({ content: null });
  }
}
