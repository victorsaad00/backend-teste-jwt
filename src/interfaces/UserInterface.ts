import { IPhones } from "./PhoneInterface";
export interface IUser {
  _id: string;
  name: string;
  email: string;
  password: string;
  phones: IPhones[];
  creationDate: Date;
  lastLogin: Date;
  updatedAt: Date;
  token: string;
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
