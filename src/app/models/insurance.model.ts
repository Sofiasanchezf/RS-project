export type insuranceType = '' | 'Health' | 'Family' | 'Dental';

export interface Insurance {
    cardNumber: string;
    name: string;
    type: insuranceType;
}