import { useRef, useState } from "react";

export const Clock = () => {
  const [count, setCount] = useState(0);
  const timerRef = useRef();
  const startClock = () => {
    timerRef.current = setInterval(() => {
      setCount((count) => count + 1);
      console.log(
        `current value of timeRef inside startClock ${timerRef.current}`,
      );
      console.log(`value of timeRef object inside startClock ${timerRef}`);
    }, 2000);
  };
  const stopClock = () => {
    clearInterval(timerRef.current);
    console.log(
      `current value of timeRef inside StopClock ${timerRef.current}`,
    );
  };
  return (
    <>
      {count}
      <button onClick={startClock}>start</button>
      <button onClick={stopClock}>stop</button>
    </>
  );
};
