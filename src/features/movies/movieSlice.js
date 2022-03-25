import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import movieApi from "../../common/apis/movieApi";
import { Apikey } from "../../common/apis/movieApiKey";

export const fetchAsyncMovies = createAsyncThunk(
  "movies/fetchAsyncMovies",
  async (term) => {
    // const movieText = "Harry";

    const response = await movieApi
      .get(`?apiKey=${Apikey}&s=${term}&type=movie`)
      .catch((error) => console.log(error));
    // console.log(response);
    return response.data;
  }
);

export const fetchAsyncShows = createAsyncThunk(
  "movies/fetchAsyncShows",
  async (term) => {
    // const seriesText = "Friends";

    const response = await movieApi
      .get(`?apiKey=${Apikey}&s=${term}&type=series`)
      .catch((error) => console.log(error));
    console.log(response);
    return response.data;
  }
);

export const fetchAsyncDetails = createAsyncThunk(
  "movies/fetchAsyncDetails",
  async (id) => {
    const response = await movieApi
      .get(`?apiKey=${Apikey}&i=${id}&Plot=full`)
      .catch((error) => console.log(error));
    // console.log(response);
    return response.data;
  }
);

const initialState = {
  movies: {},
  shows: {},
  selectedDetails: {},
};

const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    removeSelectedDetails: (state) => {
      state.selectedDetails = {};
    },
  },
  extraReducers: {
    [fetchAsyncMovies.pending]: () => {
      console.log("pending");
    },
    [fetchAsyncMovies.fulfilled]: (state, { payload }) => {
      console.log("fetched successfully");

      return { ...state, movies: payload };
    },
    [fetchAsyncMovies.rejected]: () => {
      console.log("rejected");
    },
    [fetchAsyncShows.fulfilled]: (state, { payload }) => {
      // console.log("fetched successfully");

      return { ...state, shows: payload };
    },
    [fetchAsyncDetails.fulfilled]: (state, { payload }) => {
      // console.log("fetched successfully");

      return { ...state, selectedDetails: payload };
    },
  },
});

export const { removeSelectedDetails } = movieSlice.actions;
export const getAllMovies = (state) => state.movies.movies;
export const getAllShows = (state) => state.movies.shows;
export const getSelectedDetails = (state) => state.movies.selectedDetails;
export default movieSlice.reducer;
