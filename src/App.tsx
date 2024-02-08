import React from 'react';
import './App.css';
import Table from "./components/Table";
import {useSelector} from "react-redux";
import {selectAllCompanies} from "./features/company/selectors";
import {CeilNames} from "./constants/type";

const companyCeilNames: CeilNames = {
  name: 'Название',
  employeesCount: 'Кол-во сотрудников',
  address: 'Адрес',
}

function App() {
  const companies = useSelector(selectAllCompanies);


  return (
    <div>
      <Table
        data={companies}
        ceilNames={companyCeilNames}
      />
    </div>
  );
}

export default App;
