import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";
import axios from "axios";

export const fetchTeachers = createAsyncThunk(
  "teachers/fetchTeachers",
  async () => {
    const response = await axios.get(
      "https://school-management-d6sj.onrender.com/teachers",
    );
    return response?.data?.data;
  },
);

export const addteacherData = createAsyncThunk(
  "teachers/addteacherData",
  async (teacherData) => {
    const response = await axios.post(
      "https://school-management-d6sj.onrender.com/teachers",
      teacherData,
    );
    toast.success(response?.data?.message ?? "Success");
    return response.data.data;
  },
);

export const deleteteacherData = createAsyncThunk(
  "teachers/deleteteacherData",
  async (teacherId) => {
    const response = await axios.delete(
      `https://school-management-d6sj.onrender.com/teachers/${teacherId}`,
    );
    toast.success(response?.data?.message ?? "Success");
    return response.data.data;
  },
);
export const updateTeacherData = createAsyncThunk(
  "teachers/updateTeacherData",
  async (payload) => {
    const { id, formData: teacherData } = payload;
    const response = await axios.put(
      `https://school-management-d6sj.onrender.com/teachers/${id}`,
      teacherData,
    );
    toast.success(response?.data?.message ?? "Success");
    return response.data.data;
  },
);
export const teacherSlice = createSlice({
    name: "teachers",
    initialState: {
      teachers: [],
      error: null,
      status: "idle",
    },
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchTeachers.fulfilled, (state, action) => {
          state.teachers = action.payload;
          state.status = "success";
          state.error = null;
        })
        .addCase(fetchTeachers.rejected, (state, action) => {
          state.error = action.payload;
        })
        .addCase(fetchTeachers.pending, (state) => {
          state.status = "loading";
        })
        .addCase(addteacherData.fulfilled, (state, action) => {
          state.teachers = [action.payload, ...state.teachers];
          state.status = "success";
          state.error = null;
        })
        .addCase(addteacherData.rejected, (state, action) => {
          state.error = action.payload;
        })
        .addCase(addteacherData.pending, (state) => {
          state.status = "loading";
        })
        .addCase(deleteteacherData.fulfilled, (state, action) => {
          state.teachers = action.payload;
          state.status = "success";
          state.error = null;
        })
        .addCase(deleteteacherData.rejected, (state, action) => {
          state.error = action.payload;
        })
        .addCase(deleteteacherData.pending, (state) => {
          state.status = "loading";
        })
        .addCase(updateTeacherData.fulfilled, (state, action) => {
          state.teachers = action.payload;
          state.status = "success";
          state.error = null;
        })
        .addCase(updateTeacherData.rejected, (state, action) => {
          state.error = action.payload;
        })
        .addCase(updateTeacherData.pending, (state) => {
          state.status = "loading";
        });
    },
  });
  
export default teacherSlice.reducer;