import React from "react";
import Card from "@material-ui/core/Card";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import cat from "../../assets/img/cat.jpg";

const style = {
  marginTop: 50,
  paddingBottom: 50,
  paddingTop: 25,
  width: "100%",
  textAlign: "center",
  display: "inline-block",
  alignItems: "center",
};
class ContentOwner extends React.Component {
  // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
  }
  /*  home() {
    history.push("/");
  } */
  render() {
    return (
      <div className="col-md-8">
        <Card style={style}>
          <img src={cat} alt="cat" />
          <div>Lorem Ipsum</div>
          <br />
          <Link to="/video/upload">
            <Button variant="contained" color="primary">
              Edit
            </Button>
          </Link>
        </Card>
      </div>
    );
  }
}

export default ContentOwner;
