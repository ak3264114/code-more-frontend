import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
// import { render } from 'react-dom';
import './css/card.css'



function Card() {
  useEffect(() => {
  fetch(`${process.env.BACKEND_URL}/api/users/`)
    .then((response) => response.json())
    .then((actualData) => console.log(actualData))
    .catch((err) => {
      console.log(err.message);
    });
}, [])
// const [text] = useState('Some quick example text to build on the card title and make up the bulk of the card');
// const [data, setData] = useState(null);
  return (
    <>
      <div className="mb-17px">
        <div className="card">
          <div className="upper">
            <img src="https://i.imgur.com/Qtrsrk5.jpg" alt='img' className="img-fluid" />
          </div>
          <div className="user text-center">
            <div className="profile">
              {/* <img src="" className="rounded-circle" width="80"/> */}
              <i className="rounded circle fa-solid fa-circle-user"></i>
            </div>
          </div>
          <div className="text-center">
            <br />
            <br />
            <h3 className="hello">Hello!</h3>
            <h4 className="">Babu Ayush</h4>
            {/* <span className="text-muted d-block mb-2">Los Angles</span> */}
            <Link to={"/"}><i class="linkdin fa-brands fa-linkedin"></i></Link>
            {/* <a href=''><img src="" className="img-fluid"/></a> */}
            <div className="d-flex justify-content-between align-items-center mt-4 px-4">
              <div className="stats">
                <h4 className="">Total Problem Solved</h4>
                <span>8,797</span>
              </div>
              <div className='q-details'>
                <div className="">
                  <h4 className="">Easy</h4>
                  <span>142</span>
                </div>
                <div className="">
                  <h4 className="mb-0">Medium</h4>
                  <span>129</span>
                </div>
                <div className="">
                  <h4 className="">Hard</h4>
                  <span>142</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </> 
  )
}
export default Card