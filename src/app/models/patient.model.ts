import { User } from "./user.model";
import { Isurance } from "./isurance.model";

// export interface Patient extends User {
  export interface Patient {
    nhc: string;
    isuranceList?: Isurance[];
  }