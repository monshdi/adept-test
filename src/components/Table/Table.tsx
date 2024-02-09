import {FunctionComponentElement, memo} from "react";
import Cell from "../Cell/Cell";
import s from './Table.module.scss'
import {clsx} from "clsx";
import Icon from "../Icon/Icon";
import Button from "../Button/Button";
import {CellNames} from "../../features/type";

interface Props<T> {
  data: T[];
  cellNames: CellNames;
  selectedRows: string[];
  setSelectedRows: (ids: string[]) => void;
  deleteAction: (ids: string[]) => void;
  onEdit: (id: string, name: string, value: string) => void;
}

function Table<T extends { id: string }>({
  data,
  cellNames,
  selectedRows,
  setSelectedRows,
  deleteAction,
  onEdit
}: Props<T>): FunctionComponentElement<Props<T>> {

  const onSelectAll = () => {
    if (selectedRows.length === data.length) {
      setSelectedRows([]);
    } else {
      const allIds = data.map((company) => company.id);
      setSelectedRows(allIds)
    }
  }

  const onSelectRow = (id: string) => {
    if (selectedRows.includes(id)) {
      const newData = selectedRows.filter((item) => item !== id);
      setSelectedRows(newData);
    } else {
      const newData = [...selectedRows, id];
      setSelectedRows(newData);
    }
  }

  const onDelete = () => {
    deleteAction(selectedRows)
  }

  return (
    <div className={s.wrapper}>
      <table cellSpacing={0}>
        <thead>
        <tr className={s.header}>
          <th>
            <input type="checkbox" onChange={onSelectAll} checked={selectedRows.length === data.length} />
          </th>
          {Object.values(cellNames).map((value) => (
            <Cell key={value.name} value={value.name} />
          ))}
        </tr>
        </thead>
        <tbody>
        {data.map((item) => (
          <tr key={item.id} className={clsx({ [s.active]: selectedRows.includes(item.id) })}>
            <th>
              <input type="checkbox" onChange={() => onSelectRow(item.id)} checked={selectedRows.includes(item.id)} />
            </th>
            {Object.entries(cellNames).map(([key, value]) => (
              <Cell
                id={item.id}
                onEdit={onEdit}
                key={`${item.id}-${key}`}
                value={(item as any)[key]}
                name={key}
                editable={value.editable}
              />
            ))}
          </tr>
        ))}
        </tbody>
      </table>
      <div>
        <Button onClick={onDelete} disabled={!selectedRows.length}><Icon name="trash" className={s.icon} /></Button>
        <Button onClick={() => alert('delete')}><Icon name="plus" className={s.icon} /></Button>
      </div>
    </div>
  )
}

export default memo(Table);