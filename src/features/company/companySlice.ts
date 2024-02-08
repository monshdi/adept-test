import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Company} from "./types";
import data from './data';
import {employeesSlice} from "../employees/employeesSlice";

interface State {
  data: Company[]
}

const initialState: State = {
  data,
}


export const companySlice = createSlice({
  name: 'company',
  initialState,
  reducers: {
    incrementCompanyEmployeesCount: (state, { payload }: PayloadAction<number>) => {
      state.data = state.data.map((item) => {
        if (item.id === payload) {
          return {
            ...item,
            employeesCount: item.employeesCount + 1,
          }
        }

        return item;
      })
    },
    deleteCompany: (state, { payload }: PayloadAction<number[]>) => {
      state.data = state.data.filter((item) => !payload.includes(item.id));
    }
  },
});

export const { incrementCompanyEmployeesCount, deleteCompany } = companySlice.actions;

export default companySlice.reducer;