// import { createSlice } from "@reduxjs/toolkit";
// import type { PayloadAction } from "@reduxjs/toolkit";


// export interface UserDetailState {
//   personalDetails?: {
//     firstName?: string;
//     lastName?: string;
//     email?: string;
//     dob?: string;
//     gender?: string;
//     phone?:string;
//     state?: string;
//     zone?:string;
//     password?:string;
//     _id?:string;
//   };
//   supportingDocs?: {}[];
//   educationalQualification?: {}[];
//   membership?: string;
// }

// const initialState: UserDetailState = {
//   personalDetails: {},
//   supportingDocs: [],
//   educationalQualification: [],
//   membership: "",
// };

// export const loginSlice = createSlice({
//   name: "userDetails",
//   initialState,
//   reducers: {
//     setPersonalDetails: (state, action: PayloadAction<UserDetailState>) => {
//       state.personalDetails = action.payload.personalDetails;
//     },
//     setSupportingDocs: (state, action: PayloadAction<UserDetailState>) => {
//       state.supportingDocs = action.payload.supportingDocs;
//     },
//     setEducatioanlQualification: (
//       state,
//       action: PayloadAction<UserDetailState>
//     ) => {
//       state.educationalQualification = action.payload.educationalQualification;
//     },
//     setMembership: (state, action: PayloadAction<UserDetailState>) => {
//       state.membership = action.payload.membership;
//     },
//   },
// });

// export const {
//   setPersonalDetails,
//   setSupportingDocs,
//   setEducatioanlQualification,
//   setMembership,
// } = loginSlice.actions;

// export default loginSlice.reducer;



import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import produce from "immer";

export interface UserDetailState {
  personalDetails?: {
    firstName?: string;
    lastName?: string;
    email?: string;
    dob?: string;
    gender?: string;
    phone?:string;
    state?: string;
    zone?:string;
    password?:string;
    _id?:string;
  };
  supportingDocs?: {}[];
  educationalQualification?: {}[];
  membership?: string;
}

const initialState: UserDetailState = {
  personalDetails: {},
  supportingDocs: [],
  educationalQualification: [],
  membership: "",
};

export const loginSlice = createSlice({
  name: "userDetails",
  initialState,
  reducers: {
    setPersonalDetails: (state, action: PayloadAction<UserDetailState>) => {
      state.personalDetails = action.payload.personalDetails;
    },
    setSupportingDocs: (state, action: PayloadAction<{}[]>) => {
      state.supportingDocs = produce(state.supportingDocs, draft => {
        draft?.push(...action.payload);
      });
    },
    setEducationalQualification: (state, action: PayloadAction<{}[]>) => {
      state.educationalQualification = produce(state.educationalQualification, draft => {
        draft?.push(...action.payload);
      });
    },

    // setEducationalQualification: (
    //   state,
    //   action: PayloadAction<{}[]>
    // ) => {
    //   state.educationalQualification = [...state.educationalQualification, ...action.payload];
    // },
    setMembership: (state, action: PayloadAction<string>) => {
      state.membership = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setPersonalDetails,
  setSupportingDocs,
  setEducationalQualification,
  setMembership,
} = loginSlice.actions;

export default loginSlice.reducer;
