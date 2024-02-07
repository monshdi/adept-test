import {createSlice} from "@reduxjs/toolkit";
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
  reducers: {},
})

export default employeesSlice.reducer;