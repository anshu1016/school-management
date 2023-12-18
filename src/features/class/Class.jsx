import { useSelector } from "react-redux";
import ListItem from "../../component/ListItems";
import { useState } from "react";
import "./class.css"; // Import your CSS file

export default function Class() {
  const { students } = useSelector((state) => state?.students);
  const { status } = useSelector((state) => state?.students);
  const [filter, setFilter] = useState({
    grade: "",
    gender: "",
    category: "",
  });
  const classCategorised = filter.grade
    ? students?.filter((item) => item.grade === filter.grade)
    : students;

  const genderData = filter.gender
    ? classCategorised.filter((item) => item.gender === filter.gender)
    : classCategorised;
  const sortedData = filter.category
    ? [
        ...[...genderData].sort((a, b) =>
          filter.category === "name"
            ? a.name.localeCompare(b.name)
            : a[filter.category] - b[filter.category],
        ),
      ]
    : genderData;

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    if (name === "grade") setFilter({ ...filter, [name]: Number(value) });
    else setFilter({ ...filter, [name]: value });
  };

  return (
    <div className="class-container">
      <h1>Class View</h1>

      <select name="grade" id="class" onChange={onChangeHandler}>
        <option value="">Select Class</option>
        {Array.from({ length: 12 }, (_, i) => (
          <option key={i + 1} value={i + 1}>
            {i + 1}
          </option>
        ))}
      </select>
      <select name="gender" id="gender" onChange={onChangeHandler}>
        <option value="">Select Gender</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
        <option value="Not mention">Not mention</option>
      </select>

      <select name="category" id="" onChange={onChangeHandler}>
        <option value="">Sort by category</option>
        <option value="name">Name</option>
        <option value="age">Age</option>
        <option value="marks">Marks</option>
        <option value="attendance">Attendance</option>
      </select>

      <div>
        {status === "loading" && <div className="loader"></div>}
        <ul>
          <h4>List of Students</h4>
          {sortedData.length >= 1 ? (
            sortedData?.map((item) => (
              <ListItem
                key={item.id}
                item={item}
                type={"student"}
                inClassView={true}
              />
            ))
          ) : (
            <div className="no-results">
              No students found with these filters
            </div>
          )}
        </ul>
      </div>
    </div>
  );
}