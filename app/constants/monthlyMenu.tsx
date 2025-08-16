export interface MenuItem {
  id: string;
  dayTitle: string; // "4 Ağustos, Pazartesi"
  mealTitle: string; // "Mercimek çorbası, kuru fasulye, pilav, cacık"
}

export interface WeekMenu {
  weekTitle: string; // "4-10 Ağustos"
  days: MenuItem[];
}

export const septemberMenu: WeekMenu[] = [
  {
    weekTitle: "2-8 Eylül",
    days: [
      {
        id: "1",
        dayTitle: "2 EYLÜL, PAZARTESİ",
        mealTitle: "Mercimek çorbası, kuru fasulye, pilav, cacık",
      },
      {
        id: "2",
        dayTitle: "3 EYLÜL, SALI",
        mealTitle: "Ezogelin çorbası, tavuk sote, bulgur pilavı, salata",
      },
      {
        id: "3",
        dayTitle: "4 EYLÜL, ÇARŞAMBA",
        mealTitle: "Domates çorbası, etli kuru fasulye, pilav, turşu",
      },
      {
        id: "4",
        dayTitle: "5 EYLÜL, PERŞEMBE",
        mealTitle: "Yayla çorbası, köfte, patates püresi, cacık",
      },
      {
        id: "5",
        dayTitle: "6 EYLÜL, CUMA",
        mealTitle: "Mantar çorbası, tavuk pirzola, pilav, salata",
      },
    ],
  },
  {
    weekTitle: "9-15 Eylül",
    days: [
      {
        id: "6",
        dayTitle: "9 EYLÜL, PAZARTESİ",
        mealTitle: "Tavuk çorbası, nohut yemeği, pilav, cacık",
      },
      {
        id: "7",
        dayTitle: "10 EYLÜL, SALI",
        mealTitle: "Mercimek çorbası, etli patlıcan, bulgur pilavı, salata",
      },
      {
        id: "8",
        dayTitle: "11 EYLÜL, ÇARŞAMBA",
        mealTitle: "Domates çorbası, karnıyarık, pilav, turşu",
      },
      {
        id: "9",
        dayTitle: "12 EYLÜL, PERŞEMBE",
        mealTitle: "Yayla çorbası, tavuk şiş, patates kızartması, cacık",
      },
      {
        id: "10",
        dayTitle: "13 EYLÜL, CUMA",
        mealTitle: "Mantar çorbası, köfte, pilav, salata",
      },
    ],
  },
  {
    weekTitle: "16-22 Eylül",
    days: [
      {
        id: "11",
        dayTitle: "16 EYLÜL, PAZARTESİ",
        mealTitle: "Ezogelin çorbası, kuru fasulye, pilav, cacık",
      },
      {
        id: "12",
        dayTitle: "17 EYLÜL, SALI",
        mealTitle: "Mercimek çorbası, tavuk sote, bulgur pilavı, salata",
      },
      {
        id: "13",
        dayTitle: "18 EYLÜL, ÇARŞAMBA",
        mealTitle: "Domates çorbası, etli kuru fasulye, pilav, turşu",
      },
      {
        id: "14",
        dayTitle: "19 EYLÜL, PERŞEMBE",
        mealTitle: "Yayla çorbası, köfte, patates püresi, cacık",
      },
      {
        id: "15",
        dayTitle: "20 EYLÜL, CUMA",
        mealTitle: "Mantar çorbası, tavuk pirzola, pilav, salata",
      },
    ],
  },
  {
    weekTitle: "23-29 Eylül",
    days: [
      {
        id: "16",
        dayTitle: "23 EYLÜL, PAZARTESİ",
        mealTitle: "Tavuk çorbası, nohut yemeği, pilav, cacık",
      },
      {
        id: "17",
        dayTitle: "24 EYLÜL, SALI",
        mealTitle: "Mercimek çorbası, etli patlıcan, bulgur pilavı, salata",
      },
      {
        id: "18",
        dayTitle: "25 EYLÜL, ÇARŞAMBA",
        mealTitle: "Domates çorbası, karnıyarık, pilav, turşu",
      },
      {
        id: "19",
        dayTitle: "26 EYLÜL, PERŞEMBE",
        mealTitle: "Yayla çorbası, tavuk şiş, patates kızartması, cacık",
      },
      {
        id: "20",
        dayTitle: "27 EYLÜL, CUMA",
        mealTitle: "Mantar çorbası, köfte, pilav, salata",
      },
    ],
  },
  {
    weekTitle: "30 Eylül - 6 Ekim",
    days: [
      {
        id: "21",
        dayTitle: "30 EYLÜL, PAZARTESİ",
        mealTitle: "Ezogelin çorbası, kuru fasulye, pilav, cacık",
      },
      {
        id: "22",
        dayTitle: "1 EKİM, SALI",
        mealTitle: "Mercimek çorbası, tavuk sote, bulgur pilavı, salata",
      },
      {
        id: "23",
        dayTitle: "2 EKİM, ÇARŞAMBA",
        mealTitle: "Domates çorbası, etli kuru fasulye, pilav, turşu",
      },
      {
        id: "24",
        dayTitle: "3 EKİM, PERŞEMBE",
        mealTitle: "Yayla çorbası, köfte, patates püresi, cacık",
      },
      {
        id: "25",
        dayTitle: "4 EKİM, CUMA",
        mealTitle: "Mantar çorbası, tavuk pirzola, pilav, salata",
      },
    ],
  },
];

// Helper function to get current week menu
export const getCurrentWeekMenu = (): WeekMenu | null => {
  const today = new Date();
  const currentWeek = septemberMenu.find((week) => {
    // This is a simplified logic - you might want to implement more sophisticated date matching
    return week.days.some((day) => {
      const dayDate = new Date(day.dayTitle.split(',')[0] + ' 2024');
      return dayDate.getTime() === today.getTime();
    });
  });

  return currentWeek || null;
};

// Helper function to get menu by week index
export const getWeekMenu = (weekIndex: number): WeekMenu | null => {
  return septemberMenu[weekIndex] || null;
};

// Helper function to get all weeks
export const getAllWeeks = (): WeekMenu[] => {
  return septemberMenu;
};
