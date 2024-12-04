import { useEffect, useRef, useState } from "react";
import Keycloak from 'keycloak-js';

const useAuth = (runOnce) => {
    const [isLogin, setLogin] = useState(false);
    const [token, setToken] = useState(null);
    const [userInfo, setUserInfo] = useState(null);

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
                
                kc_client.init({onLoad: "login-required"})
                .then(res => {
                    if(res){
                        setLogin(res);
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