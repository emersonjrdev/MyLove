import { useEffect, useMemo, useState } from "react";

function diffParts(startDate) {
  const now = new Date();
  const ms = Math.max(0, now.getTime() - startDate.getTime());
  const totalSeconds = Math.floor(ms / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return { days, hours, minutes, seconds };
}

export default function useLoveCounter(startDate) {
  const [counter, setCounter] = useState(() => diffParts(startDate));

  useEffect(() => {
    setCounter(diffParts(startDate));
    const timer = setInterval(() => {
      setCounter(diffParts(startDate));
    }, 1000);
    return () => clearInterval(timer);
  }, [startDate]);

  const text = useMemo(
    () =>
      `${counter.days} dias, ${counter.hours} horas, ${counter.minutes} minutos e ${counter.seconds} segundos`,
    [counter]
  );

  return { ...counter, text };
}
