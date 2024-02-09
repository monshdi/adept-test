import React, {useEffect, useState} from 'react';
import './App.module.scss';
import Table from "./components/Table/Table";
import {useSelector} from "react-redux";
import {getCompaniesStatus, selectAllCompanies} from "./features/company/selectors";
import {CeilNames} from "./constants/type";
import {getEmployeeStatus, selectEmployeesByIds} from "./features/employees/selectors";
import {RootState} from "./store";
import s from './App.module.scss';
import {deleteCompany} from "./features/company/companySlice";
import {deleteEmployee} from "./features/employees/employeesSlice";
import {useAppDispatch} from "./hooks/hooks";
import {getCompanies, getEmployees} from "./features/thunks";

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
  const dispatch = useAppDispatch();

  const [selectedCompanies, setSelectedCompanies] = useState<string[]>([]);
  const [selectedEmployees, setSelectedEmployees] = useState<string[]>([]);

  const companyStatus = useSelector(getCompaniesStatus);
  const employeeStatus = useSelector(getEmployeeStatus);
  const companies = useSelector(selectAllCompanies);
  const employees = useSelector((state: RootState) => selectEmployeesByIds(state, selectedCompanies));

  useEffect(() => {
    if (!companies.length && companyStatus !== 'loaded') {
      dispatch(getCompanies());
    }

    if (employeeStatus !== 'loaded') {
      dispatch(getEmployees());
    }
  }, []);

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
