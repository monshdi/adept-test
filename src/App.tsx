import React, {useCallback, useEffect, useState} from 'react';
import './App.module.scss';
import Table from "./components/Table/Table";
import {useSelector} from "react-redux";
import {getCompaniesStatus, selectAllCompanies} from "./features/company/selectors";
import {CeilNames} from "./features/type";
import {getEmployeeStatus, selectEmployeesByIds} from "./features/employees/selectors";
import {RootState} from "./store";
import s from './App.module.scss';
import {useAppDispatch} from "./hooks/hooks";
import {getCompanies, getEmployees} from "./features/thunks";
import {deleteCompanyAction, deleteEmployeesAction} from "./features/actions";

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

  const deleteCompany = useCallback((ids: string[]) => {
    dispatch(deleteCompanyAction(ids))
    setSelectedCompanies((prevState) => prevState.filter((id) => !ids.includes(id)))
  }, [])

  const deleteEmployee = useCallback((ids: string[]) => {
    const companyIds = ids.map((id) => {
      const employee = employees.find((e) => e.id === id);
      return employee ? employee.companyId : 0;
    })
    dispatch(deleteEmployeesAction(ids, companyIds))
    setSelectedEmployees((prevState) => prevState.filter((id) => !ids.includes(id)))
  }, [employees])

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
