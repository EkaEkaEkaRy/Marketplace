import LoginForm from "./components/login"
import Signup from "./components/signup"
import s from "./login_page.module.css"
import React from 'react';

const Login = () => {
    return (
      <div className={s.app_wrapper}>
      <main className={s.main}>
        <div className={s.item}>
          <div className={s.wrapper}>
            <LoginForm />
            <Signup />
          </div>
        </div>
      </main>
    </div>
    )
  }
export default Login