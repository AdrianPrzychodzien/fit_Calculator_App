export interface dailyWeightInterface {
  date: string;
  weight: string;
}

export interface UserDataInterface {
  height: string;
  weight: string;
  age: string;
  sex: string;
  lifeActivity: number;
  fat: string;
  weightGoal: string;
  finish: string;
  start: string;
  dailyWeightArray: { date: string; weight: string }[];
  userId: any;
  formula: string;
}

export interface CircumInterface {
  waist: string;
  hips: string;
  neck: string;
  circumferences: any[];
}

export interface State {
  data: UserDataInterface;
  circum: CircumInterface;
}
