import React from 'react'
import './styles/add.css'
import { DeleteIcon } from '../assets/Svg/Index';
interface AddButtonProps{
  onClick?:()=>void;
  label?:string;
  
}
function DeleteButton({onClick,label}:AddButtonProps) {
  return (
    <div onClick={onClick} className='add_button'>
        <div className='add_plus'>
        <span>
            <DeleteIcon onClick={()=>{}}/>
        </span>
        </div>
        <span className='addplus_label'>{label}</span>
        
    </div>
  )
}

export default DeleteButton