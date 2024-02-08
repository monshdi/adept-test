import {FunctionComponentElement, PropsWithChildren} from "react";
import s from './Button.module.scss';
import {clsx} from "clsx";

interface Props extends PropsWithChildren {
  onClick: () => void;
  className?: string;
  disabled?: boolean;
}

export default function Button({ onClick, children, className = '', disabled  }: Props): FunctionComponentElement<Props> {
  return (
    <button type="button" onClick={onClick} className={clsx(s.button, className)} disabled={disabled}>{children}</button>
  )
}