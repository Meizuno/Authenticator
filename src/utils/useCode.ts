import { db, type Code } from "~/db";

export const useCodeState = () => {
  const codes = useState("codes", () => [] as Code[]);

  const getCodes = async () => {
    codes.value = await db.codes.toArray();
  };

  const getCode = async (id: number) => {
    return await db.codes.get(id);
  };

  const addCode = async (code: Code) => {
    await db.codes.add({
      name: code.name,
      key: code.key,
      base: code.base,
    });
  };

  const updateCode = async (id: number, code: Code) => {
    await db.codes.update(id, {
      name: code.name,
      key: code.key,
      base: code.base,
    });
  };

  const deleteCode = async (id: number) => {
    await db.codes.delete(id);
  };

  return { codes, getCodes, getCode, addCode, updateCode, deleteCode };
};
