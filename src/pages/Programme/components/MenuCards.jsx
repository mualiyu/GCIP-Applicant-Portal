import React from 'react'
import './styles/menucard.css'
import { FolderIcon } from '../../../assets/Svg/Index'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setProgramId } from '../../../redux/program/programSlice'
import { setLotId } from '../../../redux/applicant/applicantSlice'

export default function MenuCards({data}) {
  const dispatch=useDispatch()
  const navigate=useNavigate()
  return (
    <div className='menu-card-container'>
        <span id='title'>{data.name}</span>
        <div id='guide'>
            <FolderIcon/>
            <Link onClick={(e)=>{
          e.preventDefault()
          dispatch(setProgramId(data.id))
          
         navigate('/Programme')
            }}>Open Program</Link>
        </div>
    </div>
  )
}
