import { User } from "./user.model";
import { Issurance } from "./issurance.model";

export interface Patient extends User {

    nhc: string;
    issuranceList?: Issurance[];
    
  }