import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./teachers.css"; // Import your CSS file

import ListItem from "../../component/ListItems";
import { addteacherData, fetchTeachers } from "./teacherSlice";

export default function Teachers() {
  const initialFormValue = {
    name: "",
    subject: "",
    contact: "",
  };
  const [formData, setFormData] = useState(initialFormValue);
  const { teachers } = useSelector((state) => state?.teachers);
  const { status } = useSelector((state) => state?.teachers);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchTeachers());
  }, []);
  const onSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(addteacherData(formData));
    setFormData(initialFormValue);
  };
  const onChangeHandler = (e) => {
    const { value, name } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  return (
    <div className="teachers-container">
      <h3>Teachers Page</h3>
      <form className="teacher-form" onSubmit={onSubmitHandler}>
        <input
          className="form-input"
          type="text"
          placeholder="name"
          name="name"
          required
          value={formData.name}
          onChange={onChangeHandler}
        />
        <input
          className="form-input"
          type="number"
          name="contact"
          id="contact"
          min={6000000000}
          max={9999999999}
          placeholder="Contact Number"
          required
          value={formData.contact}
          onChange={onChangeHandler}
        />

        <select
          className="form-input"
          name="subject"
          id="subject"
          required
          value={formData.subject}
          onChange={onChangeHandler}
        >
          <option value="">Select subject</option>
          <option value="English">English</option>
          <option value="Hindi">Hindi</option>
          <option value="Mathematics">Mathematics</option>
          <option value="Social Science">Social Science</option>
          <option value="Science">Science</option>
          <option value="Computer">Computer</option>
          <option value="Physical Education">Physical Education</option>
          <option value="Sanskrit">Sanskrit</option>
        </select>

        <button className="form-button">Submit</button>
      </form>
      {status === "loading" && <div className="loader"></div>}
      <ul>
        {teachers?.map((item) => (
          <ListItem key={item.id} item={item} type={"teacher"} />
        ))}
      </ul>
    </div>
  );
}