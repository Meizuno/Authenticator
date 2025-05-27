import Dexie, { type EntityTable } from "dexie";

export interface Code {
  id: number;
  service: string;
  account: string;
  key: string;
  base: 'Time based' | 'Counter based';
}

const db = new Dexie("CodesDatabase") as Dexie & {
  codes: EntityTable<Code, "id">;
};

db.version(1).stores({
  codes: "++id, service, account, key, base",
});

export { db };
