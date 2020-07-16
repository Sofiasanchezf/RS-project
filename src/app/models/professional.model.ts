

export type professional = 'Doctor' | 'Nurse' | 'Administrative' | '';

export interface Professional {
    medicalBoardNumber: string;
    professionalType?: professional;
}