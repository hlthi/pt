import React, { useEffect, useState } from 'react';
import './Login.scss';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';

interface IProps {}

const Login: React.FC<IProps> = props => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  /**
   * Check token, is exist redirect to list
   */
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
       history.push('/dashboard/list');
    }
  }, []);


  /**
   * Send login request.
   */
  const loginRequest = () => {
    axios
      .post('http://localhost:3063/v1/login', {
        username: username,
        password: password,
      })
      .then(res => {
        const token = res.data.key;
        localStorage.setItem('token', token);
        axios.defaults.headers.common.Authorization = `Bearer ${token}`;
        history.push('dashboard/add');
      })
      .catch(e => {
        toast.error(e.response.data.message);
      });
  };

  return (
    <div className="login-container">
      <div className="title font-26 white-color u-textCenter">Log in - PT</div>
      <div className="inside-container">
        <input
          value={username}
          onChange={e => {
            setUsername(e.target.value);
          }}
          className="input"
          type="text"
          placeholder="E-Mail"
        />
        <input
          value={password}
          onChange={e => {
            setPassword(e.target.value);
          }}
          type="password"
          className="input"
          placeholder="Password"
        />
        <button onClick={loginRequest} className="button is-primary">
          Log in
        </button>
      </div>
    </div>
  );
};

export default Login;
