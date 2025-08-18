export interface MenuItem {
  id: string;
  dayTitle: string; // "4 Ağustos, Pazartesi"
  mealTitle: string; // "Mercimek çorbası, kuru fasulye, pilav, cacık"
}

export interface WeekMenu {
  weekTitle: string; // "4-10 Ağustos"
  days: MenuItem[];
}