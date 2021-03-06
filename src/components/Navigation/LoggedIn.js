import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../store/user/actions";
import Button from "react-bootstrap/Button";
import { selectUser } from "../../store/user/selectors";
import Nav from "react-bootstrap/Nav";
import { Link } from "react-router-dom/cjs/react-router-dom.min";


export default function LoggedIn() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  return (
    <>
      <Nav.Item style={{ padding: ".5rem 1rem" }}>Welcome <b>{user.name}</b></Nav.Item>
      <Link to={"./"}><Button onClick={() => dispatch(logOut())}>Logout</Button></Link>
    </>
  );
}
