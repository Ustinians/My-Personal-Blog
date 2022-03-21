import React from 'react';
import "./index.css"

export default function Footer() {
    const date = new Date();
  return (
    <div className='footer'>
        <p className='footer-info'>In doing we learn @ {date.getFullYear()} 想躺在云上</p>
    </div>
  )
}
