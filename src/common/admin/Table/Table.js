const Table = ({ columns, data }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-yellow-500 text-white">
            {columns.map((column, index) => (
              <th
                key={index}
                style={{ width: column.width }} // Sử dụng width từ columns
                className="py-3 px-4 text-center border border-gray-300"
              >
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className={`${
                rowIndex % 2 === 0 ? 'bg-gray-50' : 'bg-white'
              } hover:bg-gray-100`}
            >
              {columns.map((column, colIndex) => (
                <td
                  key={colIndex}
                  className="py-2 px-4 text-left border border-gray-300"
                >
                  {column.render
                    ? column.render(row[column.field], row)
                    : row[column.field]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
