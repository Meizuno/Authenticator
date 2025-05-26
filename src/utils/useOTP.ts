import { TOTP } from "totp-generator";

export const useOTPState = () => {
  const duration = 30;
  const index = 3;
  const step = 100;

  const intervalId = ref<NodeJS.Timeout>();

  const { expires } = TOTP.generate("");
  const timer = useState("timer", () => expires - Date.now());
  const switcher = useState("switcher", () => true);
  const seconds = computed(() => {
    return Math.ceil(timer.value / 1000);
  });

  const start = () => {
    timer.value = getExpiration();
    intervalId.value = setInterval(() => {
      timer.value -= step;
      if (timer.value < 0) {
        switcher.value = !switcher.value;
        timer.value = getExpiration();
      }
    }, step);
  };

  const stop = () => {
    if (intervalId.value) {
      clearInterval(intervalId.value);
      intervalId.value = undefined;
    }
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
    stop,
    generate,
    getExpiration,
  };
};
