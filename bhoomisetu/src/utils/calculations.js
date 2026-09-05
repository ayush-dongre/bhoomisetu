export function percentComplete(acquired, required) {
  if (!required) return 0;
  return Math.min(100, Math.round((acquired / required) * 100));
}

export function estimateCompensationPerHa(ratePerHaLakh, areaHa) {
  return Math.round(ratePerHaLakh * areaHa * 100) / 100;
}

export function predictRisk(delayDays) {
  if (delayDays > 30) return { level: 'High Risk', score: 8 };
  if (delayDays >= 15) return { level: 'Medium Risk', score: 5 };
  return { level: 'Low Risk', score: 2 };
}
