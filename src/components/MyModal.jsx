import React from 'react'
import './styles/modal.css'

export default function MyModal({isOpen,children}) {
  return (
    <div className={`my-modal ${isOpen?'active':null}`}>{children}</div>
  )
}
