import React from "react";
//import ChatBot from "react-simple-chatbot";
import VideoPlayer from "../Video/VideoPlayer";
//dummy data
/* const steps = [
  {
    id: "0",
    message: "Welcome to react chatbot!",
    trigger: "1",
  },
  {
    id: "1",
    message: "Bye!",
    end: true,
  },
]; */

export default () => {
  const videoJsOptions = {
    autoplay: true,
    controls: true,
    liveui: true,
    width: 720,
    sources: [
      {
        src:
          //https://d2zihajmogu5jn.cloudfront.net/bipbop-advanced/bipbop_16x9_variant.m3u8
          //
          "https://cdn3.wowza.com/1/cmZ5MHlWMzVVNGRz/c3YxU1Zr/hls/live/playlist.m3u8",
        type: "application/x-mpegURL",
      },
    ],
  };
  return (
    <>
      <div style={{ marginTop: "50px" }}>
        <VideoPlayer {...videoJsOptions} />
        {/*   <ChatBot steps={steps} /> */}
      </div>
    </>
  );
};
