export type issuranceType = '' | 'salud' | 'familiar' | 'dental';

export interface Issurance {
    cardNumber: string;
    name: string;
    type: issuranceType;
}