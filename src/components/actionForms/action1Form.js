import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../providers/authProvider";

export const ActionForm = () => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [actionCondition, setActionCondition] = useState("false");
  const [action, setAction] = useState();

  const AuthService = useContext(AuthContext);

  useEffect(() => {
    const fetchActions = async () => {
      var user = await AuthService.getUser()
      const token = user.access_token
      const defaultOptions = {
        headers: {
          'Authorization': "Bearer " + token
        },
      }
      var response = await fetch(`${process.env.REACT_APP_SICCAR_PUBLIC_URL}/api/Actions/${process.env.REACT_APP_SICCAR_WALLET_ADDRESS}/${process.env.REACT_APP_SICCAR_REGISTER_ID}/${process.env.REACT_APP_SICCAR_BLUEPRINT_TX_ID}`,
        defaultOptions)
      if (response.status === 200) {
        var json = await response.json()
        console.log(json)
        setAction(json)
      }
      console.log(response)
    };

    fetchActions();
  }, [AuthService]);

  const formSubmit = (event) => {
    event.preventDefault();
    // We will change this to submit the payload data.. First we need to update the submit enpoint to only take the payload and supporting data.
    console.log(name)
    console.log(surname)
    console.log(actionCondition)
  }
  return (
    <>
      <h2>{action.title}</h2>
      <form onSubmit={formSubmit}>
        <label>First Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label>Surname:
          <input
            type="text"
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
          />
        </label>
        <label> Go to next Action?
          <label>Yes
            <input
              type="radio"
              value={"true"}
              checked={actionCondition === "true"}
              onChange={(e) => setActionCondition(e.target.value)}
            />
          </label>
          <label>No
            <input
              type="radio"
              value={"false"}
              checked={actionCondition === "false"}
              onChange={(e) => setActionCondition(e.target.value)}
            />
          </label>
        </label>
        <button className="btn btn-default" type="submit">
          Submit
        </button>
      </form>
    </>
  )
}