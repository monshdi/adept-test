import {FunctionComponentElement, memo} from "react";

interface Props<T> {
  data: T[];
  ceilNames: {[key: string]: string};
}

function Table<T extends { id: number }>({data, ceilNames}: Props<T>): FunctionComponentElement<Props<T>> {
  return (
    <table>
      <thead>
      <tr>
        <th></th>
        {Object.values(ceilNames).map((name) => (
          <th key={name}>{name}</th>
        ))}
      </tr>
      </thead>
      <tbody>
      {data.map((item) => (
        <tr key={item.id}>
          <th></th>
          {Object.keys(ceilNames).map((key) => (
            <th key={`${item.id}-${key}`}>{(item as any)[key]}</th>
          ))}
        </tr>
      ))}
      </tbody>
    </table>
  )
}

export default memo(Table);