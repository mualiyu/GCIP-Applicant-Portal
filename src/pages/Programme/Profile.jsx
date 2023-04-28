import React, { useEffect, useState } from "react";
import "../styles/profile.css";
import Input from "../../components/Input";
import Button from "../../components/Button";
import Modal from "react-modal";
import { FaWindowClose } from "react-icons/fa";
import { RegularText } from "../../components/Common";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import query from "../../helpers/query";
import Loading from "../../components/Loading";
import { setJv, setUser } from "../../redux/user/userSlice";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    minWidth: "40%",
  },
  overlay: {
    backgroundColor: "rgba(0,0,0,0.5)",
  },
};

export default function Profile() {
  const [modalIsOpen, setIsOpen] = useState(false);
  const programData = useSelector((state) => state);
  const [allJvs, setAlljv] = useState([]);
  const [isJv, setIsJv] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [jvMail, setJvMail] = useState("");
  const [alertText, setAlert] = useState("");
  const [jvLoading, setJvLoading] = useState(false);
  const [jvUpdate, setIsJvUpdate] = useState(null);

  const getUserProfile = async () => {
    setJvLoading(true);
    const { success, data, error } = await query({
      method: "GET",
      url: "/api/applicant/profile",
      token: programData.user.user.token,
    });
    setJvLoading(false);
    if (success) {
      setAlljv(data.data.user.jvs);
    }
  };

  const initialValues = {
    name: "",
    address: "",
    person_incharge: "",
    phone: "",
    rc_number: "",
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      address: "",
      person_incharge: "",
      phone: "",
      rc_number: "",
    },
    onSubmit: async (values) => {
      setLoading(true);
      let route = isJv ? "profile/add/jv" : "profile/update";
      if (isJv) {
        values.email = jvMail;
      }
      if (isJv && jvUpdate !== null) {
        route = `profile/update/jv/${jvUpdate}`;
      }
      const { success } = await query({
        method: "POST",
        url: `/api/applicant/${route}`,
        bodyData: values,
        token: programData.user.user.token,
      });
      setLoading(false);
      if (success) {
        formik.setValues(values);
        setIsOpen(false);
        if (isJv) {
          getUserProfile();
          if (jvUpdate !== null) {
            setAlert("Jv Updated Successfuly");
          } else {
            setAlert("Jv Added Successfuly");
          }

          setIsJv(false);
          setIsJvUpdate(null);
        } else {
          dispatch(
            setUser({
              user: {
                address: values.address,
                email: programData.user.user.email,
                id: programData.user.user.id,
                inCharge: values.person_incharge,
                isLoggedIn: true,
                name: values.name,
                phone: values.phone,
                rcNumber: values.rc_number,
                token: programData.user.user.token,
                username: programData.user.user.username,
              },
            })
          );
          setAlert("Updated successfully");
        }
      } else {
        setAlert("An error occured while updating");
      }
      setTimeout(() => {
        setAlert("");
      }, 2000);
    },
  });
  useEffect(() => {
    formik.setValues({
      address: programData.user.user.address,
      name: programData.user.user.name,
      person_incharge: programData.user.user.inCharge,
      phone: programData.user.user.phone,
      rc_number: programData.user.user.rcNumber,
    });
    getUserProfile();
  }, []);
  return (
    <div className="profile">
      <Loading loading={loading} />
      <Button
        onClick={() => {
          setIsJv(true);
          setIsOpen(true);
          formik.setValues(initialValues);
        }}
        style={{ marginLeft: "auto" }}
        label="Add JV"
      />
      <h1>My Profile</h1>
      <div className="profile_detai">
        <div className="prog-h">
          <h2>Basic</h2>
          <Button
            style={{
              backgroundColor: "#3e52ff",
            }}
            onClick={() => {
              setIsJv(false);
              setIsOpen(true);
            }}
            label="Update Profile"
          />
        </div>
        <Input
          disabled
          outlined
          label="Company Name"
          value={programData.user.user.name}
        />
        <Input
          disabled
          outlined
          label="RC Number"
          value={programData.user.user.rcNumber}
        />
        <Input
          disabled
          outlined
          label="Email"
          value={programData.user.user.email}
        />
        <Input
          disabled
          outlined
          label="Director"
          value={programData.user.user.inCharge}
        />

        <Input
          disabled
          outlined
          label="Address"
          value={programData.user.user.address}
        />
        <Input
          disabled
          outlined
          label="Phone"
          value={programData.user.user.phone}
        />
      </div>
      <div className="profile_container">
        {jvLoading && <img src="/loading.gif" id="loader" />}
        {allJvs.map((myJv, ind) => {
          return (
            <div key={ind} className="profile_detail">
              <div className="prog-h">
                <h2>JV{ind + 1}</h2>
                <Button
                  style={{
                    backgroundColor: "#3e52ff",
                  }}
                  onClick={() => {
                    setIsJv(true);
                    setIsOpen(true);
                    setIsJvUpdate(myJv.id);
                    setJvMail(myJv.email)
                    formik.setValues({
                      address:myJv.address,
                      name:myJv.name,
                      phone:myJv.phone,
                      rc_number:myJv.rc_number
                    });
                  }}
                  label="Update Jv"
                />
              </div>

              <Input outlined label="Name" value={myJv.name} />
              <Input outlined label="E-mail" value={myJv.email} />
              <Input outlined label="Address" value={myJv.address} />
              <Input outlined label="RC Number" value={myJv.rc_number} />
              <Input outlined label="Phone" value={myJv.phone} />
            </div>
          );
        })}
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
        className="modal"
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
            text={isJv ? jvUpdate!==null?"Update Jv":"Add Jv" : "Update Profile"}
          />
          <div className="divider" />

          <Input
            outlined
            value={formik.values.name}
            name="name"
            onChange={formik.handleChange}
            label="Company Name"
            placeholder="Enter your company name here"
          />
          <Input
            outlined
            value={formik.values.rc_number}
            name="rc_number"
            onChange={formik.handleChange}
            label="RC Number"
            placeholder="Enter your RC number here"
          />
          {isJv && (
            <Input
              type="email"
              onChange={(e) => {
                setJvMail(e.target.value);
              }}
              outlined
              label="email"
              value={jvMail}
            />
          )}
          <Input
            type="tel"
            outlined
            value={formik.values.phone}
            name="phone"
            onChange={formik.handleChange}
            label="Pone Number"
            placeholder="Enter your phone number here"
          />
          {!isJv && (
            <Input
              outlined
              value={formik.values.person_incharge}
              name="person_incharge"
              onChange={formik.handleChange}
              required
              label="Incharge"
              placeholder="sample"
            />
          )}
          <Input
            outlined
            value={formik.values.address}
            name="address"
            onChange={formik.handleChange}
            required
            label="Address"
            placeholder="sample"
          />
          <Button
            onClick={() => {
              formik.handleSubmit();
            }}
            style={{ width: "50%", marginTop: 20 }}
            label={isJv ?jvUpdate!==null?"Update Jv":"Add Jv" : "Update"}
          />
        </div>
      </Modal>
    </div>
  );
}
