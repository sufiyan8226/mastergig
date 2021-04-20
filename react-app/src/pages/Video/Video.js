import React from "react";

import VideoPlayer from "./VideoPlayer";
import video2 from "./Sample_Video.mp4";
import video3 from "../../assets/Sample_Video.mp4";
import video6 from "./Sample_Video.mp4";
export default class Video extends React.Component {
  constructor(props) {
    super(props);
    this.state = { video4: "../assets/Sample_Video.mp4" };
  }
  render() {
    const videoJsOptions = {
      autoplay: true,
      controls: true,
      width: 720,
      sources: [
        {
          src: video6,
          type: "video/mp4",
        },
      ],
    };
    return (
      <div style={{ marginTop: "50px" }}>
        <VideoPlayer {...videoJsOptions} />
      </div>
    );
  }
}

/* import { Form } from '@themesberg/react-bootstrap';
import React from "react";


export default () => {
    return (
        <>
        <Form>
            <Form.Control type="file" />
        </Form>
       
        </>        
);
} */
