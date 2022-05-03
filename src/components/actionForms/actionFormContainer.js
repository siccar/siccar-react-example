import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../providers/authProvider";
import { ActionForm } from "./action1Form";
import { ActionForm2 } from "./action2Form";

export const ActionFormContainer = (params) => {
  const [action, setAction] = useState({ id: null });
  const [actionSubmitted, setActionSubmitted] = useState(false);

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

  const submitAction = async (payload) => {
    var user = await AuthService.getUser()
    const token = user.access_token
    const submitActionPayload = {
      "previousTxId": action.previousTxId,
      "blueprintId": process.env.REACT_APP_SICCAR_BLUEPRINT_TX_ID,
      "walletAddress": process.env.REACT_APP_SICCAR_WALLET_ADDRESS,
      "registerId": process.env.REACT_APP_SICCAR_REGISTER_ID,
      "data": payload
    }
    const defaultOptions = {
      method: "Post",
      headers: {
        'Authorization': "Bearer " + token,
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(submitActionPayload)
    }
    var response = await fetch(`${process.env.REACT_APP_SICCAR_PUBLIC_URL}/api/Actions`,
      defaultOptions)
    if (response.status === 202) {
      var json = await response.json()
      console.log(json)
      setActionSubmitted(true)
    }
    console.log(response)
  };

  if(actionSubmitted) return <h3>Action Submitted</h3>
  switch (action.id) {
    case 1:
      return <ActionForm action={action} submitActionCallback={submitAction} />
    case 2:
      return <ActionForm2 action={action} submitActionCallback={submitAction} />

    default:
      return <h3>No form exists for action {action.id}</h3>
  }
}