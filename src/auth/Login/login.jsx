import React from 'react'

import { useAuth } from '../context'

import styles from './login.module.css'

const Login = () => {
  const { login } = useAuth()
  return (
    <div className={styles.login}>
      <button onClick={login}>Login with github</button>
    </div>
  )
}

export default Login
