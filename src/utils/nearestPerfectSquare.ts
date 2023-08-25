export const nearestPerfectSquare = (num: number) => {
  if (num <= 0) return 0;

  const lowerSqrt = Math.floor(Math.sqrt(num));
  const upperSqrt = lowerSqrt + 1;

  const lowerSquare = lowerSqrt * lowerSqrt;
  const upperSquare = upperSqrt * upperSqrt;

  if (num - lowerSquare <= upperSquare - num) {
    return lowerSquare;
  }
  return upperSquare;
};
