import React from "react";
import ReactDOM from "react-dom";

const Dashboard = (props) {
    var tableData = this.context.binding ? this.context.binding.get("value") : {};
    var fieldsData = this.context.options.fieldNames ? this.context.options.fieldNames.get("value") : {};
    var collapsibleFields = this.context.options.collapsibleFields ? this.context.options.collapsibleFields.get("value") : {};
    var editBtn = this.context.options.editButton ? this.context.options.editButton.get("value") : "";
    var _fields = [];
    var _element = this.context.element;
    var _this = this;
//    var _head = _element.querySelector("thead");
//    var _headTr = _head.appendChild(document.createElement('tr'));
    
    Object.keys(tableData.items[0]).map(function(item, index) {
      var _th = _headTr.appendChild(document.createElement('th'));
      var _thContent = item;
      fieldsData.items.map(function(field,index) {
        if (item === field["name"]) {
          _thContent = field["value"];
        }
      });
      _th.textContent = _thContent;
      _fields.push(item);
    });
    if (editBtn) {
      _headTr.appendChild(document.createElement('th'));
    }
    
    var _body = _element.querySelector("tbody");
    var collapsedTableData = [];
    tableData.items.map(function(item,index) {
      var _item = item; 
      Object.keys(_item).map(function(key) {
        if (key === collapsibleFields.items[0] && 
            collapsedTableData.indexOf(_item[key]) === -1) {
          collapsedTableData.push(_item[key]);
        }
      })
    })
    
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
    
    return (
        <table>
        <thead>
        {{}}
        </thead>
        </table>
    );
}

const ProjectsDashboard = (domContainer, bpmext) => {
    ReactDOM.render(<Dashboard bpmext={bpmext}/>, domContainer)
};

export default ProjectsDashboard;
// --global: ProjectsDashboard
