import React, {useState} from 'react';
import './App.module.scss';
import Table from "./components/Table/Table";
import {useSelector} from "react-redux";
import {selectAllCompanies} from "./features/company/selectors";
import {CeilNames} from "./constants/type";
import {selectEmployeesByIds} from "./features/employees/selectors";
import {RootState} from "./store";
import s from './App.module.scss';
import {deleteCompany} from "./features/company/companySlice";
import {deleteEmployee} from "./features/employees/employeesSlice";

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
    <div className={s.wrapper}>
      <Table
        data={companies}
        cellNames={companyCeilNames}
        selectedRows={selectedCompanies}
        setSelectedRows={setSelectedCompanies}
        deleteAction={deleteCompany}
      />
      {selectedCompanies.length > 0 && (
        <Table
          data={employees}
          cellNames={employeeCeilNames}
          selectedRows={selectedEmployees}
          setSelectedRows={setSelectedEmployees}
          deleteAction={deleteEmployee}
        />
      )}
    </div>
  );
}

export default App;
