import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Company} from "./types";
import {getCompanies, getEmployees} from "../thunks";
import {Employee} from "../employees/types";
import {deleteCompanyAction, deleteEmployeesAction, editItemAction} from "../actions";
import {EditAction} from "../type";
import {addNewEmployee, employeesSlice} from "../employees/employeesSlice";

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
    addNewCompany: (state) => {
      state.data = [
        ...state.data,
        {
          id: String(Date.now()),
          name: '',
          address: '',
          employeesCount: 0,
        } as Company
      ]
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getCompanies.fulfilled, (state, {payload}: PayloadAction<Company[]>) => {
      state.data = payload;
      state.status = 'loaded';
    });

    builder.addCase(getEmployees.fulfilled, (state, {payload}: PayloadAction<Employee[]>) => {
      for (const item of payload) {
        const c = state.data.find((company) => parseInt(company.id) === item.companyId);
        if (c) {
          c.employeesCount += 1;
        }
      }
    });

    builder.addCase(deleteCompanyAction, (state, {payload}: PayloadAction<string[]>) => {
      state.data = state.data.filter((item) => !payload.includes(item.id))
    });

    builder.addCase(deleteEmployeesAction, (state, {payload}: PayloadAction<{
      ids: string[],
      companyIds: number[]
    }>) => {
      const {companyIds} = payload;
      companyIds.forEach((id) => {
        const found = state.data.find((item) => parseInt(item.id) === id);
        if (found) {
          found.employeesCount -= 1;
        }
      })
    })

    builder.addCase(editItemAction, (state, {payload}: PayloadAction<EditAction>) => {
      const {type, id, field, value} = payload;

      if (type === 'company') {
        const found = state.data.find((item) => item.id === id);
        if (found) {
          (found as any)[field] = value;
        }
      }
    });

    builder.addCase(addNewEmployee, (state, { payload }: PayloadAction<string>) => {
      const found = state.data.find((item) => item.id === payload);
      if (found) {
        found.employeesCount += 1;
      }
    })
  }
});

export const {addNewCompany} = companySlice.actions;

export default companySlice.reducer;