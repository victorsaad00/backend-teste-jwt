import { IPhones } from "./PhoneInterface";
export interface IUser {
  nome: string;
  email: string;
  senha: string;
  telefones: IPhones[];
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
