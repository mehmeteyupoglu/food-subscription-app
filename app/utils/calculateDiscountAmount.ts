export function calculateDiscountAmount(discountPercentage: number, basePrice: number): number {
  const discount = (discountPercentage * basePrice) / 100;
  return Number(discount.toFixed(2));
}

export default {
  calculateDiscountAmount
}