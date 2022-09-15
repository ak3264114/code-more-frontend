import React from 'react'
import { Link } from 'react-router-dom'
import './css/signup.css'

function Signup() {
  return (
    <div className='form-body'>
      <h2>Welcome to Code-More</h2>
      <form>
        <div className='form-item'>
          <input type={"text"} placeholder={"Username"} />
        </div>
        <div className='form-item'>
          <input type={"text"} placeholder={"Full Name"} />
        </div>
        <div className='form-item'>
          <input type={"email"} placeholder={"Eamil"} />
        </div>
        <div className='form-item'>
          <input type={"password"} placeholder={"Password"}/>
        </div>
        <div className='form-item submit'>
          <input type={"submit"} value={"SignUp"} />
        </div>
      </form>
      <div  className='form-footer'>
        {/* <p>Forgot Eamil?<Link to={"/forgot-email"}>Click here</Link></p> */}
        <p>Already have an account?<Link to={"/login"}>login</Link></p>
      </div>
    </div>
  )
}

export default Signup