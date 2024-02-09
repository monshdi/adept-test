import {createAction} from "@reduxjs/toolkit";

export const deleteCompanyAction = createAction<string[]>('company/delete');

export const deleteEmployeesAction = createAction('employees/delete', (ids: string[], companyIds: number[]) => ({
  payload: {
    ids,
    companyIds,
  }
}));
