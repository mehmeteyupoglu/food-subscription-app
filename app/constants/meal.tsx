const baseMealPrice = 310;

const deliveryOptions = [
  {
    label: 'GEL AL',
    value: 'take_away',
    discount: 6,
  },
  {
    label: 'RESTORANDA YE',
    value: 'dine_in',
    discount: 6,
  },
  {
    label: 'PAKET SERVİS',
    value: 'delivery',
    discount: 0,
  },
];

const subscriptionPlans = [
  {
    label: 'Haftalık (5 Gün)',
    value: 'weekly_5',
    status: 'active',
    discount: 3,
    duration: 5,
    discountLabel: 'HAFTALIK ABONELİK FIRSATI',
  },
  {
    label: 'Haftalık (6 Gün)',
    value: 'weekly_6',
    status: 'inactive',
    discount: 3,
    duration: 6,
    discountLabel: 'HAFTALIK ABONELİK FIRSATI',
  },
  {
    label: 'Haftalık (3 Gün)',
    value: 'weekly_3',
    status: 'inactive',
    discount: 2,
    duration: 3,
    discountLabel: 'HAFTALIK ABONELİK FIRSATI',
  },
  {
    label: 'Aylık (20 Gün)',
    value: 'monthly',
    status: 'active',
    discount: 4,
    duration: 20,
    discountLabel: 'AYLIK ABONELİK FIRSATI',
  },
  {
    label: 'Aylık (15 Gün)',
    value: 'monthly_15',
    status: 'inactive',
    discount: 3,
    duration: 15,
    discountLabel: 'AYLIK ABONELİK FIRSATI',
  }
]

const mealTypes = [
  {
    label: 'Öğle',
    value: 'lunch',
  },
  {
    label: 'Akşam',
    value: 'dinner',
  },
  {
    label: '2 öğün',
    value: '2_meals',
  },
]

export { baseMealPrice, deliveryOptions, mealTypes, subscriptionPlans };

// Default export to satisfy Expo Router
export default { deliveryOptions, subscriptionPlans, mealTypes, baseMealPrice };

