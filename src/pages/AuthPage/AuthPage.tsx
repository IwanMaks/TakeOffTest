import classNames from "classnames";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import './AuthPage.sass'
import { AppInput } from "@src/components/AppInput(right)/AppInput";
import { useAction, useAppSelector } from "@src/utils/hooks";

export const AuthPage = (): JSX.Element => {
  const [authMode, setAuthMode] = React.useState<'signin' | 'signup'>('signin')
  const [login, setLogin] = React.useState<string>('')
  const [password, setPassword] = React.useState<string>('')
  const [confirmPassword, setConfirmPassword] = React.useState<string>('')

  const {signedUser, addNewUser} = useAction()
  const navigation = useNavigate()
  
  const handleAuthMode = () => {
    if (authMode === 'signin') {
      setAuthMode('signup')
    } else {
      setAuthMode('signin')
    }
  }
  
  const handleAuthClick = async (e: React.MouseEvent) => {
    e.preventDefault()

    if (authMode === 'signin') {
      signedUser({login, password, confirmPassword, navigation})
    } else {
      addNewUser({password, confirmPassword, login, navigation})
    }
  }
  
  return (
    <div className="popup-wrap">
      <div className="background">
        <div className="shape"></div>
        <div className="shape"></div>
      </div>

      <form className={classNames("auth-form", {signupForm: authMode === 'signup'})} autoComplete="off">
          <h3 className="auth-title">Авторизация</h3>

          <AppInput 
            type="text" 
            placeholder="Телефон или почта" 
            id="username" 
            label="Логин"
            value={login} 
            onChange={(e) => setLogin(e.target.value)}
          />

          <AppInput  
            type="password" 
            label="Пароль"
            placeholder="Пароль" 
            id="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {
            authMode === 'signup' &&
            <AppInput 
              placeholder="Повторите пароль"
              type="password"
              label="Повторите пароль"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)} 
            />
            
          }

          <button 
            className="auth-button"
            onClick={handleAuthClick}
            disabled={!login || !password}
          >
            {authMode === 'signin' ? 'Вход' : 'Зарегестрироваться'}
          </button>

          <div 
            className="auth-switch"
            onClick={handleAuthMode}
          >
            {authMode === 'signin' ? 'Зарегистрироваться': 'Войти'}
          </div>
      </form>
      
    </div>
  )
}