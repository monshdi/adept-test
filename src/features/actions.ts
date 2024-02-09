import {createAction} from "@reduxjs/toolkit";

export const deleteCompanyAction = createAction<string[]>('company/delete');

export const deleteEmployeesAction = createAction('employees/delete', (ids: string[], companyIds: number[]) => ({
  payload: {
    ids,
    companyIds,
  }
}));

export const editItemAction = createAction('edit', (type: string, id: string, field: string, value: string) => ({
  payload: {
    type,
    id,
    field,
    value
  }
}))
