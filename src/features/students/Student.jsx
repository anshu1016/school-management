import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ListItem from "../../component/ListItems";
import { addStudentData, fetchStudents } from "./studentSlice";
import "./students.css"; // Import your CSS file

export default function Students() {
  const initialFormValue = {
    name: "",
    age: "",
    grade: "",
    gender: "",
    attendance: "",
    marks: "",
  };
  const [formData, setFormData] = useState(initialFormValue);
  const { students } = useSelector((state) => state?.students);
  const { status } = useSelector((state) => state?.students);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchStudents());
  }, []);

  const onSubmitHandler = (e) => {
    e.preventDefault();
    console.log("submitted");
    dispatch(addStudentData(formData));
    setFormData(initialFormValue);
  };

  const onChangeHandler = (e) => {
    const { value, name } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="students-container">
      <h3>Students Page</h3>
      <form className="student-form" onSubmit={onSubmitHandler}>
        <input
          type="text"
          placeholder="Name"
          name="name"
          required
          onChange={onChangeHandler}
          value={formData.name}
        />
        <input
          type="number"
          name="age"
          id="age"
          min={3}
          max={20}
          placeholder="Age"
          required
          onChange={onChangeHandler}
          value={formData.age}
        />

        <select
          name="gender"
          id="gender"
          required
          onChange={onChangeHandler}
          value={formData.gender}
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Not Mention">Not Mention</option>
        </select>

        <input
          type="number"
          placeholder="Grade/Class"
          name="grade"
          id=""
          min={1}
          max={12}
          required
          onChange={onChangeHandler}
          value={formData.grade}
        />
        <input
          type="number"
          placeholder="Attendance"
          name="attendance"
          id=""
          min={0}
          max={300}
          required
          onChange={onChangeHandler}
          value={formData.attendance}
        />
        <input
          type="number"
          placeholder="Marks"
          name="marks"
          id=""
          min={0}
          max={500}
          required
          onChange={onChangeHandler}
          value={formData.marks}
        />
        <button className="submit-button">Submit</button>
      </form>
      {status === "loading" && <div className="loader"></div>}
      <ul>
        <h3>List of Students</h3>
        {students?.map((item) => (
          <ListItem key={item.id} item={item} type={"student"} />
        ))}
      </ul>
    </div>
  );
}