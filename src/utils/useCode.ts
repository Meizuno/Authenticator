const codes = ref([] as Code[]);

export const useCodeState = () => {
  const getCodes = async () => {
    codes.value = await db.codes.toArray();
  };

  const getCode = async (id: number) => {
    return await db.codes.get(id);
  };

  const addCode = async (code: Code) => {
    const id = await db.codes.add({
      service: code.service,
      account: code.account,
      key: code.key,
    });
    codes.value.push({ ...code, id });
  };

  const updateCode = async (id: number, code: Code) => {
    await db.codes.update(id, {
      service: code.service,
      account: code.account,
      key: code.key,
    });
    codes.value = codes.value.map((c) => (c.id === id ? code : c));
  };

  const deleteCode = async (id: number) => {
    await db.codes.delete(id);
    codes.value = codes.value.filter((code) => code.id !== id);
  };

  return {
    codes,
    getCodes,
    getCode,
    addCode,
    updateCode,
    deleteCode,
  };
};
