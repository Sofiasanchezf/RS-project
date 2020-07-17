export type issuranceType = '' | 'Health' | 'Family' | 'Dental';

export interface Issurance {
    cardNumber: string;
    name: string;
    type: issuranceType;
}