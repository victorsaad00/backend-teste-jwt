import { IPhones } from "./PhoneInterface";
export interface IUser {
  name: string;
  email: string;
  password: string;
  phones: IPhones[];
  creation_date: Date;
  last_login: Date;
  updated_at?: Date;
  token?: string;
}

// MODELO BASE
// {
//     "nome": "string",
//     "email": "string",
//     "senha": "senha",
//     "telefones": [
//      {
//      "numero": "123456789",
//      "ddd": "11"
//      }
//      ]
//     }
