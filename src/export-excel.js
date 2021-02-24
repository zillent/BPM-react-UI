import React from "react";
import ReactDOM from "react-dom";
import Export2Excel from "./components/Export2Excel";

const ExportExcel = (domContainer, bpmext, _this) => {
//  const bpmext = { bpmext };
//  const _this = { _this };
  const dataObj = _this.context.binding
    ? _this.context.binding.get("value")
    : null;
  const _fileName = _this.context.options.fileName
    ? _this.context.options.fileName.get("value")
    : null;
  const fieldsData = _this.context.options.fieldNames
    ? _this.context.options.fieldNames.get("value")
    : null;
  const hiddenFields = _this.context.options.hiddenFields
    ? _this.context.options.hiddenFields.get("value")
    : null;
  const _hiddenFields = hiddenFields ? hiddenFields.items : [];

  const _data = [];
  dataObj.items.map(function (_item) {
    let _dataItem = {};
    Object.keys(_item).map(function (field) {
      let newField = field;
      if (fieldsData) {
        fieldsData.items.map(function (_field) {
          if (field === _field["name"]) {
            newField = _field["value"];
          }
        });
      }
      let isHidden = false;
      _hiddenFields &&
        _hiddenFields.map(function (_hField) {
          if (field === _hField) {
            isHidden = true;
          }
        });
      !isHidden && (_dataItem[newField] = _item[field]);
    });
    _data.push(_dataItem);
  });

  if (_data && _fileName) {
    ReactDOM.render(
      <Export2Excel dataArray={_data} fileName={_fileName} />,
      domContainer
    );
  }
};

export default ExportExcel;
