  // Table.js
  import React, { useState, useMemo } from "react";
  import "./Table.css";

  const Table = ({ columns, data }) => {
    const [sortConfig, setSortConfig] = useState({ key: "", direction: "" });
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 15;

    const sortedData = useMemo(() => {
      let sortableData = [...data];
      if (sortConfig.key) {
        sortableData.sort((a, b) => {
          if (a[sortConfig.key] < b[sortConfig.key])
            return sortConfig.direction === "ascending" ? -1 : 1;
          if (a[sortConfig.key] > b[sortConfig.key])
            return sortConfig.direction === "ascending" ? 1 : -1;
          return 0;
        });
      }
      return sortableData;
    }, [data, sortConfig]);

    const filteredData = sortedData.filter((item) =>
      columns.some((column) =>
        String(item[column.field])
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      )
    );

    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    const paginatedData = filteredData.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );

    const requestSort = (key) => {
      let direction = "ascending";
      if (sortConfig.key === key && sortConfig.direction === "ascending") {
        direction = "descending";
      }
      setSortConfig({ key, direction });
    };

    const renderSortArrow = (columnKey) => {
      if (sortConfig.key === columnKey) {
        return sortConfig.direction === "ascending" ? " ↑" : " ↓";
      }
      return null;
    };

    return (
      <div className="table-container">

        <table className="table">
          <thead>
            <tr>
              {columns.map((column, index) => (
                <th
                  key={index}
                  onClick={() => requestSort(column.field)}
                  style={{ width: column.width }} // Sử dụng width từ columns
                >
                  {column.label}
                  {renderSortArrow(column.field)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {columns.map((column, colIndex) => (
                  <td key={colIndex}>
                    {column.render
                      ? column.render(row[column.field], row)
                      : row[column.field]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>

        <div className="pagination">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Trước
          </button>
          <span>
            Trang {currentPage}/{totalPages}
          </span>
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
          >
            Sau
          </button>
        </div>
      </div>
    );
  };

  export default Table;
