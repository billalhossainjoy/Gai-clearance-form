import { Student } from "@/components/allStudent/list/columns";
import ApiClient from "@/lib/apiClient";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface InitialState {
  isLoading: boolean;
  student: Student | null;
  error: unknown
}

const initialState: InitialState = {
  isLoading: false,
  student: null,
  error: null,
};

export const fetchStudentInfo = createAsyncThunk(
  "/student/get/roll",
  async (roll: string, { rejectWithValue }) => {
    try {
      const res = await ApiClient.get(`student/get/${roll}`);
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

const clientSlice = createSlice({
  name: "client",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStudentInfo.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.student = null
      })
      .addCase(fetchStudentInfo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.student = action.payload;
        state.error = null;
      })
      .addCase(fetchStudentInfo.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.student = null;
      });
  },
});

export default clientSlice.reducer;
