import { useEffect, useRef, useState } from "react";
import Keycloak from 'keycloak-js';

const useAuth = () => {
    const [isLogin, setLogin] = useState(false);
    const isRun = useRef(false);
    useEffect(() => {
        if(isRun.current) return;

        isRun.current = true;
        const kc_client = new Keycloak({
            url: global.config.KEYCLOAK_URL,
            realm: global.config.KEYCLOAK_REALM,
            clientId: global.config.KEYCLOAK_CLIENT
        });

        kc_client.init({onLoad: 'login-required'}).then(res => setLogin(res));
    }, []);

    return isLogin;
}

export default useAuth;