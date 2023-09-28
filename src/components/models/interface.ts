export interface Matter {
  id: number; // int NOT NULL AUTO_INCREMENT
  dead_flg: number | null; // tinyint DEFAULT NULL
  nick_name: string; // varchar(255) NOT NULL
  app_category: string | null; // varchar(255) DEFAULT NULL
  age: number | null; // int DEFAULT NULL
  looks_level: number | null; // int DEFAULT NULL
  job: string | null; // varchar(255) DEFAULT NULL
  address: string | null; // varchar(255) DEFAULT NULL
  fhase: string | null; // varchar(255) DEFAULT NULL
  next_apo_date: string | null; // datetime DEFAULT NULL
  note: string | null; // varchar(255) DEFAULT NULL
  created_at: string; // datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)
  updated_at: string; // datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)
}
