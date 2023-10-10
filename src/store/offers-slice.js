import { createSlice } from "@reduxjs/toolkit";
import { fetchOffers } from "../thunks/offers.thunks";

const initialState = {
  offers: [],
  totalPrice: 0,
  loading: false,
};

export const offersSlice = createSlice({
  name: "offers",
  initialState,
  reducers: {
    changeSelectedQty: (state, action) => {
      const { id, selected } = action.payload;
      //save chosen Offer selected state to the store
      state.offers = state.offers.map((offer) => {
        if (offer.id === id) {
          return { ...offer, selected };
        }
        return offer;
      });
      //calculate total price of selected Offers
      const totalPrice = state.offers.reduce(
        (total, offer) => (offer.selected ? total + offer.price : total),
        0
      );
      state.totalPrice = totalPrice;
    },
    storeOffers: (state, { payload }) => {
      state.offers = payload;
    },
  },
  extraReducers: (builder) => {
    // TODO: handle asyncThunk state changes here: display/hide loader, add Offers to the store
    builder
      .addCase(fetchOffers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchOffers.fulfilled, (state, { payload }) => {
        state.status = "succeeded";
        state.offers = payload;
        state.loading = false;
      })
      .addCase(fetchOffers.rejected, (state, { error }) => {
        state.status = "failed";
        state.error = error.message;
      });
  },
});

export const { changeSelectedQty, storeOffers } = offersSlice.actions;

export default offersSlice.reducer;
