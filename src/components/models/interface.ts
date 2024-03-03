export interface Matter {
  id: number;
  apoCategory: string | null; // DDLに追加されたフィールド
  deadFlg: number | null; // tinyint型ですが、TypeScriptではnumber型を使用
  nickName: string;
  appCategory: string | null;
  age: number | null;
  looksLevel: number | null;
  job: string | null;
  address: string | null;
  fhase: string | null; 
  nextApoDate: string | null; // datetime型ですが、TypeScriptではstring型を使用
  note: string | null;
  createdAt: string; // datetime(6)型ですが、TypeScriptではstring型を使用
  updatedAt: string; // datetime(6)型ですが、TypeScriptではstring型を使用
  completeFlg: number | null; // DDLに追加されたフィールド
  apoResult: string | null; // DDLに追加されたフィールド
  consumeMoney: number | null; // DDLに追加されたフィールド
}

export interface ApoResult {
  countApoTotal: number;
  countSokuTotal: number;
  countApoTotalMonthBefore: number;
  rateSokuMonthBefore: number;
  countMoneyTotalMonthBefore: number;
  forecastApoTotalCurrentMonth: number;
  rateSokuCurrentMonth: number;
  countMoneyTotalCurrentMonth: number;
}

// playerのインターフェースを追加
export interface Player {
  id: number;
  firstname: string;
  lastname: string;
  firstname_en: string | null;
  lastname_en: string | null;
  back_number: number | null;
  position: string;
  position2: string | null;
  meter: number;
  kg: number;
  seazon1: number;
  seazon2: number;
  team: string;
  team2: string | null;
  game: number | null;
  gs: number | null;
  mpg: number | null;
  percent_fg: number | null;
  percent_3point: number | null;
  percent_ft: number | null;
  rate_off: number | null;
  rate_def: number | null;
  ppg: number | null;
  rpg: number | null;
  apg: number | null;
  spg: number | null;
  bpg: number | null;
  turnover: number | null;
  per_foul: number | null;
  easy: number | null;
  normal: number | null;
  hard: number | null;
  historic: number | null;
  created_at: string;
  updated_at: string;
}
