import React from "react";

import "./Table.css";

function Table({ countries }) {
  return (
    <div className="table">
      {countries.map((country, i) => (
        <tr key={i}>
          <td>{country.country}</td>
          <td>
            <strong>{country.cases.toLocaleString("en-IN")}</strong>
          </td>
        </tr>
      ))}
    </div>
  );
}

export default Table;
