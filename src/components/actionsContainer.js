import React, { useEffect, useState } from "react";

export const ActionsContainer = (props) => {
   const [actions, setActions] = useState(null);

   useEffect(() => {
      const fetchActions = async () => {
         var response = await fetch(`${process.env.REACT_APP_SICCAR_PUBLIC_URL}/api/Actions/${process.env.REACT_APP_SICCAR_WALLET_ADDRESS}/${process.env.REACT_APP_SICCAR_REGISTER_ID}/blueprints`);
         console.log(response)
         setActions(response);
      };

      fetchActions();
   }, [props.id]);
   return (<div>{actions}</div>)
};