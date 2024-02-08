import {FunctionComponentElement} from "react";
import { clsx } from "clsx";
import s from './Cell.module.scss';

interface Props {
  value: string;
  className?: string;
}
export default function Cell({ value, className }: Props): FunctionComponentElement<Props> {
  return (
    <th className={clsx(s.cell, className)}>{value}</th>
  )
}