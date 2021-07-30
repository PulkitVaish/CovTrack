import React from "react";
import { Card, CardContent, Typography } from "@material-ui/core";
import "./InfoBox.css";

function InfoBox({ title, cases, total, active, isRed, ...props }) {
  console.log(title, active);
  return (
    <Card
      onClick={props.onClick}
      className={`infoBox ${active ? "infoBox--selected" : ""} ${
        isRed ? "infoBox--red" : ""
      }
      ${title === "Deaths" ? "infoBox--purple" : ""}`}
    >
      <CardContent className="infoContent">
        <Typography style={{ color: active ? "#ccc" : "#6a5d5d" }} gutterBottom>
          <strong>{title}</strong>
        </Typography>
        <h2
          className={`infoBox__cases ${!isRed ? "infoBox__cases--green" : ""}
        ${title === "Deaths" ? "infoBox__cases--purple" : ""}
        `}
        >
          {cases}
        </h2>

        <Typography className="infoBox__total">{total} Total</Typography>
      </CardContent>
    </Card>
  );
}

export default InfoBox;
