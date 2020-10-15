import React from "react";
import ReactDOM from "react-dom";
import CollapsibleTable from "./components/CollapsibleTable";

const CollapsibleTableEP = (domContainer, bpmext, _this) => {
  ReactDOM.render(<CollapsibleTable bpmext={bpmext} _this={_this} />, domContainer);
};

export default CollapsibleTableEP;
// --global: ProjectsDashboard
