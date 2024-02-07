import { configureStore } from '@reduxjs/toolkit'
import companyReducer from "./features/company/companySlice";
import employeeReducer from "./features/employees/employeesSlice";

export const store = configureStore({
  reducer: {
    company: companyReducer,
    employee: employeeReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch