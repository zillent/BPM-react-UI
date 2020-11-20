import React, { useState } from "react";
import CollapsibleTableExpandableBlock from "./CollapsibleTableExpandableBlock";



const CollapsibleTableBody = (props) => {
  const collapsedTableData = props.collapsedTableData;
  const tableData = props.tableData;
  const _fields = props.fields;
  const _collapsibleFields = props.collapsibleFields;
  const _countFields = props.countFields;
  const _countCheckField = props.countCheckField;
  const _this = props._this;

  const btn_click = (el, ind) => {
    
   // console.log(typeof ind);
  //  console.log(tableData[ind]);
    if (typeof el === 'object') {
      console.log(el);
      ind = tableData.items.indexOf(el);
      console.log(ind);
      _this.context.binding.get("value").set("listAllSelectedIndices" , [ind]);
      _this.context.trigger();
    }
  };

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
            {props.editBtn && (
              <td className="table-cell__btn">
                <button
                  className="table-btn"
                  onClick={(e) => btn_click(item, index)}
                >{props.editBtn}</button>
              </td>
            )}
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
          prevLevel={[]}
          editBtn={props.editBtn}
          btn_click={btn_click}
        ></CollapsibleTableExpandableBlock>
      )}
    </tbody>
  );
};

export default CollapsibleTableBody;
