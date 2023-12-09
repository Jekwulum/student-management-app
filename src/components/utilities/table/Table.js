import React, { useMemo } from "react";
import { useTable } from "react-table";
import './Table.css';

export const Table = ({ columnsHeaders, data }) => {
  const tableObject = [...columnsHeaders];
  const columns = useMemo(() => tableObject, []);
  const tableData = useMemo(() => data, []);

  const tableInstance = useTable({ columns, data: tableData, striped: true });

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow } = tableInstance;

  return (
    <div className="border shadow-xl drop-shadow-lg overflow-auto mt-5 ml-2 md:mx-auto w-5/6">
      <table {...getTableProps()} className="w-full">
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()} className="p-[8px] py-[10px] text-left bg-customColor text-white">
                  {column.render('Header')}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, index) => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()} className={index % 2 === 0 ? 'bg-[#dbeeff]' : 'bg-[#dbeeff] text-customColor'}>
                {row.cells.map((cell) => {
                  return <td {...cell.getCellProps()} className="p-[6px]">
                    {cell.render('Cell')}</td>
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  );
};