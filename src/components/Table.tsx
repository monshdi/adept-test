import {FunctionComponentElement, memo} from "react";

interface Props<T> {
  data: T[];
  cellNames: {[key: string]: string};
  selectedRows: number[];
  setSelectedRows: (id: number[]) => void;
}

function Table<T extends { id: number }>({
  data,
  cellNames,
  selectedRows,
  setSelectedRows
}: Props<T>): FunctionComponentElement<Props<T>> {

  const onSelectAll = () => {
    if (selectedRows.length === data.length) {
      setSelectedRows([]);
    } else {
      const allIds = data.map((company) => company.id);
      setSelectedRows(allIds)
    }
  }

  const onSelectRow = (id: number) => {
    if (selectedRows.includes(id)) {
      const newData = selectedRows.filter((item) => item !== id);
      setSelectedRows(newData);
    } else {
      const newData = [...selectedRows, id];
      setSelectedRows(newData);
    }
  }
  return (
    <table>
      <thead>
      <tr>
        <th>
          <input type="checkbox" onChange={onSelectAll} checked={selectedRows.length === data.length} />
        </th>
        {Object.values(cellNames).map((name) => (
          <th key={name}>{name}</th>
        ))}
      </tr>
      </thead>
      <tbody>
      {data.map((item) => (
        <tr key={item.id}>
          <th>
            <input type="checkbox" onChange={() => onSelectRow(item.id)} checked={selectedRows.includes(item.id)} />
          </th>
          {Object.keys(cellNames).map((key) => (
            <th key={`${item.id}-${key}`}>{(item as any)[key]}</th>
          ))}
        </tr>
      ))}
      </tbody>
    </table>
  )
}

export default memo(Table);