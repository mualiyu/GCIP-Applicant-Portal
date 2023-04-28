import React from "react";
import Input from "../../../components/Input";
import { RegularText } from "../../../components/Common";
import "../../styles/profileDetail.css";
import { FieldArray, FormikProvider, useFormik } from "formik";
import Button from "../../../components/Button";
import AddButton from "../../../components/AddButton";
import DeleteButton from "../../../components/DeleteButton";
import { DeleteIcon } from "../../../assets/Svg/Index";
export default function ProfileDetail() {
  const initialValues = {
    applicant_name: "",
    date_of_incorporation: "",
    brief_description: "",
    website: "",
    stake_holders: [{ name: "" }],
    ultimate_owner: "",
    contact_name: "",
    contact_email: "",
    contact_phone: "",
    contact_address: "",
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
                        style={{ width: "80%" }}
                        {...formik.getFieldProps(`stake_holders.${ind}.name`)}
                        onChange={formik.handleChange}
                        outlined
                        label="Stake holder name"
                      />
                      {stakeHolders.length - 1 == ind && (
                        <AddButton
                          onClick={() => {
                            arrayHelpers.push({ name: "" });
                          }}
                          label="Add Stake Holder"
                        />
                      )}
                      {stakeHolders.length - 1 !== ind && (
                        <DeleteIcon
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

        <Input
          onChange={formik.handleChange}
          name="ultimate_owner"
          outlined
          label="Ultimate Owner"
        />
        <Input
          onChange={formik.handleChange}
          name="contact_name"
          outlined
          label="Contact name"
        />
        <Input
          onChange={formik.handleChange}
          name="contact_email"
          outlined
          label="Contact email"
        />
        <Input
          onChange={formik.handleChange}
          name="contact_phone"
          outlined
          label="Contact phone"
        />
        <Input
          onChange={formik.handleChange}
          name="contact_address"
          outlined
          label="Contact address"
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
