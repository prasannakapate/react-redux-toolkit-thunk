import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchOffers = createAsyncThunk("offers/fetchOffers", async () => {
  //fetch Offers from API here and save them to the store
  const response = await fetch("http://localhost:3001/offers");
  const data = await response.json();
  return data;
});
