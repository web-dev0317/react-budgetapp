import { createSlice } from "@reduxjs/toolkit";

const wxmSlice = createSlice({
  name: "wxm",
  initialState: {
    budget: 0,
    savings: 0,
    spent: 0,
    spentToday: 0,
    expenses: [],
    tableEntries: [],
    history: [],
  },
  reducers: {
    setBudget(state, action) {
      if (action.payload.type === "SET") state.budget = action.payload.amount;
      else if (action.payload.type === "ADD")
        state.budget += action.payload.amount;
      else if (action.payload.type === "DED")
        state.budget -= action.payload.amount;
    },
    setSavings(state, action) {
      if (action.payload.type === "ADD") state.savings += action.payload.amount;
      else if (action.payload.type === "DED")
        state.savings -= action.payload.amount;
      else if (action.payload.type === "SET")
        state.savings = action.payload.amount;
    },
    setSpent(state, action) {
      if (action.payload.type === "ADD")
        state.spent = state.spent + action.payload.amount;
      else if (action.payload.type === "DED")
        state.spent = state.spent - action.payload.amount;
      else if (action.payload.type === "SET")
        state.spent = action.payload.amount;
    },
    setSpentToday(state, action) {
      if (action.payload.type === "ADD")
        state.spentToday = state.spentToday + action.payload.amount;
      else if (action.payload.type === "DED")
        state.spentToday = state.spentToday - action.payload.amount;
      else if (action.payload.type === "SET")
        state.spentToday = action.payload.amount;
    },
    setExpenses(state, action) {
      if (action.payload.type === "ADD")
        state.expenses = [action.payload.expense, ...state.expenses];
      else if (action.payload.type === "REMOVE") {
        const newEntries = state.expenses.filter(
          (entry) => entry.eid !== action.payload.eid
        );
        state.expenses = newEntries;
      } else if (action.payload.type === "SET") {
        state.expenses = action.payload.expenses;
      }
    },
    setTableEntries(state, action) {
      if (action.payload.type === "SET") {
        state.tableEntries = action.payload.tableEntries;
      } else {
        let tableEntries = state.tableEntries;
        let tableEntry = tableEntries.find(
          (e) => e.date === action.payload.date
        );
        if (tableEntry) {
          if (action.payload.type === "ADD")
            tableEntry.spent += action.payload.amount;
          else if (action.payload.type === "DED") {
            tableEntry.spent -= action.payload.amount;
            if (tableEntry.spent === 0) {
              const newTableEntries = tableEntries.filter(
                (e) => e.date !== action.payload.date
              );
              state.tableEntries = newTableEntries;
            }
          }
        } else if (action.payload.type === "ADD") {
          tableEntry = {
            date: action.payload.date,
            spent: action.payload.amount,
          };
          tableEntries.unshift(tableEntry);
        }
      }
    },
    setHistory(state, action) {
      if (action.payload.type === "SET") {
        state.history = action.payload.history;
      } else if (action.payload.type === "ADD") {
        state.history = [action.payload.history, ...state.history];
      }
    },
    resetExpenses(state) {
      state.expenses = [];
    },
    resetAll(state) {
      state.budget = 0;
      state.savings = 0;
      state.spent = 0;
      state.spentToday = 0;
      state.tableEntries = [];
      state.history = [];
    },
  },
});

export const wxmActions = wxmSlice.actions;

export default wxmSlice.reducer;
