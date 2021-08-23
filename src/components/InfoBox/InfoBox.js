import React from "react";
import { Card, CardContent, Typography } from "@material-ui/core";
import "./InfoBox.css";

function InfoBox({ title, cases, total, active, isRed, ...props }) {
  return (
    <Card
      onClick={props.onClick}
      className={`infoBox ${active ? "infoBox--selected" : ""} ${
        isRed ? "infoBox--red" : ""
      }
      ${title === "Deaths" ? "infoBox--purple" : ""}`}
    >
      <CardContent className="infoContent">
        <Typography
          style={{ color: active ? "#FFA500" : "#6a5d5d" }}
          gutterBottom
        >
          <strong>{title}</strong>
        </Typography>
        <h2
          className={`infoBox__cases ${!isRed ? "infoBox__cases--green" : ""}
        ${title === "Deaths" ? "infoBox__cases--purple" : ""}
        `}
        >
          {cases <= 1000 ? `${Math.trunc(cases)}` : `${cases}`}
        </h2>

        <Typography
          className="infoBox__total"
          style={{ color: active ? "#FFA500" : "#6a5d5d" }}
        >
          {total <= 1000 ? `${Math.trunc(total)}` : `${total}`} Total
        </Typography>
      </CardContent>
    </Card>
  );
}

export default InfoBox;
