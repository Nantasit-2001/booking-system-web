function startCountdown(durationInSeconds: number, onTick: (timeLeft: string) => void, onComplete?: () => void) {
  let remaining = durationInSeconds;

  const intervalId = setInterval(() => {
    const minutes = Math.floor(remaining / 60);
    const seconds = remaining % 60;

    const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    onTick(formattedTime);

    remaining--;

    if (remaining < 0) {
      clearInterval(intervalId);
      if (onComplete) onComplete();
    }
  }, 1000);

  return () => clearInterval(intervalId); // ฟังก์ชันหยุดนับถอยหลัง
}
export default startCountdown