import React from "react";

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
  const _fields = [];
  const _element = _this.context.element;
  //    var _head = _element.querySelector("thead");
  //    var _headTr = _head.appendChild(document.createElement('tr'));

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

  //    var _body = _element.querySelector("tbody");
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
  return (
    <table className="collapsed-table">
      <thead>
        <tr>
          {_fields.map((item, index) => (
            <th key={index}>{item.value}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {collapsedTableData.length == 0 &&
          tableData.items.map((item, index) => (
            <tr key={index}>
              {_fields.map((field, i) => (
                <td key={i}>
                  <span className="collapsed_table-item">
                    {item[field.item]}
                  </span>
                </td>
              ))}
            </tr>
          ))}
        {collapsedTableData.map((item, index) => (
          <tr key={index}>
            {_fields.map((field, i) => (
              <td key={i}>
                {_collapsibleFields.length > 0 &&
                  field === _collapsibleFields[0] && (
                    <span className="collapsed_row">&nbsp;&nbsp;&nbsp;</span>
                  )}
                <span className="collapsed_table-item">{item}</span>
              </td>
            ))}
          </tr>
        ))}
        <tr className="hidden_table-row"></tr>
      </tbody>
    </table>
  );
};

export default CollapsibleTable;
// --global: ProjectsDashboard
