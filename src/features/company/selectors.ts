import {RootState} from "../../store";

export const selectAllCompanies = (state: RootState) => state.company.data;

export const getCompaniesStatus = (state: RootState) => state.company.status;