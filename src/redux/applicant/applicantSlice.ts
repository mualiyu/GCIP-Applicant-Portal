import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface ApplicantState {
  applicant: {
    lots?: {
      name: string;
      region: string;
      category: string;
      subLots?: any[];
    }[];
    subLots?: any[];
    status: string;
  };
  categories?: any;
  regions?: any;
  application?: {
    applicant_id?: string;
    id?: string;
    program_id?: string;
  };
  activeTab?: number;
}

const initialState: ApplicantState = {
  applicant: {
    lots: [],
    subLots: [],
    status: "",
  },
  categories: [],
  regions: [],
  application: {
    applicant_id: "",
    program_id: "",
    id: "",
  },
  activeTab: 0,
};

export const applicant = createSlice({
  name: "applicant",
  initialState,
  reducers: {
    setLots: (state, action) => {
      state.applicant.lots = action.payload;
    },
    setCategories: (state, action) => {
      state.categories = action.payload;
    },
    setRegions: (state, action) => {
      state.regions = action.payload;
    },
    setStatus: (state, action) => {
      state.applicant.status = action.payload;
    },
    setSubLots: (state, action) => {
      state.applicant.subLots = action.payload;
    },
    setApplication: (state, action) => {
      state.application = action.payload;
    },
    setActiveTab: (state, action) => {
      state.activeTab = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setCategories,
  setLots,
  setRegions,
  setStatus,
  setSubLots,
  setApplication,
  setActiveTab,
} = applicant.actions;

export default applicant.reducer;
