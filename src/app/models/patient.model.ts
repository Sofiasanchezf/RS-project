import { User } from "./user.model";
import { Insurance } from "./insurance.model";

// export interface Patient extends User {
  export interface Patient {
    nhc: string;
    insuranceList?: Insurance[];
  }