import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";
import axios from "axios";

export const fetchStudents = createAsyncThunk(
  "students/fetchStudents",
  async () => {
    const response = await axios.get(
      "https://school-management-d6sj.onrender.com/students",
    );
    return response?.data?.data;
  },
);

export const addStudentData = createAsyncThunk(
  "students/addStudentData",
  async (studentData) => {
    console.log({ studentData });
    const response = await axios.post(
      "https://school-management-d6sj.onrender.com/students",
      studentData,
    );
    toast.success(response?.data?.message ?? "Success");
    return response.data.data;
  },
);

export const deleteStudentData = createAsyncThunk(
  "students/deleteStudentData",
  async (studentId) => {
    const response = await axios.delete(
      `https://school-management-d6sj.onrender.com/students/${studentId}`,
    );
    toast.success(response?.data?.message ?? "Success");
    return response.data.data;
  },
);
export const updateStudent = createAsyncThunk(
  "students/updateStudent",
  async (payload) => {
    const { id, formData } = payload;
    const response = await axios.post(
      `https://school-management-d6sj.onrender.com/students/${id}`,
      formData,
    );
    toast.success(response?.data?.message ?? "Success");
    return response.data.data;
  },
);

export const studentSlice = createSlice({
    name: "students",
    initialState: {
      students: [],
      error: null,
      status: "idle",
    },
    reducers: {},
  
    extraReducers: (builder) => {
      builder
        .addCase(fetchStudents.fulfilled, (state, action) => {
          state.students = action.payload;
          state.status = "success";
        })
        .addCase(fetchStudents.rejected, (state, action) => {
          state.error = action.payload;
        })
        .addCase(fetchStudents.pending, (state) => {
          state.status = "loading";
        })
        .addCase(addStudentData.fulfilled, (state, action) => {
          state.students = [action.payload, ...state.students];
          state.status = "success";
        })
        .addCase(addStudentData.rejected, (state, action) => {
          state.error = action.payload;
        })
        .addCase(addStudentData.pending, (state) => {
          state.status = "loading";
        })
        .addCase(deleteStudentData.fulfilled, (state, action) => {
          state.students = action.payload;
          state.status = "success";
        })
        .addCase(deleteStudentData.rejected, (state, action) => {
          state.error = action.payload;
        })
        .addCase(deleteStudentData.pending, (state) => {
          state.status = "loading";
        })
        .addCase(updateStudent.fulfilled, (state, action) => {
          state.students = action.payload;
          state.status = "success";
        })
        .addCase(updateStudent.rejected, (state, action) => {
          state.error = action.payload;
        })
        .addCase(updateStudent.pending, (state) => {
          state.status = "loading";
        });
    },
  });
  
  export default studentSlice.reducer