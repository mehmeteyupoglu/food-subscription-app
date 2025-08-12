export function calculateGroupDiscount(personCount: number): number {
  if (personCount <= 1) {
    return 0;
  }
  
  if (personCount <= 5) {
    return personCount;
  }
  
  return 4 + Math.floor(Math.min(personCount, 20) / 5);
}

export default {
  calculateGroupDiscount
}
