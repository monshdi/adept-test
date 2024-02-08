import React, {useState} from 'react';
import './App.css';
import Table from "./components/Table";
import {useSelector} from "react-redux";
import {selectAllCompanies} from "./features/company/selectors";
import {CeilNames} from "./constants/type";
import {selectEmployeesByIds} from "./features/employees/selectors";
import {RootState} from "./store";

const companyCeilNames: CeilNames = {
  name: 'Название',
  employeesCount: 'Кол-во сотрудников',
  address: 'Адрес',
}

const employeeCeilNames: CeilNames = {
  lastName: 'Фамилия',
  name: 'Имя',
  post: 'Должность',
}

function App() {
  const [selectedCompanies, setSelectedCompanies] = useState<number[]>([]);
  const [selectedEmployees, setSelectedEmployees] = useState<number[]>([]);

  const companies = useSelector(selectAllCompanies);
  const employees = useSelector((state: RootState) => selectEmployeesByIds(state, selectedCompanies));

  return (
    <div>
      <Table
        data={companies}
        cellNames={companyCeilNames}
        selectedRows={selectedCompanies}
        setSelectedRows={setSelectedCompanies}
      />
      <Table
        data={employees}
        cellNames={employeeCeilNames}
        selectedRows={selectedEmployees}
        setSelectedRows={setSelectedEmployees}
      />
    </div>
  );
}

export default App;
