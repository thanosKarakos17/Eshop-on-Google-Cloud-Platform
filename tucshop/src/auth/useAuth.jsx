import { useEffect, useRef, useState } from "react";
import Keycloak from 'keycloak-js';

const useAuth = (runOnce) => {
    const [isLogin, setLogin] = useState(false);
    const [token, setToken] = useState(null);
    const [userInfo, setUserInfo] = useState(null);

    

    function exchangeAuthorizationCode(authorizationCode) {
        const tokenEndpoint = `http://${global.config.KEYCLOAK_URL}/realms/${global.config.KEYCLOAK_REALM}/protocol/openid-connect/token`;
    
        const data = new URLSearchParams();
        data.append('code', authorizationCode);
        data.append('client_id', `${global.config.KEYCLOAK_CLIENT}`);
        data.append('client_secret', `${global.config.KEYCLOAK_CLIENT_SECRET}`); // Confidential client secret
        data.append('grant_type', 'authorization_code');
    
        // Fetch API to exchange the authorization code for an access token
        fetch(tokenEndpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: data
        })
        .then(response => response.json())
    }

    const logoutFunction = useRef(null);

    const isRun = useRef(false);
    useEffect(() => {
            if(runOnce){
                if(isRun.current) return;

                isRun.current = true;
                const kc_client = new Keycloak({
                    url: global.config.KEYCLOAK_URL,
                    realm: global.config.KEYCLOAK_REALM,
                    clientId: global.config.KEYCLOAK_CLIENT
                });
                logoutFunction.current = () => kc_client.logout();
                
                kc_client.init({onLoad: "login-required", KeycloakResponseType: 'code'})
                .then(res => {
                    if(res){
                        setTimeout(() => {kc_client.updateToken(30)}, 3000)
                        setLogin(res);
                        console.log(kc_client)
                        const token = kc_client.token;
                        setToken(token);
                        const userInfo = kc_client.tokenParsed;
                        setUserInfo({username: userInfo.preferred_username, email: userInfo.email, option: userInfo.option});
                    }
                })
                .catch(err => console.log(err));
            }
    }, []);

    return {isLogin, token, userInfo, logout: logoutFunction.current };
}

export default useAuth;