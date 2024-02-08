import {FunctionComponentElement, memo} from "react";
import Cell from "../Cell/Cell";
import s from './Table.module.scss'
import {clsx} from "clsx";
import Icon from "../Icon/Icon";
import Button from "../Button/Button";

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
    <div className={s.wrapper}>
      <table cellSpacing={0}>
        <thead>
        <tr className={s.header}>
          <th>
            <input type="checkbox" onChange={onSelectAll} checked={selectedRows.length === data.length} />
          </th>
          {Object.values(cellNames).map((name) => (
            <Cell key={name} value={name} />
          ))}
        </tr>
        </thead>
        <tbody>
        {data.map((item) => (
          <tr key={item.id} className={clsx({ [s.active]: selectedRows.includes(item.id) })}>
            <th>
              <input type="checkbox" onChange={() => onSelectRow(item.id)} checked={selectedRows.includes(item.id)} />
            </th>
            {Object.keys(cellNames).map((key) => (
              <Cell key={`${item.id}-${key}`} value={(item as any)[key]} />
            ))}
          </tr>
        ))}
        </tbody>
      </table>
      <div>
        <Button onClick={() => alert('delete')}><Icon name="trash" className={s.icon} /></Button>
        <Button onClick={() => alert('delete')}><Icon name="plus" className={s.icon} /></Button>
      </div>
    </div>
  )
}

export default memo(Table);