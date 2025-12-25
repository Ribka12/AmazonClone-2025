import React, { useContext, useEffect } from "react";
import { context } from "../../Utility/Reducer";
import { useNavigate } from "react-router-dom";
import { auth } from "../../Utility/firebase";


function ProtectedRoute({ children, msg, redirect }) {
  const { state,dispatch } = useContext(context);
  const navigate = useNavigate();
  useEffect( () => {

    if (!state[1].loading && !state[1].user) {
      navigate("/auth", { state: { message: msg, rdt: redirect } });
    }
  }, [state[1].user]);

  return <>{children}</>;
}

export default ProtectedRoute;
