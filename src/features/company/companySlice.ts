import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Company} from "./types";
import {getCompanies, getEmployees} from "../thunks";
import {Employee} from "../employees/types";
import {deleteCompanyAction, deleteEmployeesAction, editItemAction} from "../actions";
import {EditAction} from "../type";

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
    incrementCompanyEmployeesCount: (state, {payload}: PayloadAction<string>) => {
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
    deleteCompany: (state, {payload}: PayloadAction<string[]>) => {
      state.data = state.data.filter((item) => !payload.includes(item.id));
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

    builder.addCase(deleteCompanyAction, (state, { payload }: PayloadAction<string[]>) => {
      state.data = state.data.filter((item) => !payload.includes(item.id))
    });

    builder.addCase(deleteEmployeesAction, (state, { payload }: PayloadAction<{ids: string[], companyIds: number[]}>) => {
      const { companyIds } = payload;
      companyIds.forEach((id) => {
        const found = state.data.find((item) => parseInt(item.id) === id);
        if (found) {
          found.employeesCount -= 1;
        }
      })
    })

    builder.addCase(editItemAction, (state, { payload }: PayloadAction<EditAction>) => {
      const { type, id, field, value} = payload;

      if (type === 'company') {
        const found = state.data.find((item) => item.id === id);
        if (found) {
          (found as any)[field] = value;
        }
      }
    });
  }
});

export const {incrementCompanyEmployeesCount, deleteCompany} = companySlice.actions;

export default companySlice.reducer;