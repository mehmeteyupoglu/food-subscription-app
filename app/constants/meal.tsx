const deliveryOptions = [
  {
    label: 'Gel Al (6% İndirimli)',
    value: 'take_away',
  },
  {
    label: 'Restoranda Yemek (6% İndirimli)',
    value: 'dine_in',
  },
  {
    label: 'Paket',
    value: 'delivery',
  },
];

const subscriptionPlans = [
  {
    label: 'Haftalık (5 Gün)',
    value: 'weekly_5',
    status: 'active',
    discount: 3,
    duration: 5,
  },
  {
    label: 'Haftalık (6 Gün)',
    value: 'weekly_6',
    status: 'inactive',
    discount: 3,
    duration: 6,
  },
  {
    label: 'Haftalık (3 Gün)',
    value: 'weekly_3',
    status: 'inactive',
    discount: 2,
    duration: 3,
  },
  {
    label: 'Aylık (20 Gün)',
    value: 'monthly',
    status: 'active',
    discount: 4,
    duration: 20,
  },
  {
    label: 'Aylık (15 Gün)',
    value: 'monthly_15',
    status: 'inactive',
    discount: 3,
    duration: 15,
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

export {
  deliveryOptions, mealTypes, subscriptionPlans
};

// Default export to satisfy Expo Router
export default { deliveryOptions, subscriptionPlans, mealTypes };

