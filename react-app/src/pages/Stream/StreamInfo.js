import React from "react";
import axios from "axios";
import { Button } from "@material-ui/core";
const configStart = {
  method: "put",
  url: "https://api.cloud.wowza.com/api/v1.6/live_streams/7gr8111f/start",
  headers: {
    "wsc-api-key":
      "dUeSULaOszb0vnqj7kLQM2j6v433hfC4O1UIcGum8ZNrZgiSDhhKIznA2oOc3400",
    "wsc-access-key":
      "8ljLDHLBH5A45FQTu6L48MT8RRPl3Qo6FlR46tbJHTy6KpJ6Vhn46ozIQGKg2f15",
  },
};
const configStop = {
  method: "put",
  url: "https://api.cloud.wowza.com/api/v1.6/live_streams/7gr8111f/stop",
  headers: {
    "wsc-api-key":
      "dUeSULaOszb0vnqj7kLQM2j6v433hfC4O1UIcGum8ZNrZgiSDhhKIznA2oOc3400",
    "wsc-access-key":
      "8ljLDHLBH5A45FQTu6L48MT8RRPl3Qo6FlR46tbJHTy6KpJ6Vhn46ozIQGKg2f15",
  },
};
const optionsCreate = {
  url: "https://api.cloud.wowza.com/api/v1.6/live_streams",
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "wsc-api-key":
      "dUeSULaOszb0vnqj7kLQM2j6v433hfC4O1UIcGum8ZNrZgiSDhhKIznA2oOc3400",
    "wsc-access-key":
      "8ljLDHLBH5A45FQTu6L48MT8RRPl3Qo6FlR46tbJHTy6KpJ6Vhn46ozIQGKg2f15",
  },
  data: {
    live_stream: {
      name: "My New Live Stream2",
      transcoder_type: "transcoded",
      billing_mode: "pay_as_you_go",
      broadcast_location: "us_west_california",
      encoder: "other_rtmp",
      delivery_method: "push",
      aspect_ratio_width: 1920,
      aspect_ratio_height: 1080,
    },
  },
};
class StreamInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = { stream: {}, state: "" };
    this.startStream = this.startStream.bind(this);
    this.stopStream = this.stopStream.bind(this);
    this.createStream = this.createStream.bind(this);
  }
  getState = () => {
    axios
      .get("https://api.cloud.wowza.com/api/v1.6/live_streams/7gr8111f/state", {
        headers: {
          "wsc-api-key":
            "dUeSULaOszb0vnqj7kLQM2j6v433hfC4O1UIcGum8ZNrZgiSDhhKIznA2oOc3400",
          "wsc-access-key":
            "8ljLDHLBH5A45FQTu6L48MT8RRPl3Qo6FlR46tbJHTy6KpJ6Vhn46ozIQGKg2f15",
          "Content-Type": "application/json",
        },
      })
      .then(
        (response) => {
          this.setState({ state: response.data.live_stream.state });
          console.log(this.state.state);
        },
        (error) => {
          console.log(error);
        }
      );
  };
  componentDidMount() {
    axios
      .get("https://api.cloud.wowza.com/api/v1.6/live_streams/7gr8111f/", {
        headers: {
          "wsc-api-key":
            "dUeSULaOszb0vnqj7kLQM2j6v433hfC4O1UIcGum8ZNrZgiSDhhKIznA2oOc3400",
          "wsc-access-key":
            "8ljLDHLBH5A45FQTu6L48MT8RRPl3Qo6FlR46tbJHTy6KpJ6Vhn46ozIQGKg2f15",
          "Content-Type": "application/json",
        },
      })
      .then(
        (response) => {
          console.log(response);
          this.setState({
            stream: response.data.live_stream.source_connection_information,
          });
          this.getState();
        },
        (error) => {
          console.log(error);
        }
      );
  }
  componentWillUnmount() {
    this.setState = (state, callback) => {
      return;
    };
  }
  stopStream() {
    axios(configStop)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
    this.setState({ state: "loading" });
    setTimeout(() => {
      this.setState({ state: "stopped" });
      console.log(this.state.state);
    }, 5000);
  }
  startStream() {
    axios(configStart)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
    this.setState({ state: "loading" });
    setTimeout(() => {
      this.setState({ state: "started" });
      console.log(this.state.state);
    }, 20000);
  }
  startandStopStream() {
    if (this.state.state === "stopped") {
      return (
        <Button variant="contained" color="primary" onClick={this.startStream}>
          Start Stream
        </Button>
      );
    } else if (this.state.state === "started") {
      return (
        <Button variant="contained" color="primary" onClick={this.stopStream}>
          Stop Stream
        </Button>
      );
    } else {
      return <div>Loading...</div>;
    }
  }
  createStream() {
    axios(optionsCreate)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  render() {
    return (
      <div style={{ marginTop: "100px" }}>
        <div>Steps for OBS:</div>
        <div>Server: {this.state.stream.primary_server}</div>
        <div>Stream Key: {this.state.stream.stream_name}</div>
        <div>Check use authentication</div>
        <div>Username: {this.state.stream.username}</div>
        <div>Password: {this.state.stream.password}</div>
        {this.startandStopStream()}
      </div>
    );
  }
}
export default StreamInfo;
