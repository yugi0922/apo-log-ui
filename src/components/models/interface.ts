export interface Matter {
  id: number;
  dead_flg: number | null;
  nick_name: string;
  app_category: string | null;
  age: number | null;
  looks_level: number | null;
  job: string | null;
  address: string | null;
  fhase: string | null;
  next_apo_date: string | null;
  note: string | null;
  created_at: string;
  updated_at: string;
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
