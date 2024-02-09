export interface CellNames {
  [key: string]: {name: string, editable: boolean};
}

export interface EditAction {
  type: string;
  id: string;
  field: string;
  value: string;
}