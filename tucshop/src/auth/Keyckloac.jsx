import React, { useState } from 'react';
import '../styles/Nig.scss'; // Add styling here to mimic Keycloak's look

const App2 = ({setInfo, setToken, setLogout}) => {
  const [isLogin, setIsLogin] = useState(true); // Toggles between login and register

  return (
    <div className="auth-container">
      {isLogin ? (
        <LoginForm onSwitch={() => setIsLogin(false)} setInfo={setInfo} setToken={setToken} setLogout={setLogout}/>
      ) : (
        <RegisterForm onSwitch={() => setIsLogin(true)} />
      )}
    </div>
  );
};

const LoginForm = ({ onSwitch, setInfo, setToken, setLogout }) => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
   // console.log('Login Data:', formData);
    // Add login API logic here
    loginRequest();
  };

  async function loginRequest(){
    const data = new URLSearchParams();
    data.append('username', formData.username);
    data.append('password', formData.password);
    data.append('client_id', global.config.KEYCLOAK_CLIENT);
    data.append('client_secret', global.config.KEYCLOAK_CLIENT_SECRET);
    data.append('grant_type', 'password');
    const result = await fetch(`${global.config.KEYCLOAK_URL}/realms/${global.config.KEYCLOAK_REALM}/protocol/openid-connect/token`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: data
    }).then(res => res.json())
        .catch(err => console.log(err));
    if(!result['error']){
    const accessToken = result.access_token;
    const decodedToken = global.config.DECODEFUNC(accessToken);
    setToken(accessToken);
    setLogout(result.refresh_token);
    setInfo({username: decodedToken.preferred_username, email: decodedToken.email, option: decodedToken.option});
    }
  }

  return (
    <div className="form-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
        </label>
        <button type="submit">Login</button>
      </form>
      <p>
        Don't have an account?{' '}
        <button type="button" onClick={onSwitch}>
          Register here
        </button>
      </p>
    </div>
  );
};

const RegisterForm = ({ onSwitch }) => {
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
    option: 'Customer',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    // Add registration API logic here
    registerRequest();
    //onSwitch();

  };

  async function registerRequest(){
    const data = new URLSearchParams();
    data.append('client_id', global.config.KEYCLOAK_CLIENT);
    data.append('client_secret', global.config.KEYCLOAK_CLIENT_SECRET);
    data.append('grant_type', 'client_credentials');
    const result = await fetch(`/realms/${global.config.KEYCLOAK_REALM}/protocol/openid-connect/token`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: data
    }).then(res => res.json())
        .catch(err => console.log(err));
    if(!result['error']){
    const accessToken = result.access_token;
    const new_data = {
        email: formData.email, 
        enabled: true, 
        username: formData.username, 
        attributes: {
            client_id: global.config.KEYCLOAK_CLIENT,
            option: formData.option
        },
        credentials: [{
            type: 'password',
            value: formData.password,
            temporary: false
        }]
    }
    const reg_result = await fetch(`/admin/realms/${global.config.KEYCLOAK_REALM}/users`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify(new_data)
    }).then(res => console.log(res.status)).catch(err => console.log(err));

  }
}

  return (
    <div className="form-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          Username:
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          Confirm Password:
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          Option:
          <select
            name="option"
            value={formData.option}
            onChange={handleInputChange}
            required
          >
            <option value="Customer">Customer</option>
            <option value="Seller">Seller</option>
          </select>
        </label>
        <button type="submit">Register</button>
      </form>
      <p>
        Already have an account?{' '}
        <button type="button" onClick={onSwitch}>
          Login here
        </button>
      </p>
    </div>
  );
};

export default App2;
