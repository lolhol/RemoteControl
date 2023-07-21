import path from "path";
import { promises as fs } from "fs";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const name = String(req.query.name);
  const fileContents = JSON.parse(await fs.readFile("json/data.json", "utf8"));
  if (fileContents[name]) {
    const finalContents = fileContents[name];
    console.log(fileContents[name]);
    res.status(200).json(finalContents);

    fileContents[name] = [];
    fs.writeFile("json/data.json", JSON.stringify(fileContents));

    //console.log(req.query.chat + "!!!");

    if (req.query.chat) {
      const chatFileContents = JSON.parse(
        await fs.readFile("json/user-chat.json", "utf8")
      );

      const chatRecieved = JSON.parse(
        decodeURIComponent(String(req.query.chat))
      );

      //console.log(chatRecieved);

      if (chatRecieved.length > 0) {
        let finalList = chatRecieved.concat(chatFileContents[name]);

        finalList = removeSpecific(finalList);

        chatFileContents[name] = finalList;
        fs.writeFile("json/user-chat.json", JSON.stringify(chatFileContents));
      }
    }
  }
}

export function removeSpecific(list: String[]) {
  if (list.length >= 60) {
    const newList = [];

    for (let i = 0; i < list.length; i++) {
      if (i <= 60) {
        newList.push(list[i]);
      } else {
        return newList;
      }
    }
  }

  return list;
}
