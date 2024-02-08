import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import { Employee } from './types';
import data from './data';
interface EmployeesState {
  data: Employee[]
}

const initialState: EmployeesState = {
  data,
}

export const employeesSlice = createSlice({
  name: 'employees',
  initialState,
  reducers: {
    deleteEmployee: (state, { payload }: PayloadAction<number[]>) => {
      state.data = state.data.filter((item) => !payload.includes(item.id));
    }
  },
})

export const { deleteEmployee } = employeesSlice.actions;

export default employeesSlice.reducer;