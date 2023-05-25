const calculatePercentageYield = (position: number) => {
  if (position === 1) {
    return 100
  } else if (position >= 25) {
    return 5
  } else {
    const percentage = Math.round(100 * Math.exp(-0.15 * (position - 1)))
    return Math.max(percentage, 5)
  }
}

export const calculateRecordPoints = (
  position: number,
  levelPoints: number
) => {
  const percentage = calculatePercentageYield(position)
  return Math.floor(levelPoints * (percentage / 100))
}
