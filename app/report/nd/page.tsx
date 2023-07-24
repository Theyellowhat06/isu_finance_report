"use client";
import * as TW from "@material-tailwind/react";
import * as XLSX from "xlsx";
import * as React from "react";
import * as Icon from "@heroicons/react/24/solid";
import Link from "next/link";

export default function Nd() {
  const [pdata, setPdata] = React.useState<any>([]);
  const handleFileUpload = (e: any) => {
    const reader = new FileReader();
    reader.readAsBinaryString(e.target.files[0]);
    reader.onload = (e) => {
      const data = e.target?.result;
      const workbook = XLSX.read(data, { type: "binary" });
      const sheetName1 = workbook.SheetNames[0];
      const sheet1 = workbook.Sheets[sheetName1];
      console.log(sheet1);
      const parsedData1 = XLSX.utils.sheet_to_json(sheet1);
      // const sheetName2 = workbook.SheetNames[1];
      // const sheet2 = workbook.Sheets[sheetName2];
      // const parsedData2 = XLSX.utils.sheet_to_json(sheet2);
      setPdata(parsedData1);
      console.log(parsedData1);
      // console.log(parsedData2);
      // setData(parsedData);
    };
  };

  const upload = () => {
    const data = pdata
      .filter(
        ({ __EMPTY_3, __EMPTY_6 }: any) =>
          __EMPTY_3 !== undefined && !isNaN(Number(__EMPTY_6))
      )
      .map(({ __EMPTY_3, __EMPTY_6 }: any) => ({
        __EMPTY_3,
        __EMPTY_6,
      }));
    console.log(data);
  };

  return (
    <div className="space-y-2">
      <TW.Card>
        <div className="flex p-4 space-x-2">
          <div>
            <TW.Input
              type={"file"}
              accept=".xlsx, .xls"
              onChange={handleFileUpload}
            />
          </div>
          {/* <TW.Button>
            <div className="flex">
              <Icon.EyeIcon className="w-4 h-4 mr-2" />
              Review
            </div>
          </TW.Button> */}
          <Link href={`../ND_TEMPLATE2.xlsx`}>
            <TW.Button>
              <div className="flex">
                <Icon.DocumentIcon className="w-4 h-4 mr-2" />
                Template
              </div>
            </TW.Button>
          </Link>

          <TW.Button color="green" onClick={upload}>
            <div className={"flex"}>
              <Icon.DocumentArrowUpIcon className="w-4 h-4 mr-2" /> Upload
            </div>
          </TW.Button>
        </div>
      </TW.Card>
      {pdata && pdata.length > 3 && (
        <TW.Card>
          <div className="p-4 overflow-auto">
            <table>
              <thead>
                <tr>
                  {Object.keys(pdata[3]).map((key) => (
                    <th
                      className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                      key={key}
                    >
                      <TW.Typography>{pdata[1][key]}</TW.Typography>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {pdata.map((row: any, index: any) => {
                  const isLast = index === pdata.length - 1;
                  const classes = isLast
                    ? "p-4"
                    : "p-4 border-b border-blue-gray-50";
                  return row.__EMPTY &&
                    !isNaN(Number(row.__EMPTY)) &&
                    row.__EMPTY_3 !== undefined ? (
                    <tr key={index}>
                      {Object.keys(row).map((key) => (
                        <td className={classes} key={`${index}${key}`}>
                          <TW.Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {row[key]}
                          </TW.Typography>
                        </td>
                      ))}
                      {/* <td>{row}</td> */}
                    </tr>
                  ) : (
                    <></>
                  );
                })}
              </tbody>
            </table>
          </div>
        </TW.Card>
      )}
    </div>
  );
}
