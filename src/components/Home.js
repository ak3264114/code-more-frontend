import { React, useEffect, useRef } from 'react'
import lottie from 'lottie-web'
import './css/home.css'
import { Link } from 'react-router-dom'



function Home() {
    const container = useRef(null)
    useEffect(() => {
        lottie.loadAnimation({
            container: container.current,
            renderer: 'svg',
            loop: true,
            autoplay: true,
            animationData: require('./img/coding.json')
        })
    }, [])
    return (
        <div className="home">
            <div className='home-section-1'>
                <h1>It's about Competetion and <br/> having fun with friends</h1>
                <p>See all your competitor at on place</p>
                <button ><Link to={'/profile'}>Get started</Link></button>
            </div>
            <div className="home-section-2" ref={container}></div>
        </div>
    )
}

export default Home