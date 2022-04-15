import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../providers/authProvider";

export const ActionsContainer = () => {
   const [actions, setActions] = useState(["one"]);

   const AuthService = useContext(AuthContext);

   useEffect(() => {
      const fetchActions = async () => {
         var user = AuthService.getUser()
         const token = user.access_token
         const defaultOptions = {
            headers: {
               'Authorization': "Bearer " + token
            },
         }
         var response = await fetch(`${process.env.REACT_APP_SICCAR_PUBLIC_URL}/api/Actions/${process.env.REACT_APP_SICCAR_WALLET_ADDRESS}/${process.env.REACT_APP_SICCAR_REGISTER_ID}/blueprints`,
            defaultOptions)
         if(response.status === 200){
            var json = await response.json()
            console.log(json)
            setActions(json)
         }
         console.log(response)
      };

      fetchActions();
   }, [AuthService]);

   const renderActions = actions.map(action => {
      return (<div>Action Title: {action.title}</div>)
   })

   return renderActions;
};