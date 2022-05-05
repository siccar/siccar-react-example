import React, { useState } from "react";

export const ActionForm2 = (props) => {
  const [validate, setValidate] = useState("false");
  const { action } = props;
  const formSubmit = async (event) => {
    event.preventDefault();
    // We will change this to submit the payload data.. First we need to update the submit enpoint to only take the payload and supporting data.
    console.log(validate)
    props.submitActionCallback({ validate });
  }

  //iterate over object
  const renderPreviousActionData = () => {
    let previousDataView = [];
    Object.entries(action.received).forEach(([key, value]) => {
      previousDataView.push(
        <li key={key}>{key}: {value}</li>
      )
    });
    return previousDataView;
  }

  const renderForm = () => (
    <>
      <h1>{action.title}</h1>
      <form onSubmit={formSubmit}>
      <div><p className="fw-bold">Is previous action valid?</p></div>
      <div className="form-check">
          <label>Yes
            <input
              type="radio"
              value={"true"}
              checked={validate === "true"}
              onChange={(e) => setValidate(e.target.value)}
              className="form-check-input"
            />
          </label>
        </div>
        <div className="form-check">
          <label>No
            <input
              type="radio"
              value={"false"}
              checked={validate === "false"}
              onChange={(e) => setValidate(e.target.value)}
              className="form-check-input"
            />
          </label>
        </div>
        <button className="btn btn-primary mt-3" type="submit">
          Submit
        </button>
      </form>
      <section className="mt-3">
        <p className="fw-bold">Previous Data:</p>
        <ul>
          {renderPreviousActionData()}
        </ul>
      </section>
    </>
  )

  console.log(action)
  return action ? renderForm() : <h3>Loading</h3>
}