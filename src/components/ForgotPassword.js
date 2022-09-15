import React from 'react'
import { Link } from 'react-router-dom'

function ForgotPassword() {
  return (
    <div className='form-body'>
      <h2>Welcome Back!</h2>
      <form>
      <div className='form-item'>
          <input type={"email"} placeholder={"Eamil"} />
        </div>
        <div className='form-item submit'>
          <input type={"submit"} value={"Send Password Reset Link"} />
        </div>
      </form>
      <div  className='form-footer'>
        <p>Dont have an account? <Link to={"/signup"}>Create one</Link></p>
      </div>
    </div>
  )
}

export default ForgotPassword