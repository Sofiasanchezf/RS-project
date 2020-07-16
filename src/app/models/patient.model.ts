import { User } from "./user.model";
import { Issurance } from "./issurance.model";

// export interface Patient extends User {
  export interface Patient {
    nhc: string;
    issuranceList?: Issurance;
  }