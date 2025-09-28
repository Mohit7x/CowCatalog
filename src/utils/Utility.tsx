export type Sex = 'Male' | 'Female';

export type Status = 'Active' | 'In Treatment' | 'Deceased';

export interface CowEvent {
  id: string;
  type: string;
  date: string;
  note?: string;
  value?: number;
}

export interface Cow {
  id: string;
  earTag: string;
  sex: Sex;
  pen: string;
  status: Status;
  weight?: number;
  dailyWeightGain?: number;
  events: CowEvent[];
  createdAt: string;
  lastEventDate?: string;
}