import Head from "next/head";
import { useRouter } from "next/router";
import { Inter } from "next/font/google";
import s from "../styles/panelStyle.module.css";
import LoginButton from "@/components/LoginButton";
import {
  jumpButtonClick,
  timeUntilSend,
} from "../scripts/buttonClickResponces";
import { getSession } from "next-auth/react";
import { SetStateAction, useEffect, useState } from "react";
import { redirect } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });
let canCheck = true;

export default function Panel() {
  const router = useRouter();

  async function updateClientList() {
    if (canCheck) {
      const session = await getSession();

      console.log(session);

      if (session?.user?.name !== undefined) {
        canCheck = true;

        const data = {
          currentSession: session,
        };

        const responseFromCall = await fetch("/api/get-user-chat", {
          method: "POST",
          body: JSON.stringify(data),
        });

        const jsonResponce = await responseFromCall.json();

        handleRecieveList(jsonResponce.content);
      } else {
        router.push("/ ");
        canCheck = false;
        alert(
          "Thats a bit suspect... You appear to not be in the list of verified players... 🤨. Please leave."
        );
      }
    }
  }

  let initial: any;

  function loopCall() {
    updateClientList();
    initial = setTimeout(async () => {
      if (canCheck == true) {
        loopCall();
      }
    }, 5000);
  }

  const [queue, setQueue] = useState<string[]>([]);
  let [say, sayQueue] = useState<string[]>([]);
  const [content, setContent] = useState("");
  let [chat, chatQueue] = useState<string[]>([]);

  function handleClick(actionType: string) {
    setQueue([...queue, actionType]);
  }

  function handleSayClick(actionType: string) {
    sayQueue([actionType]);
  }

  function handleRecieveList(newList: string[]) {
    chatQueue([...newList]);
  }

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    sayQueue([]);

    //console.log(JSON.stringify(SAY));

    handleClick("SAY_" + content.toLowerCase());

    //console.log(content);
    setContent("");
  };

  const handleChange = (e: { target: { value: SetStateAction<string> } }) => {
    setContent(e.target.value);
  };

  useEffect(() => {
    canCheck = true;
    loopCall();
  }, []);

  return (
    <>
      <Head>
        <title>Control Panel</title>
      </Head>
      <main>
        <div className={`${s.main} ${inter.className}`}>
          <button className={s.jumpButton} onClick={() => handleClick("JUMP")}>
            Jump
          </button>
          //
          <button
            className={s.jumpButton}
            onClick={() => handleClick("FORWARD")}
          >
            Forward
          </button>
          //
          <button className={s.jumpButton} onClick={() => handleClick("BACK")}>
            Back
          </button>
          //
          <button className={s.jumpButton} onClick={() => handleClick("PAUSE")}>
            Pause
          </button>
          //
          <button className={s.jumpButton} onClick={() => handleClick("RETP")}>
            Re-tp
          </button>
          //
          <button
            className={s.jumpButton}
            onClick={() => handleClick("RESTART")}
          >
            Restart
          </button>
          //
          <button
            className={s.jumpButton}
            onClick={() => handleSayClick("SAY")}
          >
            Say
          </button>
          <div>
            {say.length > 0 ? (
              <form className={s.inputForm} onSubmit={handleSubmit}>
                <input value={content} onChange={handleChange} />
                <button type="submit">Proceed</button>
              </form>
            ) : null}
          </div>
          //
          <button className={s.jumpButton} onClick={() => handleClick("STOP")}>
            Stop
          </button>
          //
          <button
            className={s.jumpButton}
            onClick={() => handleClick("THROWR")}
          >
            Throw-Rod
          </button>
          //
          <div className={s.currentOperations}>
            <div className={s.currentOperationsRow}>
              <div className={s.currentOperationsButtons}>
                {queue.length > 0 ? (
                  <button className={s.reset} onClick={() => setQueue([])}>
                    Reset
                  </button>
                ) : null}
                {queue.length > 0 ? (
                  <button
                    className={s.reset}
                    onClick={() => {
                      setQueue([]);
                      handleExecute(queue);
                    }}
                  >
                    Execute
                  </button>
                ) : null}
              </div>
              <div className={s.currentOperationsRight}>
                <div className={s.queueTitle}>scheduled operations</div>
                <div className={s.queue}>
                  {queue.map((actionType, i) => (
                    <div key={i} className={s.actionType}>
                      {actionType}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={`${s.main} ${inter.className}`}>
          <div className={s.chatTitle}>Here you will see in-game chat.</div>

          <div className={s.mainChatCompound}>
            <div>
              {chat.map((curChat, i) => (
                <div key={i} className={s.currChat}>
                  {" "}
                  {curChat}{" "}
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

const handleExecute = async (macroActions: string[]) => {
  // Send a request to the server when the button is clicked

  const data = {
    actions: macroActions,
    currentSession: await getSession(),
  };

  const responseFromCall = await fetch("/api/handleClick", {
    method: "POST",
    body: JSON.stringify(data),
  });

  const jsonResponce = await responseFromCall.json();

  if (jsonResponce.sucess == false) {
    alert(
      "Thats a bit suspect... You appear to not be in the list of verified players... 🤨"
    );
  }
};
