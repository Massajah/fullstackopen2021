import React from 'react'

const LoginForm = ({ 
  username,
  setUsername,
  password,
  setPassword,
  handleLogin  
}) => {

  return (
    <div>
        <h3>Login to blogbook</h3>
        <form onSubmit={handleLogin}>
        <div>
          username: <input
            className='form'
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password: <input
            className='form'
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button className='button' type="submit">Login</button>
      </form>
    </div>
  )
}

export default LoginForm