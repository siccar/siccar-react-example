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
      <h1 className="mb-4">{action.title}</h1>
      <form onSubmit={formSubmit}>
        <div className="mb-3">
          <label className="w-100 fw-bold">First Name:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="form-control"
            />
          </label>
        </div>
        <div className="mb-3">
          <label className="w-100 fw-bold">Surname:
            <input
              type="text"
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
              className="form-control"
            />
          </label>
        </div>
        <div className="mb-3">
          <p className=" fw-bold"> Go to next Action?</p>
        </div>
        <div className="form-check">
            <input
              type="radio"
              value={"true"}
              checked={actioncondition === "true"}
              onChange={(e) => setActionCondition(e.target.value)}
              className="form-check-input"
              id="yes"
            />
            <label className="form-check-label" htmlFor="yes">Yes</label>
          </div>
          <div className="form-check">
            <input
              type="radio"
              value={"false"}
              checked={actioncondition === "false"}
              onChange={(e) => setActionCondition(e.target.value)}
              className="form-check-input"
              id="no"
            />
            <label className="form-check-label" htmlFor="no">No</label>
          </div>
          <button className="btn btn-primary mt-3" type="submit">
            Submit
          </button>
      </form>
    </>
  )
}