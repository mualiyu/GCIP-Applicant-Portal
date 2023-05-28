import React from 'react'
import './styles/add.css'
interface AddButtonProps{
  onClick?:()=>void;
  label?:string;
}
function AddButton({onClick,label=''}:AddButtonProps) {
  return (
    <div onClick={onClick} className='add_button'>
        <div className='add_plus'>
        <span>+</span>
        </div>
        <span className='addplus_label'>{label}</span>
        
    </div>
  )
}

export default AddButton