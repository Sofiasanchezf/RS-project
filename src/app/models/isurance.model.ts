export type isuranceType = '' | 'Health' | 'Family' | 'Dental';

export interface Isurance {
    cardNumber: string;
    name: string;
    type: isuranceType;
}