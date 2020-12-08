export interface UserInterface {
  name: string;
  password: string;
  center: string
}

export const USERS: UserInterface[] = [
    {name: 'usuario1',password: 'usuario1', center: 'center-1'},
    {name: 'usuario2',password: 'usuario2', center: 'center-2'},
    {name: 'usuario3',password: 'usuario3', center: 'center-3'}
];