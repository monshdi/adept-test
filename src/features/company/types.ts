export interface Company {
  id: number;
  name: string;
  employeesCount: number;
  address: string;
}

export enum CompanyKeys {
  name = 'Название',
  employeesCount = 'Кол-во сотрудников',
  address = 'Адрес',
}