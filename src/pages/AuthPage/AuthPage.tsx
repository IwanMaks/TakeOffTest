import classNames from "classnames";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import './AuthPage.sass'
import { AppInput } from "@src/components/AppInput/AppInput";
import { useAction, useAppSelector } from "@src/utils/hooks";
import { AppLoading } from "@src/components/AppLoading/AppLoading";
import { toast } from "react-toastify";


export const AuthPage = (): JSX.Element => {
  const [authMode, setAuthMode] = React.useState<'signin' | 'signup'>('signin')
  const [login, setLogin] = React.useState<string>('')
  const [password, setPassword] = React.useState<string>('')
  const [confirmPassword, setConfirmPassword] = React.useState<string>('')

  const loading = useAppSelector(state => state.users.loading)
  const {signedUser, addNewUser} = useAction()
  const navigation = useNavigate()

  React.useEffect(() => {
    const login = localStorage.getItem('contact-login')

    if (login) {
      navigation('/contacts')
    }
  }, [])
  
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

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.trim().split(' ').length > 1) {
      toast.warning('Логин не может сожержать больше одного слова')
    } else {
      setLogin(e.target.value.trim())
    }
  }
  
  return (
    <div className="popup-wrap">
      <div className="background">
        <div className="shape"></div>
        <div className="shape"></div>
      </div>

      <form className={classNames("auth-form", {signupForm: authMode === 'signup'})} autoComplete="off">
          <h3 className="auth-title">{authMode === 'signin' ? 'Авторизация' : 'Регистрация'}</h3>

          <AppInput 
            type="text" 
            placeholder="Логин" 
            id="username" 
            label="Логин"
            value={login} 
            onChange={handleLoginChange}
          />

          <AppInput  
            type="password" 
            label="Пароль"
            placeholder="Пароль" 
            id="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value.trim())}
          />

          {
            authMode === 'signup' &&
            <AppInput 
              placeholder="Повторите пароль"
              type="password"
              label="Повторите пароль"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value.trim())} 
            />
            
          }

          <button 
            className="auth-button"
            onClick={handleAuthClick}
            disabled={authMode === 'signin' ? (!login || !password) : (!login || !password || !confirmPassword)}
          >
            {
              loading ?
              <AppLoading size="small" /> :
              authMode === 'signin' ? 'Вход' : 'Зарегестрироваться'
            }
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