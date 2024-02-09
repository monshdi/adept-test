import {RootState} from "../../store";
import {Employee} from "./types";
import {createSelector} from "@reduxjs/toolkit";

export const selectEmployeesByIds = createSelector(
  (state: RootState) => state.employee.data,
  (_: any, ids: string[]) => ids,
  (items: Employee[], ids: string[]) => {
    return ids.reduce((current, id) => { return [...current, ...items.filter((e) => e.companyId === parseInt(id))]}, [] as Employee[])

  }
);

export const getEmployeeStatus = (state: RootState) => state.employee.status;