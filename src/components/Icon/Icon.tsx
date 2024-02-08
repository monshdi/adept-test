import {FunctionComponentElement} from "react";
import icons from '../../icons.svg';

interface Props {
  name: string;
  className?: string;
}

export default function Icon({ name, className }: Props): FunctionComponentElement<Props> {
  return (
    <svg className={className}>
      <use xlinkHref={`${icons}#${name}`} />
    </svg>
  )
}