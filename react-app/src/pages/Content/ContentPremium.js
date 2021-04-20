import React from "react";
import Card from "@material-ui/core/Card";
/* import { Card } from "material-ui/Card";
import { CardMedia } from "material-ui/Card"; */
import { Link } from "react-router-dom";
import cat from "../../assets/img/cat.jpg";
const styleBlur = {
  filter: "blur(2px)",
  pointerEvents: "none",
  userSelect: "none",
};
const style = {
  marginTop: 50,
  paddingBottom: 50,
  paddingTop: 25,
  width: "100%",
  textAlign: "center",
  display: "inline-block",
  alignItems: "center",
};

const pushForward = {
  zIndex: 2,
  backgroundColor: "rgba(0,0,0, 0.4)",
  position: "relative",
  top: "50%",
  color: "white",
  left: "25%",
  transform: " translate(0, -200%)",
  padding: "20px",
  width: "50%",
  textAlign: "center",
  border: "",
};

class ContentPremium extends React.Component {
  // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.addBorder = this.addBorder.bind(this);
  }
  addBorder() {}
  render() {
    return (
      <div className="col-md-8">
        <Link to="/dashboard/overview">
          <Card style={style}>
            <div style={styleBlur}>
              <img src={cat} alt="cat" />
              <div>Lorem Ipsum</div>
            </div>
            <div style={pushForward}>Subscribe to view</div>
          </Card>
        </Link>
      </div>
    );
  }
}

export default ContentPremium;
