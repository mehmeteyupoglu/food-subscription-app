import { monthlyMenu } from "@/dummydata/monthlyMenu";
import { WeekMenu } from "@/types/menu";

export const getWeekMenu = (weekIndex: number): WeekMenu | null => {
  return monthlyMenu[weekIndex] || null;
};

export const getAllWeeks = (): WeekMenu[] => {
  return monthlyMenu;
};


