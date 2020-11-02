import React, { useState } from "react";
import CollapsibleTableExpandableBlock from "./CollapsibleTableExpandableBlock";

const CollapsibleTableBody = (props) => {
  const collapsedTableData = props.collapsedTableData;
  const tableData = props.tableData;
  const _fields = props.fields;
  const _collapsibleFields = props.collapsibleFields;
  const _countFields = props.countFields;
  const _countCheckField=props.countCheckField;

  return (
    <tbody>
      {collapsedTableData.length == 0 &&
        tableData.items.map((item, index) => (
          <tr key={index}>
            {_fields.map((field, i) => (
              <td key={i}>
                <span className="collapsed_table-item">{item[field.item]}</span>
              </td>
            ))}
          </tr>
        ))}

      {_collapsibleFields.length > 0 && (
        <CollapsibleTableExpandableBlock
          collapsedTableData={collapsedTableData}
          fields={_fields}
          tableData={tableData}
          collapsibleFields={_collapsibleFields}
          countFields={_countFields}
          countCheckField={_countCheckField}
          prevLevel = {[]}
        ></CollapsibleTableExpandableBlock>
      )}
    </tbody>
  );
};

export default CollapsibleTableBody;
