import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../providers/authProvider";
import { ActionForm } from "./action1Form";

export const ActionFormContainer = (params) => {
  const [action, setAction] = useState({ id: null });

  const AuthService = useContext(AuthContext);
  var { id } = useParams();
  if (id === undefined) {
    // Replace the id with the predefined blueprint Id to get the first action.
    id = process.env.REACT_APP_SICCAR_BLUEPRINT_TX_ID
  }
  console.log(id);
  useEffect(() => {
    const fetchAction = async () => {
      var user = await AuthService.getUser()
      const token = user.access_token
      const defaultOptions = {
        headers: {
          'Authorization': "Bearer " + token
        },
      }
      var response = await fetch(`${process.env.REACT_APP_SICCAR_PUBLIC_URL}/api/Actions/${process.env.REACT_APP_SICCAR_WALLET_ADDRESS}/${process.env.REACT_APP_SICCAR_REGISTER_ID}/${id}`,
        defaultOptions)
      if (response.status === 200) {
        var json = await response.json()
        console.log(json)
        setAction(json)
      }
      console.log(response)
    };

    fetchAction();
  }, [AuthService, id]);

  switch (action.id) {
    case 1:
      return <ActionForm action={action} />
    case 2:
      //2nd action form goes here
      break

    default:
      return <h3>No form exists for action {action.id}</h3>
  }
}