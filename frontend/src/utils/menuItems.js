import { dashboard, expenses, trend, limit } from "../utils/Icons";

export const menuItems = [
  { id: 1, title: "Dashboard", icon: dashboard, link: "/dashboard" },
  { id: 2, title: "Incomes", icon: trend, link: "/dashboard/income" },
  { id: 3, title: "Expenses", icon: expenses, link: "/dashboard/expenses" },
  { id: 5, title: "Add Limit", icon: limit, link: "/dashboard/limits" },
];
