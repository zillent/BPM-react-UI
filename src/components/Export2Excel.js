import React from 'react'
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

const Export2Excel = ({dataArray, fileName}) => {
    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const fileExtension = '.xlsx';
    const exportToExcel = (dataArray, fileName) => {
        const ws = XLSX.utils.json_to_sheet(dataArray);
        const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const data = new Blob([excelBuffer], {type: fileType});
        FileSaver.saveAs(data, fileName + fileExtension);
    }
    return (
        <button onClick={(e) => exportToExcel(dataArray, fileName)}>Выгрузить в Excel</button>
    )
}

export default Export2Excel;