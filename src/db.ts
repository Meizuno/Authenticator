import Dexie, { type EntityTable } from "dexie";

export interface Code {
  id: number;
  name: string;
  key: string;
  base: 'Time based' | 'Counter based';
}

const db = new Dexie("CodesDatabase") as Dexie & {
  codes: EntityTable<Code, "id">;
};

db.version(1).stores({
  codes: "++id, name, key, base",
});

db.open().catch((err) => {
  console.error("Failed to open DB:", err);
});

export { db };
