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
      return (<Link to={`/action/${action.previousTxId}`}  key={action.previousTxId}>
         <li>Action Title: {action.title}</li>
      </Link>)
   })

   return (
      <>
         <div className="mb-2">
            <Link to="/start-blueprint"><button className="btn btn-primary">Start New Blueprint</button></Link>
         </div>
         {actions.length === 0 ? <div className="alert alert-warning" role="alert">No Actions Availiable</div> : <div><hr/><ul>{renderActions}</ul></div>}
      </>
   );
};