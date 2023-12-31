import Head from "next/head";
import styles from "./page.module.css";
import VideoPlayer from "@/components/hlcPlayer/HlcPlayer";
import Script from "next/script";

export default function Home() {
  return (
    <main className={styles.main}>
      <Head>
        <Script src="https://cdn.jsdelivr.net/npm/swarmcloud-hls@0.8.8/dist/hls.min.js"></Script>
      </Head>

      <h1>Testing</h1>
      <VideoPlayer
        streamUrl={
          "https://cdn1.sportshub808.com/LiveApp/streams/cbssportsnetwork.m3u8"
        }
      />
    </main>
  );
}
