import React from 'react'
import './styles/menucard.css'
import { FolderIcon } from '../../../assets/Svg/Index'
import { Link } from 'react-router-dom'

export default function MenuCards() {
  return (
    <div className='menu-card-container'>
        <span id='title'>Nepa Performance Grants Program</span>
        <div id='guide'>
            <FolderIcon/>
            <Link to='/Programme'>Open Program</Link>
        </div>
    </div>
  )
}
