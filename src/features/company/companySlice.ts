import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Company} from "./types";
import {getCompanies, getEmployees} from "../thunks";
import {Employee} from "../employees/types";

interface State {
  data: Company[]
  status: 'idle' | 'loaded';
}

const initialState: State = {
  data: [],
  status: 'idle',
}


export const companySlice = createSlice({
  name: 'company',
  initialState,
  reducers: {
    incrementCompanyEmployeesCount: (state, { payload }: PayloadAction<string>) => {
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
    deleteCompany: (state, { payload }: PayloadAction<string[]>) => {
      state.data = state.data.filter((item) => !payload.includes(item.id));
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getCompanies.fulfilled, (state, { payload }: PayloadAction<Company[]>) => {
      state.data = payload;
      state.status = 'loaded';
    }).addCase(getEmployees.fulfilled, (state, { payload }: PayloadAction<Employee[]>) => {
      console.log(state.data);
      for (const item of payload) {
        const c = state.data.find((company) => parseInt(company.id) === item.companyId);
        if (c) {
          c.employeesCount += 1;
        }
      }
    })
  }
});

export const { incrementCompanyEmployeesCount, deleteCompany } = companySlice.actions;

export default companySlice.reducer;