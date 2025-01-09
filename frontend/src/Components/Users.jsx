import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const style = {
  table: {
    width: "40%",
    borderCollapse: "collapse",
  },
  tableCell: {
    border: "1px solid gray",
    margin: 0,
    padding: "5px 10px",
    width: "max-content",
    minWidth: "150px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
  },
  form: {
    container: {
      padding: "20px",
      border: "1px solid#F0F8FF",
      borderRadius: "15px",
      width: "max-content",
      marginBottom: "40px",
    },
    inputs: {
      marginBottom: "5px",
      border: "1px solid grey",
      borderRadius: "2px",
      height: "20px",
    },
  },
};

const UserTable = (props) => {
  const sortedContacts = props.user.sort((a, b) =>
    a.userName.localeCompare(b.userName)
  );

  const display =
    sortedContacts.length > 0 ? (
      sortedContacts.map((user, idx) => (
        <tr key={idx}>
          <td style={style.tableCell}>{user.userName}</td>
          <td style={style.tableCell}>{user.userPhone}</td>
          <td style={style.tableCell}>{user.userAge}</td>
        </tr>
      ))
    ) : (
      <tr>
        <td>&nbsp;</td>
      </tr>
    );

  return (
    <div>
      <h1>User Data</h1>
      <table style={style.table}>
        <thead>
          <tr>
            <th style={style.tableCell}>Name</th>
            <th style={style.tableCell}>Phone</th>
            <th style={style.tableCell}>Age</th>
          </tr>
        </thead>
        <tbody>{display}</tbody>
      </table>
    </div>
  );
};

const UserRegisteration = (props) => {
  const initUser = {
    id: null,
    userName: "",
    userPhone: "",
    userAge: "",
  };

  const [userData, setUserData] = useState(initUser);

  const handleUserChange = (event) => {
    setUserData({
      ...userData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!userData.userName || !userData.userPhone || !userData.userAge) return;
    props.addUser(userData);
    let res = fetch(
      "https://tnvl7zgvvf.execute-api.us-east-1.amazonaws.com/dev/api/post",
      {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "http://localhost:3000",
        },
        method: "POST",
        body: JSON.stringify(userData),
      }
    )
      .then((res) => res.json())
      .catch((err) => console.log(err))
      .then((response) => console.log(response));

    setUserData(initUser);
  };
  return (
    <div>
      <h1>User Registeration</h1>
      <form onSubmit={handleSubmit} style={style.form.container}>
        <label className="form-inputs">Name : </label>
        <br />
        <input
          className="userName"
          name="userName"
          type="text"
          style={style.form.inputs}
          onChange={handleUserChange}
          value={setUserData.userName}
        />
        <br />
        <label>Phone : </label>
        <br />
        <input
          className="userPhone"
          name="userPhone"
          type="text"
          style={style.form.inputs}
          onChange={handleUserChange}
          value={setUserData.userPhone}
        />
        <br />
        <label>Age : </label>
        <br />
        <input
          className="userAge"
          name="userAge"
          type="text"
          style={style.form.inputs}
          onChange={handleUserChange}
          value={setUserData.userAge}
        />
        <br />
        <br />
        <input className="submitButton" type="submit" value="Add User" />
      </form>
    </div>
  );
};

const User = () => {
  const router = new useNavigate();
  const userObj = [];
  const [users, setUsers] = useState(userObj);

  const addUser = (user) => {
    user.id = user.length + 1;
    setUsers([...users, user]);
  };
  return (
    <div style={style.grid}>
      <UserRegisteration addUser={addUser} />
      <UserTable user={users} />
    </div>
  );
};

export default User;
