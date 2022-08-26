import React from 'react'
import skyline from '../assets/skyline.jpeg'
import '../App.css'

export default function Home() {
  return (
    <div className='homeDiv'>
        <ul>
        <li className='home-text'><h2>David is Coming to Calgary! </h2></li>
        <li><img src ={skyline} alt='cslgsry city skyline'/></li>
            <li className='home-text'><h3>What is he going to want to do?</h3></li>
            
            <p className='home-text'>Sign up or login to see what options are currently on the table!</p></ul>
            </div>
  )
}
