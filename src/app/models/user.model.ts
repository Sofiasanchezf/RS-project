import { Address } from "./address.model";

export interface User {
    _id: number;
    name: string;
    lastName: string;
    secondLastName?: string;
    gender?: string;
    birthDate?: string;
    nif?: string;
    address?: Address;
}