"use client";
import React, { useEffect, useRef } from "react";
var Hls = require('swarmcloud-hls/dist/hls.min');
// or P2pEngineHls
var P2pEngineHls = require('swarmcloud-hls/dist/p2p-engine.min');


const VideoPlayer = ({ streamUrl }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    const p2pConfig = {
      logLevel: "debug",
      live: false,
      swFile: "./sw.js",
    };

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
      } else if (
        videoRef.current.canPlayType("application/vnd.apple.mpegurl")
      ) {
        P2PEngineHls.tryRegisterServiceWorker(p2pConfig).then(() => {
          videoRef.current.src = streamUrl;
        });
        videoRef.current.addEventListener("loadedmetadata", function () {
          videoRef.current.play();
        });
      }
      const engine = new P2PEngineHls(p2pConfig);

      engine.on(
        "stats",
        function ({
          totalHTTPDownloaded = 0,
          totalP2PDownloaded = 0,
          totalP2PUploaded = 0,
        }) {
          const total = totalHTTPDownloaded + totalP2PDownloaded;
          document.querySelector("#info").innerText = `p2p ratio: ${Math.round(
            (totalP2PDownloaded / total) * 100
          )}%, saved traffic: ${totalP2PDownloaded}KB`;
        }
      );

      engine.on("FRAG_LOADED", function ({ url, loaded, byP2p }) {
        const source = byP2p ? "P2P" : "HTTP";
        addToTable(url, loaded, source);
      });
    };

    initializePlayer();

    return () => {
      // Cleanup logic if needed
    };
  }, [streamUrl]);

  const addToTable = (url, downloaded, source) => {
    const infoStr = `download ${url}(size:${downloaded}B) by ${source}`;
    document.querySelector(
      "#table-body tbody"
    ).innerHTML += `<tr style="text-align: center">
                    <td>${infoStr}</td>
                </tr>`;
  };

  return (
    <div>
      <video id="video" controls ref={videoRef}></video>
      <p id="version">{`hls.js version: ${Hls.version}  p2p version: ${P2PEngineHls.version}`}</p>
      <h3>download info:</h3>
      <p id="info"></p>
      <table id="table-body">
        <tbody></tbody>
      </table>
    </div>
  );
};

export default VideoPlayer;
