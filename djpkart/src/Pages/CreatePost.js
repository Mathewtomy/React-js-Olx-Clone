import React, { Fragment, useContext } from "react";
import Create from "../components/Create/Create";
import { AuthContext } from "../contextStore/AuthContext";
import Login from "../components/login/Login";

const CreatePage = () => {
  const { user } = useContext(AuthContext);

  return (
    <Fragment>
      {user ? (
        <Create />
      ) : (
        <>          
          {alert("You must login first")} <Login />
        </>
      )}
    </Fragment>
  );
};

export default CreatePage;
