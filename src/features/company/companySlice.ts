import {createSlice} from "@reduxjs/toolkit";
import {Company} from "./types";
import data from './data';

interface State {
  data: Company[]
}

const initialState: State = {
  data,
}


export const companySlice = createSlice({
  name: 'company',
  initialState,
  reducers: {},
})

export default companySlice.reducer;