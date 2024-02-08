import {RootState} from "../../store";
import {Employee} from "./types";

export const selectEmployeesByIds = (state: RootState, ids: number[]) => {
  const employees = state.employee.data;

  return ids.reduce((current, id) => { return [...current, ...employees.filter((e) => e.companyId === id)]}, [] as Employee[])

}