import React, { useEffect, useState } from 'react'
import '../styles/profile.css'
import Input from '../../components/Input'
import Button from '../../components/Button'
import Modal from "react-modal";
import { FaWindowClose } from 'react-icons/fa';
import { RegularText } from '../../components/Common';
import { useSelector } from 'react-redux';

const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      minWidth:"40%"
    },
    overlay: {
      backgroundColor: "rgba(0,0,0,0.5)",
    },

  };

export default function Profile() {
    const [modalIsOpen, setIsOpen] = useState(false);
    const programData=useSelector(state=>state)
    useEffect(()=>{
    console.log(programData)
    },[])
  return (
    <div className='profile'>
    <Button onClick={()=>setIsOpen(true)} style={{marginLeft:'auto'}} label='Add JV'/>
    <h1>My Profile</h1>
    <div className='profile_detai'>
    <div className='prog-h'>
    <h2>Basic</h2>
    <Button onClick={()=>setIsOpen(true)}  label='Update Profile'/>
    </div>
    <Input disabled outlined label='Company Name' value={programData.user.user.name}/>
    <Input disabled outlined label='RC Number' value={programData.user.user.rcNumber}/>
    <Input disabled outlined label='Email' value={programData.user.user.email}/>
    <Input disabled outlined label='Director' value={programData.user.user.inCharge}/>
    <Input disabled outlined label='Address' value={programData.user.user.address}/>
    <Input disabled outlined label='Phone' value={programData.user.user.phone}/>
    
    </div>
    <div className='profile_container'>
    
    

    {/* <div className='profile_detail'>
    <h2>JV1</h2>
    <Input outlined label='Name' value='My Name'/>
    <Input outlined label='E-mail' value='sample@mail.com'/>
    <Input outlined label='Username' value='sample@mail.com'/>
    <Input outlined label='RC Number' value='sample@mail.com'/>
    <Input outlined label='Password' value='sample@mail.com'/>
    
    </div>
    <div className='profile_detail'>
    <h2>JV2</h2>
    <Input outlined label='Name' value='My Name'/>
    <Input outlined label='E-mail' value='sample@mail.com'/>
    <Input outlined label='Username' value='sample@mail.com'/>
    <Input outlined label='RC Number' value='sample@mail.com'/>
    <Input outlined label='Password' value='sample@mail.com'/>
    
    </div> */}
    </div>

    <Modal
     className='modal'
        isOpen={modalIsOpen}
        appElement={document.getElementById("root")}
        style={customStyles}
      >
        <div className="inner_modal">
          <FaWindowClose
            onClick={() => {
              setIsOpen(false);
            
            }}
            style={{ fontSize: 30, cursor: "pointer", marginLeft: "auto" }}
          />
          <RegularText
            style={{ textAlign: "center", fontWeight: "bold", fontSize: 18 }}
            text="Add New JV"
          />
          <div className="divider" />
          <Input outlined label='Name'/>
          </div>
          </Modal>
    </div>
  )
}
