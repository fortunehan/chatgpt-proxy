import Head from "next/head";
import styles from "@/styles/Home.module.css";
import { useEffect, useState } from "react";
import ClipboardJS from "clipboard";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Home() {
  const [link, setLink] = useState("");
  const [linkSSE, setLinkSSE] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const { origin } = location;
    setLink(`${origin}/proxy`);
    setLinkSSE(`${origin}/get`);
    setLinkSSE(`${origin}/query`);
    const clipboard = new ClipboardJS("#copy");
    clipboard.on("success", notify);
    return () => clipboard.destroy();
  }, []);

  const notify = () => {
    toast("🦄️ Copied !", { autoClose: 1600 });
    setCopied(true);
  };

  return (
    <>
      <main className={styles.main}>

      </main>
    </>
  );
}
