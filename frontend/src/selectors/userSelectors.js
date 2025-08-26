// src/selectors/userSelectors.js
import { createSelector } from "reselect";

const selectUser = (state) => state.auth.user;

export const selectUserAddresses = createSelector(
  [selectUser],
  (user) => user?.addresses || []
);
