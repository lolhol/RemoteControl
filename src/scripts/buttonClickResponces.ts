import { getSession } from "next-auth/react";
import * as fs from "fs";

let pendingList: string[] = [];
let currTimer = 0;

export function timeUntilSend() {
  const secondsLeft = document.getElementById("secondsLeft");
  const resetButton = document.getElementById("reset");

  if (resetButton) {
    resetButton.style.opacity = "100%";
  }

  const counterTime = setTimeout(async function () {
    if (currTimer < 10000) {
      currTimer += 1000;

      if (secondsLeft != undefined) {
        secondsLeft.textContent = String(30 - currTimer / 1000);
      }

      timeUntilSend();
    }
  }, 1000);
}

export function jumpButtonClick() {
  console.log("Adding...");
  writeChanges("add", "JUMP");
}

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
  //alert("invoked");
  initial = setTimeout(async function () {
    console.log("DONE!");

    const contents: any = fs.readFile("./data.json", "utf8", () => {});
    console.log(contents);

    const session: any = await getSession();

    //const contents: any = readFile("json/data.json", "utf8")

    /*if (session) {
      const name = String(session.user.name);

      if (contents[name]) {
        contents[name] = pendingList;
      } else {
        alert("Ask godbrigero to whitelist u.");
        return;
      }

      writeFileSync("json/data.json", contents);
    }*/
  }, 1000);
}

/*document.body.onclick = function () {
  //alert("stopped");
  clearTimeout(initial);
  // re-invoke invocation()
};*/
