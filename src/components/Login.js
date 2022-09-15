import React, { useState , useContext} from 'react'
import { Link } from 'react-router-dom'
import APIService from '../APIService'
import { DataContext } from '../Context/DataContext'

const Login = () => {
   const {username} = useContext(DataContext)
  const [userName, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [resData, setResData] = useState("")
  console.log(username)
  async function handleSubmit() {
    try {
      const response = await APIService.login({ username, password });
    }
    catch (e) {
      console.error(e);
    }
  }

  return (
    <div className='form-body'>
      <h2>Welcome Back!</h2>
      <form>
        <div className='form-item'>
          <input type={"text"} placeholder={"Username"} name={"username"} value={username} onChange={(e) => { setUsername(e.target.value) }} />
        </div>
        <div className='form-item'>
          <input type={"password"} placeholder={"Password"} name={"password"} value={password} onChange={(e) => { setPassword(e.target.value) }} />
        </div>
        <div className='form-item submit'>
          <input type={"button"} value={"Login"} onClick={handleSubmit} />
        </div>
      </form>
      <div className='form-footer'>
        <p>Forgot Password?<Link to={"/forgot-password"}>Reset it</Link></p>
        <p className='form-foot-right'>Dont have an account?<Link to={"/signup"}>Create</Link></p>
      </div>
    </div>
  )
}

export default Login