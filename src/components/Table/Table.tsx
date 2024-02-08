import {FunctionComponentElement, memo} from "react";
import Cell from "../Cell/Cell";
import s from './Table.module.scss'
import {clsx} from "clsx";
import Icon from "../Icon/Icon";
import Button from "../Button/Button";
import {ActionCreatorWithPayload} from "@reduxjs/toolkit";
import {useAppDispatch} from "../../hooks/hooks";


interface Props<T> {
  data: T[];
  cellNames: {[key: string]: string};
  selectedRows: number[];
  setSelectedRows: (ids: number[]) => void;
  deleteAction: ActionCreatorWithPayload<number[], any>;
}

function Table<T extends { id: number }>({
  data,
  cellNames,
  selectedRows,
  setSelectedRows,
  deleteAction,
}: Props<T>): FunctionComponentElement<Props<T>> {
  const dispatch = useAppDispatch();

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

  const onDelete = () => {
    dispatch(deleteAction(selectedRows))
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
        <Button onClick={onDelete} disabled={!selectedRows.length}><Icon name="trash" className={s.icon} /></Button>
        <Button onClick={() => alert('delete')}><Icon name="plus" className={s.icon} /></Button>
      </div>
    </div>
  )
}

export default memo(Table);