import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPaperclip,

} from "@fortawesome/free-solid-svg-icons";
import { TextField, Button } from "@material-ui/core";
class UploadVideo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFile: null,
      title: "",
      description: "",
      thumbnail: null,
    };
  }
  onChangeTitle = (e) => {
    this.setState({ title: e.target.value });
  };
  onChangeDescription = (e) => {
    this.setState({ description: e.target.value });
  };
  onUpload = (e) => {
    const file = e.target.files[0];
    this.setState({ selectedFile: e.target.files[0] });
  };
  onUploadImage = (e) => {
    console.log(e.target.files[0]);
    this.setState({ thumbnail: e.target.files[0] });
  };
  showVideoName = () => {
    if (this.state.selectedFile != null) {
      return <>{this.state.selectedFile.name}</>;
    }
  };
  showThumbnailName = () => {
    if (this.state.thumbnail != null) {
      return <>{this.state.thumbnail}</>;
    }
  };
  showForm = () => {
    if (this.state.selectedFile != null) {
      return (
        <div>
          <TextField id="standard-basic" label="Title" fullWidth />
          <br />
          <TextField
            id="standard-basic"
            label="Description"
            rows="5"
            multiline="true"
            fullWidth
          />
          <input
            type="file"
            name="file"
            accept="image/*"
            onChange={this.onUpload}
            className="m-1"
          />
          <div className="d-md-block text-start">
            <div className="fw-normal text-dark mb-1">Choose Thumbnail</div>
            {this.showThumbnailName()}
          </div>
          <Button variant="contained" color="primary">
            Upload
          </Button>
        </div>
      );
    }
  };
  async readFile(file) {
    return new Promise((resolve, reject) => {
      const fr = new FileReader();
      fr.onerror = reject;
      fr.readAsDataURL(file);
      fr.onload = function () {
        const base64 = fr.result;
        console.log(base64);
        resolve(base64);
      };
    });
  }
  async transformBase64(inputFile) {
    return new Promise((resolve, reject) => {
      var fileReader = new FileReader();

      // If error occurs, reject the promise
      fileReader.onerror = () => {
        reject("Err");
      };

      // Define an onload handler that's called when file loaded
      fileReader.onload = () => {
        // File data loaded, so proceed to call setState
        if (fileReader.result != undefined) {
          resolve(fileReader.readAsDataURL(inputFile));
        } else {
          reject("Err");
        }
      };

      console.log(fileReader.readAsDataURL(inputFile));
    });
  }
  handleSubmit = async () => {
    const reader = new FileReader();
    const reader2 = new FileReader();
    const temp = { ...this.state };
    const fileVideo = temp.selectedFile;
    const fileThumbnail = temp.thumbnail;
    var videoDone = false;
    var thumbnailDone = false;
    const video64 = await this.transformBase64(fileVideo).then(
      (result, reject) => {
        console.log(result);
      }
    );
    const video642 = await URL.createObjectURL(fileVideo);
    const thumbnail64 = await this.transformBase64(fileThumbnail).then(
      (result) => {
        console.log(result);
      }
    );
    const thumbnail642 = await URL.createObjectURL(fileVideo);
    console.log(video642);
    console.log(thumbnail642);
    const data = {
      video: video642,
      title: this.state.title,
      description: this.state.description,
      thumbnail: thumbnail642,
    };
    /*   uploadVideo(data)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      }); */
  };
  render() {
    return (
      <form noValidate autoComplete="off">
        <h5 className="mb-4">Upload your video</h5>
        <div className="d-xl-flex align-items-center">
          <div className="file-field">
            <div className="d-flex justify-content-xl-center ms-xl-3">
              <div className="d-flex">
                <span className="icon icon-md">
                  <FontAwesomeIcon icon={faPaperclip} className="me-3" />
                </span>
                <input
                  type="file"
                  name="file"
                  accept="video/*"
                  onChange={this.onUpload}
                  className="m-1"
                />
                <div className="d-md-block text-start">
                  <div className="fw-normal text-dark mb-1">Choose Video</div>
                  {this.showVideoName()}
                </div>
              </div>
            </div>
          </div>
        </div>
        {this.showForm()}
      </form>
    );
  }
}

export default UploadVideo;
