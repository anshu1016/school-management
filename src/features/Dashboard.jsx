import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStudents } from "./students/studentSlice";
import { fetchTeachers } from "./teachers/teacherSlice";

export default function Dashboard() {
  const { students } = useSelector((state) => state.students);
  const { status } = useSelector((state) => state?.students);
  const dispatch = useDispatch();

  const findAvg = (arr, prop) => {
    return Math.floor(
      arr.reduce((acc, curr) => {
        return acc + curr[prop] / students.length;
      }, 0),
    );
  };

  const avgAttendance = findAvg(students, "attendance");
  const avgMarks = findAvg(students, "marks");
  const topper = students?.reduce((acc, curr) => {
    if (acc?.marks < curr.marks) return curr;
    else return acc;
  }, students[0]);

  useEffect(() => {
    dispatch(fetchStudents());
    dispatch(fetchTeachers());
  }, []);

  return (
    <div style={{ fontFamily: "Arial, sans-serif", padding: "20px" }}>
      <h2>School Management System</h2>
      {status === "loading" && <div>Loading...</div>}

      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div style={{ flex: 1 }}>
          <p>Total Students: {students.length}</p>
          <p>Average Attendance: {avgAttendance}</p>
          <p>Average Marks: {avgMarks}/500</p>
        </div>
        <br />
        <div style={{ flex: 1 }}>
          <br />
          <p>Top Student: {topper?.name}</p>
          <br />
          {topper && <p>Class: {topper?.grade}</p>}
        </div>
      </div>
    </div>
  );
}