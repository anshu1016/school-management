import { NavLink } from "react-router-dom";
import "./style/listStyle.css"; // Import your CSS file

export default function ListItem({ item, type, inClassView }) {
  return (
    <li className="list-item" key={item._id}>
      <NavLink to={`/${type}/${item._id}`}>
        <span>{item.name}</span>
      </NavLink>
      {item.marks && (
        <>
          <span>Class: {item.grade}</span>

          {inClassView && (
            <>
              <span>Age: {item.age}</span>
              <span>Gender: {item.gender}</span>
              <span>Attendance: {item.attendance}</span>
              <span>Marks: {item.marks}/500</span>
            </>
          )}
        </>
      )}
      {item.subject && (
        <>
          <span>Subject: {item.subject}</span>
        </>
      )}
    </li>
  );
}