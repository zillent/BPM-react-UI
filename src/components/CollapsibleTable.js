import React, { useState } from "react";
import CollapsibleTableHeader from "./CollapsibleTableHeader";
import CollapsibleTableBody from "./CollapsibleTableBody";

const CollapsibleTable = (props) => {
  const _this = props._this;
  const _opts = _this.context.options;
  const tableData = _this.context.binding ? _this.context.binding.get("value") : {};
  const fieldsData = _opts.fieldNames ? _opts.fieldNames.get("value") : null;
  const collapsibleFields = _opts.collapsibleFields ? _opts.collapsibleFields.get("value") : null;
  const _collapsibleFields = collapsibleFields ? collapsibleFields.items : [];
  const hiddenFields = _opts.hiddenFields ? _opts.hiddenFields.get("value") : null;
  const _hiddenFields = hiddenFields ? hiddenFields.items : [];
  const editBtn = _opts.editButton ? _opts.editButton.get("value") : "";
  const countFields = _opts.countFields ? _opts.countFields.get("value") : null;
  const _countFields = countFields ? countFields.items : [];
  const _countCheckField = _opts.countCheckField ? _opts.countCheckField.get("value") : "_";
  const expandAll = _opts.expandAll ? _opts.expandAll.get("value") : false;

  const _fields = [];
  Object.keys(tableData.items[0]).map(function (item) {
    let _value = item;
    if (fieldsData) {
      fieldsData.items.map(function (field) {
        if (item === field["name"]) {
          _value = field["value"];
        }
      });
    }
    let isHidden = false;
    _hiddenFields &&
      _hiddenFields.map(function (_item) {
        if (item === _item) {
          isHidden = true;
        }
      });
    !isHidden && _fields.push({ item: item, value: _value });
  });

  const collapsedTableData = [];
  if (collapsibleFields) {
    tableData.items.map(function (item) {
      Object.keys(item).map(function (key) {
        if (
          key === collapsibleFields.items[0] &&
          collapsedTableData.indexOf(item[key]) === -1
        ) {
          collapsedTableData.push(item[key]);
        }
      });
    });
  }

  return (
    <table className="collapsed-table">
      <CollapsibleTableHeader fields={_fields} editBtn={editBtn}></CollapsibleTableHeader>
      <CollapsibleTableBody
        collapsedTableData={collapsedTableData}
        tableData={tableData}
        fields={_fields}
        collapsibleFields={_collapsibleFields}
        countFields={_countFields}
        countCheckField={_countCheckField}
        editBtn={editBtn}
        expandAll={expandAll}
        _this={_this}
      ></CollapsibleTableBody>
    </table>
  );
};

export default CollapsibleTable;
