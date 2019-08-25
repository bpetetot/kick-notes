import React from 'react'

import { useAuth } from 'services/auth'

import styles from './login.module.css'

const Login = () => {
  const { login } = useAuth()
  return (
    <div className={styles.login}>
      <button type="button" onClick={login}>
        Login with github
      </button>
    </div>
  )
}

export default Login
