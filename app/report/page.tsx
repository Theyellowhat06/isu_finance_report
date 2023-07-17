"use client";
import { Button, Input } from "@material-tailwind/react";
import * as XLSX from "xlsx";

export default function Report() {
  const handleFileUpload = (e: any) => {
    const reader = new FileReader();
    reader.readAsBinaryString(e.target.files[0]);
    reader.onload = (e) => {
      const data = e.target?.result;
      const workbook = XLSX.read(data, { type: "binary" });
      const sheetName1 = workbook.SheetNames[0];
      const sheet1 = workbook.Sheets[sheetName1];
      const parsedData1 = XLSX.utils.sheet_to_json(sheet1);
      const sheetName2 = workbook.SheetNames[1];
      const sheet2 = workbook.Sheets[sheetName2];
      const parsedData2 = XLSX.utils.sheet_to_json(sheet2);
      console.log(parsedData1);
      console.log(parsedData2);
      // setData(parsedData);
    };
  };

  return (
    <div>
      <Button>button</Button>
      <Input
        type={"file"}
        accept=".xlsx, .xls"
        onChange={handleFileUpload}
      ></Input>
    </div>
  );
}
