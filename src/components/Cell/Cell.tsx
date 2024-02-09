import {ChangeEvent, ChangeEventHandler, FunctionComponentElement} from "react";
import { clsx } from "clsx";
import s from './Cell.module.scss';

interface Props {
  id?: string
  value: string;
  name?: string;
  editable?: boolean;
  className?: string;
  onEdit?: (id: string, name: string, value: string) => void;
}
export default function Cell({ id, value, name, editable, className, onEdit }: Props): FunctionComponentElement<Props> {
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (onEdit) {
      onEdit(id ?? '', name ?? '', e.target.value);
    }
  }
  return (
    <th className={clsx(s.cell, className)}>
      <input className={s.input} type="text" value={value} readOnly={!editable} onChange={onChange} />
    </th>
  )
}