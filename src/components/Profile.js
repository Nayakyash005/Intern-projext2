import React, { useContext } from "react";
import { Authcontext } from "./Authcontext";

const Profile = () => {
  const { user, logout } = useContext(Authcontext);
  console.log("uswr:", user);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Hello Dosto !</h1>
      <h1>Profile</h1>
      <p>Username: {user.sub}</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default Profile;
