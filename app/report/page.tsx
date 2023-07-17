"use client";
import * as TW from "@material-tailwind/react";
import * as React from "react";
import * as XLSX from "xlsx";

export default function Report() {
  const [range, setRange] = React.useState(null);
  const [year, setYear] = React.useState(new Date().getFullYear().toString());
  const [quarter, setQuarter] = React.useState("1");

  return (
    <div>
      <div className="bg-white rounded-xl drop-shadow-md p-4 min-h-[calc(100vh-32px)]">
        <div className="flex space-x-2">
          <div className="w-64">
            <TW.Select
              label="Тайлангийн хугацаа"
              onChange={(value: any) => setRange(value)}
            >
              <TW.Option value="0">Улиралаар</TW.Option>
              <TW.Option value="1">Хагас жилээр</TW.Option>
              <TW.Option value="2">Бүтэн жилээр</TW.Option>
            </TW.Select>
          </div>
          <div>
            <TW.Select
              label="Жил"
              value={year}
              onChange={(value: any) => setYear(value)}
            >
              <TW.Option value="2023">2023</TW.Option>
              <TW.Option value="2022">2022</TW.Option>
              <TW.Option value="2021">2021</TW.Option>
            </TW.Select>
          </div>
          {range && (range == "0" || range == "1") && (
            <div>
              {range == "0" ? (
                <TW.Select
                  label="Улирал"
                  value={quarter}
                  onChange={(value: any) => setQuarter(value)}
                >
                  <TW.Option value="1">1-р улирал</TW.Option>
                  <TW.Option value="2">2-р улирал</TW.Option>
                  <TW.Option value="3">3-р улирал</TW.Option>
                  <TW.Option value="4">4-р улирал</TW.Option>
                </TW.Select>
              ) : (
                <TW.Select
                  label="Жилийн хагас"
                  value={quarter}
                  onChange={(value: any) => setQuarter(value)}
                >
                  <TW.Option value="1">Эхний хагас</TW.Option>
                  <TW.Option value="2">Сүүлийн хагас</TW.Option>
                </TW.Select>
              )}
            </div>
          )}
          <TW.Button disabled={range == null}>Харах</TW.Button>
        </div>
      </div>

      {/* <Button>button</Button>
      <Input
        type={"file"}
        accept=".xlsx, .xls"
        onChange={handleFileUpload}
      ></Input> */}
    </div>
  );
}
