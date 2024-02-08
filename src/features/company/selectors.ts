import {RootState} from "../../store";

export const selectAllCompanies = (state: RootState) => state.company.data;