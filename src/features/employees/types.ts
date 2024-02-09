export interface Employee {
  id: string,
  name: string;
  lastName: string;
  post: string;
  companyId: number;
}

export enum EmployeeKeys {
  lastName = 'Фамилия',
  name = 'Имя',
  post = 'Должность',
}
