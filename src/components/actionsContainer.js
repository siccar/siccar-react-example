import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../providers/authProvider";

export const ActionsContainer = () => {
   const [actions, setActions] = useState([]);

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
         var response = await fetch(`${process.env.REACT_APP_SICCAR_PUBLIC_URL}/api/Actions/${process.env.REACT_APP_SICCAR_WALLET_ADDRESS}/${process.env.REACT_APP_SICCAR_REGISTER_ID}`,
            defaultOptions)
         if (response.status === 200) {
            var json = await response.json()
            console.log(json)
            setActions(json)
         }
         console.log(response)
      };

      fetchActions();
   }, [AuthService]);

   const renderActions = actions.map(action => {
      return (<Link to={`/action/${action.previousTxId}`}>
         <li key={action.previousTxId}>Action Title: {action.title}</li>
      </Link>)
   })

   return (
      <>
         <div>
            <Link to="/start-blueprint"><button>Start New Blueprint</button></Link>
         </div>
         {actions.length === 0 ? <h2>No Actions Availiable</h2> : <ul>{renderActions}</ul>}
      </>
   );
};