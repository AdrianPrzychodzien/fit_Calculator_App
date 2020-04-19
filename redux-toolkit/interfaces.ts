export interface dailyWeightInterface {
  date: string;
  weight: number;
}

export interface UserDataInterface {
  height: number;
  weight: number;
  age: number;
  sex: string;
  lifeActivity: number;
  fat: number;
  weightGoal: number;
  finish: string;
  start: string;
  dailyWeightArray: { date: string; weight: number }[];
  userId: any;
  formula: string;
}

export interface CircumInterface {
  waist: number;
  hips: number;
  neck: number;
  circumferences: any[];
}

export interface State {
  data: UserDataInterface;
  circum: CircumInterface;
}
