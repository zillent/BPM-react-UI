import React, { useState } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";

const styledContainer = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr 1fr;
  grid-template-columns: 1fr;
`;

const ErrorsDashboard = (props) => {
  const [project, setProject] = useState(0);
  const [snapshot, setSnapshot] = useState(0);
  const BPM_CV_context = props._this.context;
  const binding = BPM_CV_context.binding
    ? BPM_CV_context.binding.get("value")
    : [];
  console.log(binding);
  return (
    <styledContainer>
      <header>
        <div>{project}</div>
        <div>{snapshot}</div>
      </header>
      <section>
        <table border="1">
          {binding.items.map((element, i) => (
            <tr key={i}>
              <td>{element["Error_message"]}</td>
              <td>{element["source_name"]}</td>
            </tr>
          ))}
        </table>
      </section>
      <footer></footer>
    </styledContainer>
  );
};

const ErrorsDashboardEP = (domContainer, bpmext, _this) => {
  ReactDOM.render(
    <ErrorsDashboard bpmext={bpmext} _this={_this} />,
    domContainer
  );
};

export default ErrorsDashboardEP;
