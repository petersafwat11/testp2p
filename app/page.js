import Image from "next/image";
import styles from "./page.module.css";
import VideoPlayer from "@/components/hlcPlayer/HlcPlayer";

export default function Home() {
  return (
    <main className={styles.main}>
      <h1>Testing</h1>
      <VideoPlayer
        streamUrl={
          "https://cdn1.sportshub808.com/LiveApp/streams/cbssportsnetwork.m3u8"
        }
      />
    </main>
  );
}
