import React from 'react';
import { useLocation } from 'react-router-dom';

export default function Dashboard(props) {
  const location = useLocation();

  return (
    <div>
      <h1>Dashboard</h1>
      <h2>ログイン状態: {props.loggedInStatus}</h2>
    </div>
  );
}
