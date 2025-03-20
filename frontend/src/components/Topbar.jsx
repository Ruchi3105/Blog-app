import { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
import axios from "axios";

export default function TopBar() {
  const { user, dispatch } = useContext(Context);
  const PF = "http://localhost:5000/images/";

  const handleLogout = async () => {
    try {
      await axios.post(
        "/api/auth/logout",
        {},
        {
          withCredentials: true,
        }
      );
      dispatch({ type: "LOGOUT" });
    } catch (err) {
      console.log("Logout failed", err);
    }
  };
  return (
    <div className="">
      <div className="">
        <ul className="">
          <li className="">
            <Link className="" to="/">
              HOME
            </Link>
          </li>
          <li className="">
            <Link className="" to="/">
              ABOUT
            </Link>
          </li>
          <li className="">
            <Link className="" to="/">
              CONTACT
            </Link>
          </li>
          <li className="">
            <Link className="" to="/write">
              WRITE
            </Link>
          </li>
          <li className="" onClick={handleLogout}>
            {user && "LOGOUT"}
          </li>
        </ul>
      </div>
      <div className="">
        {user ? (
          <Link to="/settings">
            <img className="" src={PF + user.profilePic} alt="" />
          </Link>
        ) : (
          <ul className="">
            <li className="">
              <Link className="" to="/login">
                LOGIN
              </Link>
            </li>
            <li className="=">
              <Link className="" to="/register">
                REGISTER
              </Link>
            </li>
          </ul>
        )}
        <i className=""></i>
      </div>
    </div>
  );
}
