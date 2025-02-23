'use client';

interface Column {
  key: string;
  label: string;
  render?: (value: any) => React.ReactNode;
}

interface DataTableProps {
  columns: Column[];
  data: any[];
  loading: boolean;
}

export default function DataTable({ columns, data, loading }: DataTableProps) {
  if (loading) {
    return (
      <div className='overflow-x-auto bg-white'>
        <table className='min-w-full border-collapse'>
          <thead>
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  className='bg-[#c0e3e5] text-[#322625] px-6 py-4 text-left text-sm font-bold uppercase tracking-wider whitespace-nowrap border-2 border-gray-200'
                >
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[...Array(5)].map((_, rowIndex) => (
              <tr
                key={rowIndex}
                className={`${
                  rowIndex % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                } animate-pulse`}
              >
                {columns.map((column) => (
                  <td
                    key={column.key}
                    className='px-6 py-4 whitespace-nowrap border-2 border-gray-200'
                  >
                    <div className='h-5 bg-gray-200 rounded w-3/4'></div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  return (
    <div className='overflow-x-auto bg-white'>
      <table className='min-w-full border-collapse'>
        <thead>
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                className='bg-[#c0e3e5] text-[#322625] px-6 py-4 text-left text-sm font-bold uppercase tracking-wider whitespace-nowrap border-2 border-gray-200'
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
              } hover:bg-[#ebebeb] transition-colors`}
            >
              {columns.map((column) => (
                <td
                  key={column.key}
                  className='px-6 py-4 text-sm text-gray-600 whitespace-nowrap border-2 border-gray-200'
                >
                  {column.render
                    ? column.render(row[column.key])
                    : row[column.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
