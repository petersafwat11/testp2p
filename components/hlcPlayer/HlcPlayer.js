"use client";
import React, { useEffect, useRef } from "react";
import Script from "next/script";
import Hls from 'swarmcloud-hls/dist/hls.min'
// var Hls = require("swarmcloud-hls/dist/hls.min");
// or P2pEngineHls
// var Hls = require("swarmcloud-hls/dist/p2p-engine.min");

const VideoPlayer = ({ streamUrl }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    const p2pConfig = {};

    const initializePlayer = () => {
      if (Hls.isSupported()) {
        const hls = new Hls({
          maxBufferSize: 0,
          maxBufferLength: 15,
          liveSyncDurationCount: 10,
        });
        p2pConfig.hlsjsInstance = hls;
        hls.loadSource(streamUrl);
        hls.attachMedia(videoRef.current);
        hls.on(Hls.Events.MANIFEST_PARSED, function (event, data) {
          videoRef.current.play();
        });
      }
      // else if (
      //   videoRef.current.canPlayType("application/vnd.apple.mpegurl")
      // ) {
      //   P2PEngineHls.tryRegisterServiceWorker(p2pConfig).then(() => {
      //     videoRef.current.src = streamUrl;
      //   });
      //   videoRef.current.addEventListener("loadedmetadata", function () {
      //     videoRef.current.play();
      //   });
      // }
      const engine = new P2PEngineHls(p2pConfig);

      // engine.on(
      //   "stats",
      //   function ({
      //     totalHTTPDownloaded = 0,
      //     totalP2PDownloaded = 0,
      //     totalP2PUploaded = 0,
      //   }) {
      //     const total = totalHTTPDownloaded + totalP2PDownloaded;
      //   }
      // );
    };

    initializePlayer();

    return () => {
      // Cleanup logic if needed
    };
  }, [streamUrl]);

  return (
    <div>
      {/* <Script src="https://cdn.jsdelivr.net/npm/swarmcloud-hls@0.8.8/dist/hls.min.js"></Script> */}
      <video id="video" controls ref={videoRef}></video>
    </div>
  );
};

export default VideoPlayer;
