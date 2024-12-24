const Table = ({ columns, data }) => {
  return (
    <div className="overflow-x-auto ">
      <table className="min-w-full border-collapse border border-gray-200">
        <thead>
          <tr className="bg-[#a5b1c2] text-black">
            {columns.map((column, index) => (
              <th
                key={index}
                style={{ width: column.width }}
                className="py-4 px-6 text-center  font-semibold text-sm-700"
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
              } hover:bg-blue-50 transition-colors duration-150 ease-in-out`}
            >
              {columns.map((column, colIndex) => (
                <td
                  key={colIndex}
                  className="py-3 px-6 text-center   border-gray-200 text-gray-1000"
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