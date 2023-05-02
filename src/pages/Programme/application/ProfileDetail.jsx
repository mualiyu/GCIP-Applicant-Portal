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

export default function ProfileDetail({ moveToTab }) {
  const data = useSelector((state) => state);
  const [loading, setLoading] = useState(false);
  const [alertText, setAlert] = useState("");
  const [started, setStarted] = useState(false);
  const [isParent, setIsparent] = useState(false);
  const getData = async () => {
    const respone = await query({
      method: "GET",
      url: `/api/applicant/application/get?program_id=${data.program.id}`,
      token: data.user.user.token,
    });

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
    share_holders: [{ name: "", phone: "" }],
    ultimate_owner: "",
    contact_person: [{ name: "", phone: "", email: "", address: "" }],
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
    validationSchema,
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
        setAlert("Application failed, please try again");
      }
      setTimeout(() => {
        setAlert("");
      }, 2000);
    },
  });

  const saveData = async () => {
    console.log("meeeeeeeeeeeee");
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
    setLoading(false);
    setTimeout(() => {
      setAlert("");
    }, 2000);
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <div className="profile_detail_container">
      <Warning msg="Applicant’s company profile showing capacity in renewable energy, off-grid, or rural electrification, agricultural facilities and productive use ventures including evidence of ownership or lease of relevant equipment for project execution e.g., Side Drop Crane, Pick Up Van, Test Equipment, etc. (Please attach proof of ownership or lease agreement where applicable)." />
      <Loading loading={loading} />
      <Alert text={alertText} />
      <FormikProvider value={formik}>
        <Input
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
        <div className="txtArea">
          <RegularText
            style={{ fontWeight: "bold" }}
            text="Brief Description of your business"
          />
          <textarea
            value={formik.values.brief_description}
            onChange={formik.handleChange}
            name="brief_description"
            rows={5}
          />
          {formik.touched.brief_description && formik.errors.brief_description
            ? formik.errors.brief_description
            : ""}
        </div>
        <Input
          value={formik.values.website}
          onChange={formik.handleChange}
          name="website"
          outlined
          label="Website link if any?"
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

        <h2>Directors</h2>
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
                        label="Director's name"
                      />
                      <Input
                        style={{ width: "30%" }}
                        {...formik.getFieldProps(`share_holders.${ind}.phone`)}
                        onChange={formik.handleChange}
                        outlined
                        label="Director's number"
                      />

                      {stakeHolders.length - 1 == ind && (
                        <AddButton
                          onClick={() => {
                            arrayHelpers.push({ name: "", phone: "" });
                          }}
                          label=""
                        />
                      )}
                      {stakeHolders.length - 1 !== ind && (
                        <DeleteButton
                          label=""
                          onClick={() => {
                            arrayHelpers.remove(ind);
                          }}
                        />
                      )}
                    </div>
                  ))}
              </>
            );
          }}
        />
        <h2>Contact Persons</h2>
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
                      {contactPersons.length - 1 !== ind && (
                        <DeleteButton
                          label=""
                          onClick={() => {
                            arrayHelpers.remove(ind);
                          }}
                        />
                      )}
                    </div>
                  ))}
              </>
            );
          }}
        />
      </FormikProvider>
      <Documents nextRun={() => formik.handleSubmit()} saveData={saveData} />
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
