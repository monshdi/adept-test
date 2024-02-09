import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import { Employee } from './types';
import {getEmployees} from "../thunks";
import {deleteEmployeesAction, editItemAction} from "../actions";
import {EditAction} from "../type";

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

    builder.addCase(editItemAction, (state, { payload }: PayloadAction<EditAction>) => {
      const { type, id, field, value} = payload;

      if (type === 'employees') {
        const found = state.data.find((item) => item.id === id);
        if (found) {
          (found as any)[field] = value;
        }
      }
    });
  }
})

export const { deleteEmployee } = employeesSlice.actions;

export default employeesSlice.reducer;