import { useEffect, useState } from 'react';
import '../styles/Auth.scss';

export default function Auth({proceedFunction, modeFunction}){

    return (
        <div className="auth-page">
      <div className="auth-card">
        <div className="auth-header">
          <h1>Welcome to TUCSHOP</h1>
        </div>
        <div className="auth-body">
          <p>Select an option to proceed:</p>
          <div className="auth-buttons">
            <button className="btn register" onClick={() => {proceedFunction(true); modeFunction('login')}}>
              Login/Register
            </button>
            <button className="btn guest" onClick={() => {proceedFunction(true); modeFunction('guest')}}>
              Continue as Guest
            </button>
          </div>
        </div>
        <div className="auth-footer">
          <p>Powered by Keycloak Style Theme</p>
        </div>
      </div>
    </div>
    );
}