"use client";
import * as TW from "@material-tailwind/react";
import * as XLSX from "xlsx";

export default function Nd() {
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
    <div className="space-y-2">
      <TW.Card>
        <div className="flex p-4">
          <div>
            <TW.Input
              type={"file"}
              accept=".xlsx, .xls"
              onChange={handleFileUpload}
            />
          </div>

          <TW.Button>button</TW.Button>
        </div>
      </TW.Card>
      <TW.Card>
        <div className="p-4"></div>
      </TW.Card>
    </div>
  );
}
