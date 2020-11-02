import React, { useState } from "react";
import CollapsibleTableHeader from "./CollapsibleTableHeader";
import CollapsibleTableBody from "./CollapsibleTableBody";

const CollapsibleTable = (props) => {
  const _this = props._this;
  const tableData = _this.context.binding
    ? _this.context.binding.get("value")
    : {};
  const fieldsData = _this.context.options.fieldNames
    ? _this.context.options.fieldNames.get("value")
    : null;
  const collapsibleFields = _this.context.options.collapsibleFields
    ? _this.context.options.collapsibleFields.get("value")
    : null;
  const _collapsibleFields = collapsibleFields ? collapsibleFields.items : [];
  const editBtn = _this.context.options.editButton
    ? _this.context.options.editButton.get("value")
    : "";
  const countFields = _this.context.options.countFields ? _this.context.options.countFields.get("value") : null;
  const _countFields = countFields ? countFields.items : [];
  const _countCheckField = _this.context.options.countCheckField ? _this.context.options.countCheckField.get("value") : '_';
  const _element = _this.context.element;

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
    _fields.push({ item: item, value: _value });
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
      <CollapsibleTableHeader fields={_fields}></CollapsibleTableHeader>
      <CollapsibleTableBody
        collapsedTableData={collapsedTableData}
        tableData={tableData}
        fields={_fields}
        collapsibleFields={_collapsibleFields}
        countFields={_countFields}
        countCheckField={_countCheckField}
      ></CollapsibleTableBody>
    </table>
  );
};

export default CollapsibleTable;
// --global: ProjectsDashboard

/*
    collapsedTableData.map(function(item, index) {
      var _tr = _body.appendChild(document.createElement('tr'));
      _fields.map(function(field, i) { 
        var _td = _tr.appendChild(document.createElement('td'));
        if (field === collapsibleFields.items[0]) {
          var _vSpan = document.createElement('span')
          var _textSpan = document.createElement('span')
          _vSpan.innerHTML ='&nbsp;&nbsp;&nbsp;';
          _vSpan.classList.add('collapsed_row');
          _vSpan.onclick = function () {
            if (_vSpan.classList.contains('collapsed_row')) {
              var _tr1 = _tr;
              tableData.items.map(function (table_item, table_index) {
                if (table_item[field] === item) {
                  var _tr_new = document.createElement('tr')
                  _tr1.after(_tr_new);
                  _tr1 = _tr_new;
                  _tr1.classList.add('expanded_row');
                  Object.keys(table_item).map(function(key) {
                    if (typeof table_item[key] !== "function") {
                      var _td = _tr1.appendChild(document.createElement('td'));
                      _td.textContent = table_item[key];
                    }
                  });
                  if (editBtn) {
                    var _btn = document.createElement('button');
                    _btn.textContent = editBtn;
                    _btn.onclick = function() {
                      _this.context.binding.get("value").set("listAllSelectedIndices" , [table_index]);
                      _this.context.trigger();
                    }
                    var _btn_td = _tr1.appendChild(document.createElement('td'));
                    _btn_td.appendChild(_btn);
                  }
                }
              });
            }
            if (!_vSpan.classList.contains('collapsed_row')) {
              console.log('collapse!');
              var _tr2 = _tr.nextSibling;
              while (_tr2.classList.contains('expanded_row')) {
                _tr2.remove();
                _tr2 = _tr.nextSibling;
              }
            }
            _vSpan.classList.toggle('collapsed_row');
            _vSpan.classList.toggle('collapsed_control');
          }
          _textSpan.textContent = item;
          _textSpan.classList.add('collapsed_table-item');
          _td.appendChild(_vSpan);
          _td.appendChild(_textSpan);
        }
      });
      if (editBtn) {
        _tr.appendChild(document.createElement('td'));
      }
    });
    var _tr_end = _body.appendChild(document.createElement('tr'));
    _tr_end.classList.add('hidden_table-row');
*/
