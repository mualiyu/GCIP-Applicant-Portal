import React from "react";
import Input from "../../../components/Input";
import { RegularText } from "../../../components/Common";
import "../../styles/profileDetail.css";
import { FieldArray, FormikProvider, useFormik } from "formik";
import Button from "../../../components/Button";
import AddButton from "../../../components/AddButton";
import DeleteButton from "../../../components/DeleteButton";
import { useSelector } from "react-redux";
import query from "../../../helpers/query";
import { useState } from "react";
import Loading from "../../../components/Loading";
import Alert from "../../../components/Alert";
import * as Yup from "yup";
import { useEffect } from "react";
import { useMemo } from "react";
import { Fade } from "react-awesome-reveal";
import Documents from "./Documents";
import Warning from "../components/Tab5/notify";
import nProgress from "nprogress";

export default function ProfileDetail({ moveToTab }) {
  const data = useSelector((state) => state);
  const [loading, setLoading] = useState(false);
  const [alertText, setAlert] = useState("");
  const [started, setStarted] = useState(false);
  const [isParent, setIsparent] = useState(false);
  const getData = async () => {
    nProgress.start();

    const respone = await query({
      method: "GET",
      url: `/api/applicant/application/get?program_id=${data.program.id}`,
      token: data.user.user.token,
    });
    nProgress.done();


    if (respone.success) {
      if (respone.data.data.application.application_profile.length) {
        formik.setValues({
          applicant_name:
            respone.data.data.application.application_profile[0].name,
          date_of_incorporation:
            respone.data.data.application.application_profile[0]
              .registration_date,
          brief_description:
            respone.data.data.application.application_profile[0].description,
          website: respone.data.data.application.application_profile[0].website,
          share_holders:
            respone.data.data.application.application_profile[0].share_holders,

          ultimate_owner:
            respone.data.data.application.application_profile[0].owner,
          contact_person:
            respone.data.data.application.application_profile[0]
              .contact_persons,
        });

        setAlert("Continue with your previous application");
        setStarted(true);
        setTimeout(() => {
          setAlert("");
        }, 2000);
      }

      // setCurrent(data.data.application);
    }
  };
  const initialValues = {
    applicant_name: "",
    date_of_incorporation: "",
    brief_description: "",
    website: "none",
    share_holders: [],
    ultimate_owner: "",
    contact_person: [],
    // { name: "", phone: "" }
    // { name: "", phone: "", email: "", address: "" }
  };
  const validationSchema = Yup.object({
    applicant_name: Yup.string().required(),
    date_of_incorporation: Yup.string().required(),
    brief_description: Yup.string().required(),
    share_holders: Yup.array().required(),
    ultimate_owner: Yup.string().required(),
    contact_person: Yup.array().required(),
  });
  const formik = useFormik({
    initialValues,
    
    onSubmit: async (val) => {
      // if (started) {
      //   moveToTab(4);
      //   return;
      // }
      const bodyData = {
        application_id: data.applicant.application.id,
        authorised_personel: data.user.user.inCharge,
        update: started ? "1" : "0",
        ...val,
      };

      setLoading(true);
      const response = await query({
        method: "POST",
        url: "/api/applicant/application/create/profile",
        token: data.user.user.token,
        bodyData,
      });

      if (response.success) {
        // dispatch(setApplication(response.data.data.application));
        setAlert("Data saved");
        moveToTab(4);
      } else {
        setAlert(
          "Cannot proceed without submitting required imformation"
        );
      }
      setTimeout(() => {
        setAlert("");
      }, 2000);
    },
  });

  const saveData = async () => {
    const bodyData = {
      application_id: data.applicant.application.id,
      authorised_personel: data.user.user.inCharge,
      update: started ? "1" : "0",
      ...formik.values,
    };
    const filtered=formik.values.share_holders.filter(sh=>sh.name==''||sh.phone=='')
    const filtered2=formik.values.contact_person.filter(sh=>sh.name==''||sh.phone==''||sh.email==''||sh.address=='')
    if (filtered.length||filtered2.length) {
      setAlert('Directors data and Contact person data is required')
      setTimeout(()=>{
       setAlert('')
      },4000)
      return
    }
    if (formik.values.contact_person.length==0) {
      setAlert('Directors data and Contact person data is required')
      setTimeout(()=>{
       setAlert('')
      },4000)
      return
    }
    if (formik.values.share_holders.length==0) {
      setAlert('Directors data and Contact person data is required')
      setTimeout(()=>{
       setAlert('')
      },4000)
      return
    }
    setLoading(true);
    const response = await query({
      method: "POST",
      url: "/api/applicant/application/create/profile",
      token: data.user.user.token,
      bodyData,
    });
    setLoading(false);
    if (response.success) {
      // dispatch(setApplication(response.data.data.application));
      setAlert("Data saved");
      // moveToTab(4);
    } else {
      setAlert(
        "Cannot proceed without submitting required imformation"
      );
    }
    setTimeout(() => {
      setAlert("");
    }, 2000);
  };
  const nextMove = async () => {
    const bodyData = {
      application_id: data.applicant.application.id,
      authorised_personel: data.user.user.inCharge,
      update: started ? "1" : "0",
      ...formik.values,
    };
    const filtered=formik.values.share_holders.filter(sh=>sh.name==''||sh.phone=='')
    const filtered2=formik.values.contact_person.filter(sh=>sh.name==''||sh.phone==''||sh.email==''||sh.address=='')
    if (filtered.length||filtered2.length) {
      setAlert('Directors data and Contact person data is required')
      setTimeout(()=>{
       setAlert('')
      },4000)
      return
    }
    if (formik.values.contact_person.length==0) {
      setAlert('Directors data and Contact person data is required')
      setTimeout(()=>{
       setAlert('')
      },4000)
      return
    }
    if (formik.values.share_holders.length==0) {
      setAlert('Directors data and Contact person data is required')
      setTimeout(()=>{
       setAlert('')
      },4000)
      return
    }
    setLoading(true);
    const response = await query({
      method: "POST",
      url: "/api/applicant/application/create/profile",
      token: data.user.user.token,
      bodyData,
    });

    if (response.success) {
      // dispatch(setApplication(response.data.data.application));
      setAlert("Data saved");
      moveToTab(4);
    } else {
      setAlert("Application failed, please try again");
    }
    setTimeout(() => {
      setAlert("");
    }, 2000);
  };

  useEffect(() => {
    getData();
    console.log(data.program.id, "issss");
  }, []);
  return (
    <div className="profile_detail_container">
      <h3>Eligibility Requirements</h3>
      <Loading loading={loading} />
      <Alert text={alertText} />
      <FormikProvider value={formik}>
        <Input
          required
          error={
            formik.touched.applicant_name && formik.errors.applicant_name
              ? formik.errors.applicant_name
              : ""
          }
          onChange={formik.handleChange}
          name="applicant_name"
          outlined
          label="Applicant Name"
          value={formik.values.applicant_name}
        />
        <Input
          required
          style={{ width: "100%" }}
          value={formik.values.date_of_incorporation}
          error={
            formik.touched.date_of_incorporation &&
            formik.errors.date_of_incorporation
              ? formik.errors.date_of_incorporation
              : ""
          }
          onChange={formik.handleChange}
          name="date_of_incorporation"
          outlined
          type="date"
          label="Date of incorporation/registration"
        />

        <div style={{ display: "flex", alignItems: "center" }}>
          <h3>Have a parent company?</h3>
          <input
            onChange={(e) => {
              setIsparent(e.target.checked);
            }}
            type="checkbox"
          />
        </div>
        {isParent && (
          <Fade>
            <Input
              value={formik.values.ultimate_owner}
              error={
                formik.touched.ultimate_owner && formik.errors.ultimate_owner
                  ? formik.errors.ultimate_owner
                  : ""
              }
              onChange={formik.handleChange}
              name="ultimate_owner"
              outlined
              label="Ultimate parent company or owner"
            />
          </Fade>
        )}

        <h2>Directors*</h2>
        {formik.values.share_holders.length == 0 && (
          <div
            style={{
              height: 150,

              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            className="add-btn"
          >
            <AddButton onClick={()=>{
              formik.setValues({
                ...formik.values,
                share_holders:[{ name: "", phone: "" }]
              })
            }} label="Add Director" />
          </div>
        )}
        <FieldArray
          name="share_holders"
          render={(arrayHelpers) => {
            const stakeHolders = formik.values.share_holders;
            return (
              <>
                {stakeHolders.length > 0 &&
                  stakeHolders.map((stk, ind) => (
                    <div className="sub-group">
                      <Input
                        error={
                          formik.touched.share_holders &&
                          formik.errors.share_holders
                            ? formik.errors.share_holders
                            : ""
                        }
                        style={{ width: "30%" }}
                        {...formik.getFieldProps(`share_holders.${ind}.name`)}
                        onChange={formik.handleChange}
                        outlined
                        label="Director's Fullname"
                      />
                      <Input
                        style={{ width: "30%" }}
                        {...formik.getFieldProps(`share_holders.${ind}.phone`)}
                        onChange={formik.handleChange}
                        outlined
                        label="Director's Phone number"
                      />

                      {stakeHolders.length - 1 == ind && (
                        <AddButton
                          onClick={() => {
                            arrayHelpers.push({ name: "", phone: "" });
                          }}
                          label=""
                        />
                      )}
                      
                        <DeleteButton
                          label=""
                          onClick={() => {
                            arrayHelpers.remove(ind);
                          }}
                        />
                      
                    </div>
                  ))}
              </>
            );
          }}
        />
        <h2>Contact Persons</h2>
        {formik.values.contact_person.length == 0 && (
          <div
            style={{
              height: 150,

              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            className="add-btn"
          >
            <AddButton onClick={()=>{
              formik.setValues({
                ...formik.values,
                contact_person:[{ name: "", phone: "", email: "", address: "" }]
                
              })
            }} label="Add Contact Person" />
          </div>
        )}
        <FieldArray
          name="contact_person"
          render={(arrayHelpers) => {
            const contactPersons = formik.values.contact_person;
            return (
              <>
                {contactPersons.length > 0 &&
                  contactPersons.map((stk, ind) => (
                    <div className="sub-group">
                      <Input
                        error={
                          formik.touched.contact_person &&
                          formik.errors.contact_person
                            ? formik.errors.contact_person
                            : ""
                        }
                        style={{ width: "20%" }}
                        {...formik.getFieldProps(`contact_person.${ind}.name`)}
                        onChange={formik.handleChange}
                        outlined
                        label="Name"
                      />
                      <Input
                        style={{ width: "20%" }}
                        {...formik.getFieldProps(`contact_person.${ind}.phone`)}
                        onChange={formik.handleChange}
                        outlined
                        label="Phone number"
                      />
                      <Input
                        style={{ width: "20%" }}
                        {...formik.getFieldProps(`contact_person.${ind}.email`)}
                        onChange={formik.handleChange}
                        outlined
                        label="Email"
                      />
                      <Input
                        style={{ width: "20%" }}
                        {...formik.getFieldProps(
                          `contact_person.${ind}.address`
                        )}
                        onChange={formik.handleChange}
                        outlined
                        label="Address"
                      />

                      {contactPersons.length - 1 == ind && (
                        <AddButton
                          onClick={() => {
                            arrayHelpers.push({ name: "", phone: "" });
                          }}
                          label=""
                        />
                      )}
                      
                        <DeleteButton
                          label=""
                          onClick={() => {
                            arrayHelpers.remove(ind);
                          }}
                        />
                      
                    </div>
                  ))}
              </>
            );
          }}
        />
      </FormikProvider>
      <Documents nextRun={nextMove} saveData={saveData} />
      {/* <div className="save_next">
      <Button
        style={{
          width:100,
          marginRight:20,
          backgroundColor:'#2230ff'
        }}
        onClick={async () => {
          // if (started) {
          //   moveToTab(4);
          //   return;
          // }
          const bodyData = {
            application_id: data.applicant.application.id,
            authorised_personel: data.user.user.inCharge,
            update: started ? "1" : "0",
            ...formik.values,
          };
    
          setLoading(true);
          const response = await query({
            method: "POST",
            url: "/api/applicant/application/create/profile",
            token: data.user.user.token,
            bodyData,
          });
    
          if (response.success) {
            // dispatch(setApplication(response.data.data.application));
            setAlert("Data saved");
            // moveToTab(4);
          } else {
            setAlert("Application failed, please try again");
          }
          setLoading(false)
          setTimeout(() => {
            setAlert("");
          }, 2000);
        }}
        label="Save"
      />
      <Button
       style={{
         width:100
       }}
        onClick={() => {
          formik.handleSubmit();
        }}
        label="Next"
      />

      </div>
       */}
    </div>
  );
}
