import { useEffect, useState } from "react";
import cx from "classnames";
import styles from "../styles/Signin.module.css";
import Router from "next/router";
const jsSHA = require("jssha");

/*
  Users:
    Student:
      Username: basma
      Password: password123
    Faculty:
      Username: Lee
      Password: passwor  d
    Professor:
      Username: Kumar
      Password: abc12345
*/

export default function Home() {
  const [connection, setConnection] = useState();
  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [userIsNotCorrect, setUserIsNotCorrect] = useState(false);

  const queryData = async (query) => {
    const apiUrlEndpoint = "http://localhost:3000/api/getdata?query=" + query;

    const response = await fetch(apiUrlEndpoint);
    const responseJson = await response.json();

    return responseJson.dataArray;
  };

  useEffect(() => {
    const getUsers = async () => {
      const response = await queryData("SELECT * from user");

      setUsers(response);
    };

    getUsers();
  }, []);

  const getUser = () => {
    const user = users.filter((userM) => userM.name === username)[0];

    return user;
  };

  const isPasswordCorrect = (user) => {
    if (!user) return false;

    const shaObj = new jsSHA("SHA-512", "TEXT", { encoding: "UTF8" });

    shaObj.update(password); //Add password as the text of shaObj
    const hash = shaObj.getHash("HEX"); //Convert password to hex

    return hash.includes(user.password_hash);
  };

  const submitUserRequest = (event) => {
    event.preventDefault();

    const user = getUser();
    const passwordIsCorrect = isPasswordCorrect(user);

    /*
      101 = Student
      102 = Professor
      103 = Faculty
    */
    if (user && passwordIsCorrect) {
      if (user.roleId == 101)
        Router.push({
          pathname: "/student",
          query: { studentID: user.id },
        });
      else if (user.roleId == 102)
        Router.push({
          pathname: "/professor",
          query: { profId: user.id },
        });
      else if (user.roleId == 103)
        window.location.replace("http://localhost:3000/faculty");
    } else if (!user) {
      setUserIsNotCorrect(true);
      console.log("User does not exist!");
    } else {
      console.log("Incorrect Password");
    }
  };

  return (
    <>
      <main className={cx(styles["form-signin"], "text-center", "mt-5")}>
        <form>
          <h1 className="h3 mb-3 fw-normal">Please sign in</h1>
          <label htmlFor="floatingInput">Username</label>
          <div className="mb-6">
            <input
              type="text"
              className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              id="floatingInput"
              placeholder="User Name"
              value={username}
              onChange={(event) => {
                setUsername(event.target.value);
                setUserIsNotCorrect(false);
              }}
            />
          </div>

          <div className="form-floating"></div>
          <div class="mb-6">
            <label htmlFor="floatingPassword">Password</label>

            <input
              type="password"
              class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              id="floatingPassword"
              placeholder="Password"
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
                setUserIsNotCorrect(false);
              }}
            />
          </div>

          <div className={cx(styles.checkbox, "mb-3")}>
            <label>
              <input type="checkbox" value="remember-me" /> Remember me
            </label>
          </div>
          <button
            className="w-100 btn btn-lg btn-primary"
            type="submit"
            onClick={submitUserRequest}
          >
            Sign in
          </button>
          {userIsNotCorrect && (
            <div style={{ color: "red" }}>User is not correct</div>
          )}
        </form>
      </main>
    </>
  );
}
