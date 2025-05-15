import Dexie, { type EntityTable } from "dexie";

export enum Base {
  TIME = "Time based",
  COUNTER = "Counter based",
}

export interface Code {
  id: number;
  name: string;
  key: string;
  base: Base;
}

const db = new Dexie("CodesDatabase") as Dexie & {
  codes: EntityTable<Code, "id">;
};

db.version(1).stores({
  friends: "++id, name, key, base",
});

export { db };
