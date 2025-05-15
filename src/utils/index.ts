import { db, type Code } from "~/db";

export const getCodes = async () => {
  return await db.codes.toArray();
}

export const getCode = async (id: number) => {
  return await db.codes.get(id);
}

export const addCode = async (code: Code) => {
  await db.codes.add(code);
};

export const updateCode = async (code: Code) => {
  await db.codes.update(code.id, code);
};

export const deleteCode = async (id: number) => {
  await db.codes.delete(id);
};
