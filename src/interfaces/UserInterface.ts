import { IPhones } from "./PhoneInterface";
import { Document } from "mongoose";

export interface IUser extends Document {
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
