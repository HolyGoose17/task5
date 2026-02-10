import { InputAuth, InputRegister } from './types';

export const inputsTypeAuth: InputAuth[] = [
  { name: 'username', placeholder: 'User Name', type: 'text' },
  { name: 'password', placeholder: 'Password', type: 'password' },
];

export const inputsTypeReg: InputRegister[] = [
  { name: 'username', placeholder: 'User Name', type: 'text' },
  { name: 'password', placeholder: 'Password', type: 'password' },
  { name: 'repeatPassword', placeholder: 'Repeat Password', type: 'password' },
];
