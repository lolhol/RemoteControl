import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import s from "../styles/Home.module.css";
import LoginButton from "@/components/LoginButton";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>Controller</title>
      </Head>
      <main className={`${s.main} ${inter.className}`}>
        <LoginButton />
      </main>
    </>
  );
}
