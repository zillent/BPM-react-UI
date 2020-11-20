import React, { useState } from "react";

const CollapsibleTableHeader = (props) => {
  return (
    <thead>
      <tr>
        {props.fields.map((item, index) => (
          <th key={index}>{item.value}</th>
        ))}
        {props.editBtn && (<th className="table-header__btn"></th>)}
      </tr>
    </thead>
  );
};

export default CollapsibleTableHeader;
