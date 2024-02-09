import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import { Employee } from './types';
import {getEmployees} from "../thunks";
import {deleteEmployeesAction} from "../actions";

interface EmployeesState {
  data: Employee[];
  status: 'idle' | 'loaded';
}

const initialState: EmployeesState = {
  data: [],
  status: "idle",
}

export const employeesSlice = createSlice({
  name: 'employees',
  initialState,
  reducers: {
    deleteEmployee: (state, { payload }: PayloadAction<string[]>) => {
      state.data = state.data.filter((item) => !payload.includes(item.id));
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getEmployees.fulfilled, (state, { payload }: PayloadAction<Employee[]>) => {
      state.data = payload;
      state.status = 'loaded';
    });

    builder.addCase(deleteEmployeesAction, (state, { payload }: PayloadAction<{ids: string[], companyIds: number[]}>) => {
      state.data = state.data.filter((item) => !payload.ids.includes(item.id));
    })
  }
})

export const { deleteEmployee } = employeesSlice.actions;

export default employeesSlice.reducer;