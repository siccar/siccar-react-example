import React, { useState } from "react";

export const ActionForm = (props) => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [actioncondition, setActionCondition] = useState("false");
  const {action } = props;
  const formSubmit = async (event) => {
    event.preventDefault();
    // We will change this to submit the payload data.. First we need to update the submit enpoint to only take the payload and supporting data.
    console.log(name)
    console.log(surname)
    console.log(actioncondition)
    props.submitActionCallback({name, surname, actioncondition});
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
              checked={actioncondition === "true"}
              onChange={(e) => setActionCondition(e.target.value)}
            />
          </label>
          <label>No
            <input
              type="radio"
              value={"false"}
              checked={actioncondition === "false"}
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