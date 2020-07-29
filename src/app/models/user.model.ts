import { Address } from "./address.model";
import { Patient } from "./patient.model";
import { Professional } from "./professional.model";

export interface User {
    _id?: string;
    name: string;
    lastName: string;
    secondLastName?: string;
    gender?: string;
    birthDate?: string;
    nif?: string;
    address?: Address;
    patient?: Patient;
    professional?: Professional;
}