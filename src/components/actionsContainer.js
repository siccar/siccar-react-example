import { HubConnectionBuilder, HttpTransportType, LogLevel } from "@microsoft/signalr";
import React, { useEffect, useState, useContext, useRef } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../providers/authProvider";

export const ActionsContainer = () => {
   const [actions, setActions] = useState([]);
   const [connection, setConnection] = useState(null);
   const latestActions = useRef(null);

   latestActions.current = actions;
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

   useEffect(() => {
      const newConnection = new HubConnectionBuilder()
         .configureLogging(LogLevel.Debug)
         .withUrl(`${process.env.REACT_APP_SICCAR_PUBLIC_URL}/actionshub?walletAddress=${process.env.REACT_APP_SICCAR_WALLET_ADDRESS}`, {
            transport: HttpTransportType.WebSockets,
            accessTokenFactory: () => AuthService.getUser().then(user => user.access_token)
         })
         .withAutomaticReconnect()
         .build();

      setConnection(newConnection);
   }, [AuthService]);

   useEffect(() => {
      const fetchActionById = async (actionId) => {
         var user = await AuthService.getUser()
         const token = user.access_token
         const defaultOptions = {
            headers: {
               'Authorization': "Bearer " + token
            },
         }
         var response = await fetch(`${process.env.REACT_APP_SICCAR_PUBLIC_URL}/api/Actions/${process.env.REACT_APP_SICCAR_WALLET_ADDRESS}/${process.env.REACT_APP_SICCAR_REGISTER_ID}/${actionId}`,
            defaultOptions)
         if (response.status === 200) {
            var json = await response.json()
            console.log(json)
            const updatedActions = [...latestActions.current];
            updatedActions.push(json);
            setActions(updatedActions);
         }
         console.log(response)
      };

      if (connection) {
         connection.start()
            .then(result => {
               console.log('Connected!');

               connection.on('ReceiveAction', transactionConfirmedPayload => {
                  fetchActionById(transactionConfirmedPayload.transactionId)

               });
            })
            .catch(e => console.log('Connection failed: ', e));
      }
   }, [connection, AuthService]);

   const renderActions = actions.map(action => {
      return (<Link to={`/action/${action.previousTxId}`} key={action.previousTxId}>
         <li>Action Title: {action.title}</li>
      </Link>)
   })

   return (
      <>
         <div className="mb-2">
            <Link to="/start-blueprint"><button className="btn btn-primary">Start New Blueprint</button></Link>
         </div>
         {actions.length === 0 ? <div className="alert alert-warning" role="alert">No Actions Availiable</div> : <div><hr /><ul>{renderActions}</ul></div>}
      </>
   );
};