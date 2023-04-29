import React from "react";
import Input from "../../../components/Input";
import { RegularText } from "../../../components/Common";
import "../../styles/profileDetail.css";
import { FieldArray, FormikProvider, useFormik } from "formik";
import Button from "../../../components/Button";
import AddButton from "../../../components/AddButton";
import DeleteButton from "../../../components/DeleteButton";

export default function ProfileDetail() {
  const initialValues = {
    applicant_name: "",
    date_of_incorporation: "",
    brief_description: "",
    website: "",
    stake_holders: [{ name: "", phone: "" }],
    ultimate_owner: "",
    contact_person: [{ name: "", phone: "", email: "", address: "" }],
  };
  const formik = useFormik({
    initialValues,
    onSubmit: (val) => {
      console.log(JSON.stringify(val));
    },
  });
  return (
    <div className="profile_detail_container">
      <FormikProvider value={formik}>
        <Input
          onChange={formik.handleChange}
          name="applicant_name"
          outlined
          label="Applicant Name"
        />
        <Input
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
            onChange={formik.handleChange}
            name="brief_description"
            rows={5}
          />
        </div>
        <Input
          onChange={formik.handleChange}
          name="website"
          outlined
          label="Website link if any?"
        />
        <Input
          onChange={formik.handleChange}
          name="ultimate_owner"
          outlined
          label="Ultimate parent company or owner"
        />
        <h2>Share Holders</h2>
        <FieldArray
          name="stake_holders"
          render={(arrayHelpers) => {
            const stakeHolders = formik.values.stake_holders;
            return (
              <>
                {stakeHolders.length > 0 &&
                  stakeHolders.map((stk, ind) => (
                    <div className="sub-group">
                      <Input
                        style={{ width: "30%" }}
                        {...formik.getFieldProps(`stake_holders.${ind}.name`)}
                        onChange={formik.handleChange}
                        outlined
                        label="Share holder name"
                      />
                      <Input
                        style={{ width: "30%" }}
                        {...formik.getFieldProps(`stake_holders.${ind}.phone`)}
                        onChange={formik.handleChange}
                        outlined
                        label="Share holder number"
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

      <Button
        style={{
          marginTop: 20,
          marginLeft: "auto",
          width: 200,
        }}
        onClick={() => {
          formik.handleSubmit();
        }}
        label="Next"
      />
    </div>
  );
}
