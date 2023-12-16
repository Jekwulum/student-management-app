import React, { useMemo } from "react";
import { useTable, usePagination } from "react-table";
import './Table.css';

export const PaginationTable = ({ columnsHeaders, data, handleRowClick }) => {
  const tableObject = [...columnsHeaders];
  const columns = useMemo(() => tableObject, []);
  const tableData = useMemo(() => data, []);

  const tableInstance = useTable({
    columns, data: tableData, striped: true, initialState: { pageIndex: 0 }
  }, usePagination);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    gotoPage,
    pageCount,
    setPageSize,
    state,
    prepareRow } = tableInstance;

  const { pageIndex, pageSize } = state;

  return (
    <div className="border shadow-xl drop-shadow-lg overflow-auto mt-5 ml-2 md:mx-auto w-full lg:w-full">
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
          {page.map((row, index) => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()} onClick={() => handleRowClick(row.original)}
              className={`hover:cursor-pointer hover:underline ${index % 2 === 0 ? 'bg-white' : 'bg-customLight text-customColor'}`}>
                {row.cells.map((cell) => {
                  return <td {...cell.getCellProps()} className="p-[6px]">
                    {cell.render('Cell')}</td>
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
      <div className="flex flex-col margin-auto justify-center gap-2 mt-5 mb-3 items-center">
        <div className="flex items-center gap-2">
          <span>
            Page{' '} <strong>{pageIndex + 1} of {pageOptions.length}</strong>{' '}
          </span>
          <span>
            | Go to page: {' '}
            <input className="h-8 w-12 focus:outline-none" type="number" min={1} defaultValue={pageIndex + 1}
              onChange={e => {
                const pageNumber = e.target.value ? Number(e.target.value) - 1 : 0;
                gotoPage(pageNumber);
              }} />
          </span>

          <select className="w-24 h-8"
            value={pageSize} onChange={e => setPageSize(Number(e.target.value))}>
            {
              [10, 15, 20, 25, 30, 50].map(pageSize => (
                <option key={pageSize} value={pageSize} className="text-customColor">Show {pageSize}</option>
              ))
            }
          </select>
        </div>

        <div className="flex items-center gap-2">
          <button className={`h-8 w-8 bg-customColor rounded-md hover:bg-gray-700 text-white ${!canPreviousPage && 'bg-customColor/[.33] hover:bg-customColor/[.33]'}`}
            onClick={() => gotoPage(0)} disabled={!canPreviousPage}>{'<<'}</button>
          <button className={`h-8 w-24 bg-customColor rounded-md hover:bg-gray-700 text-white ${!canPreviousPage && 'bg-customColor/[.33] hover:bg-customColor/[.33]'}`}
            onClick={() => previousPage()} disabled={!canPreviousPage}>Previous</button>
          <button className={`h-8 w-24 bg-customColor rounded-md hover:bg-gray-700 text-white ${!canNextPage && 'bg-customColor/[.33] hover:bg-customColor/[.33]'}`}
            onClick={() => nextPage()} disabled={!canNextPage}>Next</button>
          <button className={`h-8 w-8 bg-customColor rounded-md hover:bg-gray-700 text-white ${!canNextPage && 'bg-customColor/[.33] hover:bg-customColor/[.33]'}`}
            onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>{'>>'}</button>
        </div>
      </div>
    </div>
  );
};