import classNames from "classnames";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { RootState } from "../../store";
import { addNewUser, signedUser } from "../../store/actions/users";
let Logo = "https://habrastorage.org/r/w1560/webt/ew/zv/fb/ewzvfbkgyhwhbczbwl3ew5wyyqs.png";
import './AuthPage.sass'
import 'react-toastify/dist/ReactToastify.css';

export const AuthPage = (): JSX.Element => {
  const [authMode, setAuthMode] = React.useState<'signin' | 'signup'>('signin')
  const [login, setLogin] = React.useState<string>('')
  const [password, setPassword] = React.useState<string>('')
  const [confirmPassword, setConfirmPassword] = React.useState<string>('')
  const dispatch = useDispatch()
  const signedUserObj = useSelector<RootState>(state => state.users)
  const navigation = useNavigate()
  

  const handleAuthMode = () => {
    if (authMode === 'signin') {
      setAuthMode('signup')
    } else {
      setAuthMode('signin')
    }
  }

  //TODO: Вынести это куда-то (юзается ещё в action)
  interface UserObj {
    id: number,
    login: string,
    password: string
  }

  const handleAuthClick = async (e: React.MouseEvent) => {
    let mark = 0
    e.preventDefault()
    const response = await fetch('http://localhost:3000/users')
    const data = await response.json()
    if (authMode === 'signin') {
        data.forEach((elem:UserObj) => {
          if (elem.login === login && elem.password !== password) {
            toast.error('Пароль не совпадает')
            mark = 1
          } else if (elem.login === login && elem.password === password) {
            dispatch(signedUser(elem))
            navigation('/contacts')
            mark = 1
          }
        })
        
        if (!mark) {
          toast.warning('Пользоватлель не найден')
        }
    } else if (authMode === 'signup') {
      if (password === confirmPassword) {
        data.forEach((elem:UserObj) => {
          if (elem.login === login) {
            toast.warning('Пользователь с таким логином уже существует')
            mark = 1
          }
        })
        if (mark === 0) {
          const newUser = {
            login: login,
            password: password,
            id: data.length + 1
          }

          dispatch(addNewUser(newUser))
        }
      } else {
        toast.error('Пароли не совпадают')
      }
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

          <label className="auth-input-label" htmlFor="username">Логин</label>
          <input 
            autoComplete="off" 
            className="auth-input" 
            type="text" 
            placeholder="Телефон или почта" 
            id="username" 
            value={login} 
            onChange={(e) => setLogin(e.target.value)}
          />

          <label className="auth-input-label" htmlFor="password" >Пароль</label>
          <input 
            autoComplete="off" 
            className="auth-input" 
            type="password" 
            placeholder="Пароль" 
            id="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {
            authMode === 'signup' &&
            <>
              <label className="auth-input-label" htmlFor="confirmPassword">Подтвердите пароль</label>
              <input 
                autoComplete="off" 
                className="auth-input" 
                type="password"
                placeholder="Пароль" 
                id="confirmPassword" 
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </>
            
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
      <ToastContainer />
    </div>
  )
}