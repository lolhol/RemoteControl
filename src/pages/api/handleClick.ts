import { getSession } from "next-auth/react";
import * as fs from "fs";

let session: any;

export default async function handler(req: any, res: any) {
  const reqJson = JSON.parse(req.body);

  const reqSession = reqJson.currentSession;
  session = reqSession;

  if (req.method === "POST") {
    const filePath = "json/data.json";
    let contents: any = JSON.parse(fs.readFileSync(filePath, "utf8"));
    if (session) {
      const name = String(session.user.name);

      if (contents[name]) {
        console.log("written in " + name);
        contents[name] = reqJson.actions;
        console.log(req.actions);
      } else {
        res.status(200).json({ sucess: false });
      }

      fs.writeFileSync("json/data.json", JSON.stringify(contents));

      res.status(200).json({ sucess: true });
    }
  }
}

let pendingList: string[] = [];
let counter: number = 0;

export function writeChanges(action: string, macroAction: string) {
  if (pendingList.length == 0) {
    pendingList.push(macroAction);
  } else {
    if (action == "remove") {
      pendingList = [];
    } else {
      pendingList.push(macroAction);
    }
  }

  if (pendingList.length == 0) {
    clearTimeout(initial);
  } else {
    console.log("Starting counter...");
    clearTimeout(initial);
    invocation();
  }
}

let initial: any;

async function invocation() {
  initial = setTimeout(async function () {
    const filePath = "json/data.json";
    let contents: any = JSON.parse(fs.readFileSync(filePath, "utf8"));

    //const contents: any = readFile("json/data.json", "utf8")

    //const name = String(session.user.name);

    //const contents: any = readFile("json/data.json", "utf8")

    //console.log(session);

    if (session) {
      const name = String(session.user.name);

      if (contents[name]) {
        console.log("written in " + name);
        contents[name] = pendingList;
      } else {
        alert("Ask godbrigero to whitelist u.");
        return;
      }

      fs.writeFileSync("json/data.json", JSON.stringify(contents));
    }
  }, 1000);
}

/*document.body.onclick = function () {
  //alert("stopped");
  clearTimeout(initial);
  // re-invoke invocation()
};*/
