import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector} from 'react-redux';
import { Redirect } from 'react-router-dom';

import './LoginForm.css';

function LoginFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);

  if (sessionUser) return (
    <Redirect to="/" />
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);

    await dispatch(sessionActions.login({ credential, password }))
    .catch( async (res) => {
          const data = await res.json();
          const arr = [];

          if(data && data.errors){
            for(let error in data.errors) {
              arr.push(data.errors[error])
            }
        setErrors(arr)
      }
    })
  }

  const onClick = (e) => {
    e.preventDefault();
    setCredential("Demo User");
    setPassword("password");
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <ul>
        {errors.map((error, idx) => <li key={idx}>{error}</li>)}
      </ul>
      <div className='username-email'>
      <label>
        Username or Email
        <input
          type="text"
          value={credential}
          onChange={(e) => setCredential(e.target.value)}
          required
        />
        <p className="errors">{errors.credential}</p>
      </label>
      </div>
      <div className='pass'>
      <label>
        Password
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <p className="errors">{errors.password}</p>
      </label>
      </div>

      <button className="login-bttn" type="submit">Log In</button>
      <button className='demo-user-bttn' type="user-demo" onClick={onClick}>Demo User</button>
    </form>
  );
}

export default LoginFormPage;
