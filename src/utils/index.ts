import { db, type Code } from "~/db";
import { TOTP } from "totp-generator";

export const getCodes = async () => {
  return await db.codes.toArray();
};

export const getCode = async (id: number) => {
  return await db.codes.get(id);
};

export const addCode = async (code: Code) => {
  await db.codes.add({
    name: code.name,
    key: code.key,
    base: code.base,
  });
};

export const updateCode = async (code: Code) => {
  await db.codes.update(code.id, code);
};

export const deleteCode = async (id: number) => {
  await db.codes.delete(id);
};

export const useOTPState = () => {
  const duration = 30;
  const index = 3;
  const step = 100;

  const { expires } = TOTP.generate("");
  const timer = useState("timer", () => expires - Date.now());
  const switcher = useState("switcher", () => true);
  const seconds = computed(() => {
    return Math.ceil(timer.value / 1000);
  });

  const start = () => {
    setInterval(() => {
      timer.value -= step;
      if (timer.value < 0) {
        switcher.value = !switcher.value;
        timer.value = getExpiration();
      }
    }, step);
  };

  const getExpiration = () => {
    const { expires } = TOTP.generate("");
    return expires - Date.now();
  };

  const generate = (secret: string) => {
    const { otp } = TOTP.generate(secret);
    return otp.slice(0, index) + " " + otp.slice(index);
  };

  return {
    duration,
    timer,
    step,
    switcher,
    seconds,

    start,
    generate,
    getExpiration,
  };
};
