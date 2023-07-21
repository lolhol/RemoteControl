import { useSession, signIn, signOut } from "next-auth/react";
import s from "./LoginButton.module.css";

export default function LoginButton() {
  const { data: session } = useSession();
  if (session?.user) {
    return (
      <div className={s.root}>
        <button className={s.button} onClick={() => signOut()}>
          Sign out
        </button>

        <a className={s.button} href="/panel">
          Control Panel
        </a>
      </div>
    );
  }
  return (
    <div className={s.root}>
      <button
        className={s.button}
        onClick={() => signIn(undefined, { callbackUrl: "/panel" })}
      >
        Name
      </button>
    </div>
  );
}
