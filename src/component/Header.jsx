import { NavLink } from "react-router-dom";
import GitHubIcon from "@mui/icons-material/GitHub";
import StorageIcon from "@mui/icons-material/Storage";
import "./style/header.css";
export default function Header() {
  return (
    <header className="header">
      <div className="logo">School</div>
      <nav className="nav">
        <NavLink to="/" activeClassName="active-link" exact>
          Home
        </NavLink>
        <NavLink to="/teachers" activeClassName="active-link">
          Teachers
        </NavLink>
        <NavLink to="/students" activeClassName="active-link">
          Students
        </NavLink>
        <NavLink to="/class" activeClassName="active-link">
          Class view
        </NavLink>
        <a
          href="https://github.com/anshu1016"
          target="_blank"
          rel="noopener noreferrer"
          className="nav-link"
        >
          <GitHubIcon />
        </a>
        <a
          href="https://github.com/anshu1016"
          target="_blank"
          rel="noopener noreferrer"
          className="nav-link"
        >
          <StorageIcon />
        </a>
      </nav>
    </header>
  );
}
