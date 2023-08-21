import React from 'react'

function ResetPassword() {
  return (
    <div className='form-body'>
      <h2>Welcome Back!</h2>
      <form>
        <div className='form-item'>
          <input type={"text"} placeholder={"Password"} />
        </div>
        <div className='form-item'>
          <input type={"password"} placeholder={"Confirm Password"} />
        </div>
        <div className='form-item submit'>
          <input type={"submit"} value={"Reset Password"} />
        </div>
      </form>
    </div>
  )
}

export default ResetPassword