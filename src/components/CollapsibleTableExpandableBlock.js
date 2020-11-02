import React, { useState } from "react";
import CollapsibleTableHeader from "./CollapsibleTableHeader";

const CollapsibleTableExpandableBlock = (props) => {
  //const collapsedTableData = props.collapsedTableData;
  const _fields = props.fields;
  const tableData = props.tableData;
  const _collapsibleFields = props.collapsibleFields;
  const _countFields = props.countFields;
  const _countCheckField=props.countCheckField;
  const _index = props.ind ? props.ind : 0;

  const collapsedTableData = [];
  //  console.log(_collapsibleFields);
  if (_collapsibleFields) {
    tableData.items.map(function (item) {
      Object.keys(item).map(function (key) {
        if (
          key === _collapsibleFields[_index] &&
          collapsedTableData.indexOf(item[key]) === -1
        ) {
          collapsedTableData.push(item[key]);
        }
      });
    });
  }
  //console.log(collapsedTableData);
  //console.log(props.prevLevel);

  const collapsedControl = [];
  collapsedTableData.map(function (item) {
    collapsedControl.push({ item: item, value: true });
  });

  const [collapsedItems, setCollapsedItems] = useState(collapsedControl);

  function collapseClick(item, index) {
    let newCollapsedItems = [];
    collapsedItems.map((collapsedItem) => {
      let _collapsedItem = collapsedItem;
      if (_collapsedItem.item === item) {
        _collapsedItem.value = !_collapsedItem.value;
      }
      newCollapsedItems.push(_collapsedItem);
    });
    setCollapsedItems(newCollapsedItems);
  }

  function isExpanded(item) {
    let result = false;
    collapsedItems.map((collapsedItem) => {
      if (collapsedItem.item === item) {
        result = !collapsedItem.value;
      }
    });
    return result;
  }

  function addLevel(prevLevel, value) {
    let _level = [...prevLevel];
    _level.push(value);
    return _level;
  }

  const filteredTableData = [];
  tableData.items.map((tableItem, ind) => {
    if (
      // tableItem[_collapsibleFields[_index]] === item &&
      props.prevLevel.reduce((prev, currVal, _ind) => {
        return prev && tableItem[_collapsibleFields[_ind]] === currVal;
      }, true)
    ) {
      filteredTableData.push(tableItem);
    }
  });

  return (
    <>
      <tr></tr>
      {collapsedTableData.map((item, index) => (
        <>
          <tr key={index}>
            {_fields.map((field, i) => (
              <td key={i}>
                {i === _index && field.item === _collapsibleFields[_index] && (
                  <>
                    <span
                      className={
                        isExpanded(item) ? "collapsed_control" : "collapsed_row"
                      }
                      onClick={(e) => collapseClick(item, index)}
                    >
                      &nbsp;&nbsp;&nbsp;
                    </span>
                    <span className="collapsed_table-item">{item}</span>
                  </>
                )}
                {props.countFields.map((_calc_field) => {
                  if (field.item === _calc_field.name) {
                    const countedValue = filteredTableData.reduce(
                      (prev, currVal, _ind) => {
                        if (
                          currVal[_countCheckField] ===
                            (_calc_field.value === "%"
                              ? currVal[_countCheckField]
                              : _calc_field.value) &&
                          currVal[_collapsibleFields[_index]] === item
                        ) {
                          return prev + 1;
                        }
                        return prev;
                      },
                      0
                    );
                    return <span>{countedValue}</span>;
                  }
                })}
              </td>
            ))}
          </tr>
          {isExpanded(item) && (
            <>
              {_collapsibleFields.length > _index + 1 && (
                <CollapsibleTableExpandableBlock
                  collapsedTableData={collapsedTableData}
                  fields={_fields}
                  tableData={tableData}
                  collapsibleFields={_collapsibleFields}
                  countFields={_countFields}
                  countCheckField={_countCheckField}
                  ind={_index + 1}
                  prevLevel={addLevel(props.prevLevel, item)} //prev lev data
                ></CollapsibleTableExpandableBlock>
              )}
              {_collapsibleFields.length <= _index + 1 &&
                filteredTableData.map((tableItem, ind) => {
                  if (tableItem[_collapsibleFields[_index]] === item) {
                    return (
                      <tr key={ind}>
                        {_fields.map((field, i) => (
                          <td key={i}>
                            <span className="collapsed_table-item">
                              {tableItem[field.item]}
                            </span>
                          </td>
                        ))}
                      </tr>
                    );
                  }
                })}
            </>
          )}
        </>
      ))}
    </>
  );
};

export default CollapsibleTableExpandableBlock;
