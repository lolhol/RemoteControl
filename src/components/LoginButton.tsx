import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import s from "./LoginButton.module.css";

export default function LoginButton() {
  const { data: session } = useSession();
  if (session?.user) {
    return (
      <div className={s.root}>
        <button className={s.button} onClick={() => signOut()}>
          Sign out
        </button>

        <Link className={s.button} href="/panel">
          Control Panel
        </Link>
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
