import {createSlice} from "@reduxjs/toolkit";
import {Company} from "./types";
import companies from './data';

interface State {
  data: Company[]
}

const initialState: State = {
  data: companies,
}


export const companySlice = createSlice({
  name: 'company',
  initialState,
  reducers: {},
})

export default companySlice.reducer;