import {createAsyncThunk} from "@reduxjs/toolkit";

export const getCompanies = createAsyncThunk(
  'company/get',
  async () => {
    const response = await fetch('http://localhost:3001/companies');
    const data = await response.json()
    return data;
  }
);

export const getEmployees = createAsyncThunk(
  'employees/get',
  async () => {
    const response = await fetch('http://localhost:3001/employees');
    const data = await response.json()
    return data;
  }
);