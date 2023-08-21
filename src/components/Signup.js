import React, { useEffect, useState , useContext } from 'react'
import { DataContext } from "../Context/DataContext";
import { Link ,useHistory} from 'react-router-dom'
import './css/signup.css'

function Signup() {
  const { isLoggedIn } = useContext(DataContext);
  const [userData, setUserData] = useState()
  const history = useHistory();
  useEffect(() => {
  console.log(userData)
  }, [userData])


  const handeleChange = async(e)=>{

    setUserData({...userData , [e.target.name] : e.target.value})
  }
    useEffect(
    () => 
    {
      if(isLoggedIn){
        history.push('/profile')
      }
      
    }, [isLoggedIn]);
  const handlesubmit = () =>{
     console.log(userData)
  }

  return (
    <div className='form-body'>
      <h2>Welcome to Code-More</h2>
      <form>
        <div className='form-item'>
          <input type={"text"} name='username' placeholder={"Username"} onChange={(e) => {handeleChange(e)}} />
        </div>
        <div className='form-item'>
          <input type={"text"} name='name' placeholder={"Full Name"} onChange={(e) => {handeleChange(e)}} />
        </div>
        <div className='form-item'>
          <input type={"email"} name='email' placeholder={"Eamil"} onChange={(e) => {handeleChange(e)}} />
        </div>
        <div className='form-item'>
          <input type={"password"} name='password' placeholder={"Password"} onChange={(e) => {handeleChange(e)}}/>
        </div>
        <div className='bg-black focus:bg-red-500'>
          <input className='p-5' type={"button"} value={"SignUp"} onClick={() => {handlesubmit()}}/>
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