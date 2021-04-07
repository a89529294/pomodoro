function convertSecondsIntoMinutes(durationInSeconds) {
  if (durationInSeconds > 3600) throw new Error('exceed one hour');

  const baseMin = Math.floor(durationInSeconds / 60);
  const baseSec = durationInSeconds % 60;

  const min = baseMin >= 10 ? baseMin : '0' + baseMin;
  const sec = baseSec >= 10 ? baseSec : '0' + baseSec;
  return `${min}:${sec}`;
}

export default convertSecondsIntoMinutes;
