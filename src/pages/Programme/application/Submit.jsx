import { useNavigate } from "react-router-dom";
import Alert from "../../../components/Alert";
import { Header } from "../../../components/Common";
import Loading from "../../../components/Loading";
import "../../styles/submit.css";
import { formatCurrency } from "../../../helpers/formatCurrency";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import query from "../../../helpers/query";
import nProgress from "nprogress";
import Modal from "react-modal";
import Button from "../../../components/Button";
import { MoonLoader } from "react-spinners";
import moment from "moment";
import convertToPDF from "../../../helpers/documentConverter";

function Submit() {
  const [loading, setLoading] = useState(true);
  const [current, setCurrent] = useState(null);
  const [loading2, setLoading2] = useState(false);
  const [alertText, setAlert] = useState("");
  const [openSubmittedModal, setOpenSubmittedModal] = useState(false);
  const navigate = useNavigate();
  const [isConverting, setIsConverting] = useState(false);

  const programData = useSelector((state) => state);
  const getData = async () => {
    nProgress.start();
    setLoading(true);
    const { success, data, error } = await query({
      method: "GET",
      url: `/api/applicant/application/get?program_id=${programData.program.id}`,
      token: programData.user.user.token,
    });
    nProgress.done();
    setLoading(false);
    if (success) {
      setCurrent(data.data.application);
      console.log(data.data.application);
    }
  };
  const handleConvertToPDF = () => {
    convertToPDF(
      "divToPrint",
      `${current.application_profile[0]?.name}`,
      setIsConverting
    );
  };
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      maxHeight: "90vh",
      minWidth: "40vw",
      overflowX: "hidden",
      maxWidth: "40vw",
    },
    overlay: {
      backgroundColor: "rgba(0,0,0,0.5)",
    },
  };
  useEffect(() => {
    getData();
  }, []);
  let data = [
    {
      name: "Mubarak",
      rc: "34 323 ",
      date: "2014",
      parent: "Ibrahim",
      authorizes: "true",
    },
  ];

  return (
    <div className="review-container">
      {loading && (
        <MoonLoader
          size={25}
          cssOverride={{ position: "absolute", left: "50%", top: "50%" }}
        />
      )}
      <section id="divToPrint">
        <Alert text={alertText} />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBotton: 30,
          }}>
          <div>
            <Header
              style={{ color: "var(--primary)" }}
              text="Company Overview"
            />{" "}
            &nbsp; - &nbsp;
            <span
              style={{
                fontSize: 11,
                backgroundColor: current?.status ? "#23dc38" : "#dc2323",
                padding: "6px 15px",
                color: "#fff",
                borderRadius: 15,
              }}>
              {/* {!current?.status ? "Draft Application" : "Application Submited"} */}
              {current?.status == null
                ? "Draft Application"
                : current?.status == 1
                ? "Submitted"
                : current?.status == 2
                ? "Queried"
                : current?.status == 3
                ? "Successful"
                : current?.status == 5
                ? "Under Review"
                : "Unsuccessful"}
            </span>
          </div>

          <Button
            onClick={handleConvertToPDF}
            className="no-print"
            fontStyle={{
              color: "var(--primary)",
            }}
            style={{
              width: 134,
              backgroundColor: "#fff",
              border: "1px solid var(--primary)",
              marginRight: 15,
            }}
            disabled={isConverting}
            label="Download Pdf"
          />
        </div>
        {/* {loading && <img src="/loading.gif" id="loader" />} */}
        {loading && (
          <MoonLoader
            size={25}
            cssOverride={{ position: "absolute", left: "50%", top: "50%" }}
          />
        )}
        {/* {current !== null && (
        <Alert text={alertText} />
        <h3>
          {!current.status ? "Drafted Application" : "Submited Application"}
        </h3> */}
        {/* <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBotton: 30,
          }}
        >
          <Header style={{ color: "var(--primary)" }} text="Company Overview" />

          <Button
            onClick={() =>
              convertToPDF(
                "divToPrint",
                `${current.application_profile[0].name}`
              )
            }
            className="no-print"
            fontStyle={{
              color: "var(--primary)",
            }}
            style={{
              width: 134,
              backgroundColor: "#fff",
              border: "1px solid var(--primary)",
              marginRight: 15,
            }}
            label="download PDF"
          />
        </div> */}
        {/* {loading && <img src="/loading.gif" id="loader" />} */}
        {loading && (
          <MoonLoader
            size={25}
            cssOverride={{ position: "absolute", left: "50%", top: "50%" }}
          />
        )}
        {current !== null && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              textTransform: "uppercase",
              margin: "20px 0",
              borderBottom: "1px dashed #ccc",
              paddingBottom: 20,
              fontSize: 11,
            }}>
            <div className="lh-2">
              <h2 className="review_title">Business name</h2>
              <p>
                {" "}
                {current.application_profile.length > 0 &&
                  current.application_profile[0].name}{" "}
              </p>
            </div>

            <div className="lh-2">
              <h2 className="review_title">RC Number</h2>
              <p>
                {current.application_profile.length > 0 &&
                  current.application_profile[0].cac_number}{" "}
              </p>
            </div>

            <div className="lh-2">
              <h2 className="review_title">incorporation Date</h2>
              <p>
                {" "}
                {current.application_profile.length > 0 &&
                  current.application_profile[0].registration_date}{" "}
              </p>
            </div>

            <div className="lh-2">
              <h2 className="review_title">Authorized Personnel</h2>
              <p>
                {" "}
                {current.application_profile.length > 0 &&
                current.application_profile[0].authorised_personel
                  ? current.application_profile[0].authorised_personel
                  : "N/A"}{" "}
              </p>
            </div>
          </div>
        )}

        {current !== null && (
          <div className="lh-2 review__summary text-uc">
            <h2 className="review_title">Business Address</h2>
            <p>
              {current.application_profile.length > 0 &&
                current.application_profile[0].address}{" "}
            </p>
          </div>
        )}

        {current !== null && (
          <div className="my-60">
            <h2 className="review_title">JOINT VENTURE</h2>
            <div
              style={{
                borderBottom: "1px dashed #ccc",
                paddingBottom: 20,
              }}></div>
            {current.jvs?.length == 0 && (
              <p className="no-record">No Record has been added</p>
            )}
            {current.jvs?.length > 0 && (
              <table
                className="review_table"
                style={{ width: "100%", textAlign: "left", fontSize: "11px" }}>
                <thead>
                  <th>S/N</th>
                  <th>Business Name</th>
                  <th>Contact</th>
                  {/* <th>Total networth</th> */}
                  <th> CAC</th>
                  <th> Audited A/C</th>
                  <th> Income Tax</th>
                  <th> Letter of Auth</th>
                  <th> Affidavit</th>
                </thead>
                <tbody>
                  {current.jvs?.map((item, index) => {
                    return (
                      <tr key={item.id}>
                        <td>{index + 1}</td>
                        <td>
                          {item.name} <br />
                          <span>RC:{item.rc_number}</span>
                        </td>
                        <td>
                          {item.email} <br />
                          <span>Phone: {item.phone}</span>
                        </td>
                        <td>{item.evidence_of_cac ? "Uploaded" : "N/A"}</td>
                        <td>{item.audited_account ? "Uploaded" : "N/A"}</td>
                        <td>{item.company_income_tax ? "Uploaded" : "N/A"}</td>
                        <td>
                          {item.letter_of_authorization ? "Uploaded" : "N/A"}
                        </td>
                        <td>{item.sworn_affidavits ? "Uploaded" : "N/A"}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        )}

        {current !== null && (
          <div className="directors-container">
            <div className="first f-11">
              <h2 className="review_title">Directors information</h2>
              <table
                className="review_table"
                style={{ width: "100%", textAlign: "left", fontSize: "11px" }}>
                <thead>
                  <th>S/N</th>
                  <th>FULL Name</th>
                  <th>Contact </th>
                </thead>
                <tbody>
                  {current.application_profile.length > 0 &&
                    current.application_profile[0].share_holders.map(
                      (item, index) => {
                        return (
                          <tr key={index}>
                            <td>{++index}</td>
                            <td>{item.name}</td>
                            <td>{item.phone}</td>
                          </tr>
                        );
                      }
                    )}
                </tbody>
              </table>
            </div>

            <div className="f-11">
              <h2 className="review_title"> Contact Person</h2>
              <table
                className="review_table"
                style={{ width: "100%", textAlign: "left", fontSize: "11px" }}>
                <thead>
                  <th>S/N</th>
                  <th>Full Name</th>
                  <th>Contact </th>
                  <th>Email</th>
                </thead>
                <tbody>
                  {current.application_profile.length > 0 &&
                    current.application_profile[0].contact_persons.map(
                      (item, index) => {
                        return (
                          <tr key={index}>
                            <td>{++index}</td>
                            <td>{item.name}</td>
                            <td>{item.phone}</td>
                            <td>{item.email}</td>
                          </tr>
                        );
                      }
                    )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {current !== null && (
          <div style={{ fontSize: 11, textAlign: "left" }}>
            <h2 className="review_title">Document uploaded</h2>
            <table
              className="review_table"
              style={{ width: "100%", textAlign: "left", fontSize: "11px" }}>
              <thead>
                <th>S/N</th>
                <th style={{ width: "60%" }}>Document</th>
                <th>Status </th>
              </thead>
              <tbody>
                {current.application_documents.map((item, index) => {
                  return (
                    <tr key={Math.random()}>
                      <td>{++index}</td>
                      <td>{item.name}</td>
                      {/* <td>{item.coren_license_number ? "YES" : "NO"}</td> */}
                      {/* <td>{item.current_position?.position}</td> */}
                      <td>{item.url ? "Uploaded" : "Failed"}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {current !== null && (
          <div className="my-60">
            <h2 className="review_title">technical requirements (staff)</h2>
            <div
              style={{
                borderBottom: "1px dashed #ccc",
                paddingBottom: 20,
              }}></div>
            {current.application_staff.length == 0 && (
              <p className="no-record">No Record has been added</p>
            )}
            {current.application_staff.length > 0 && (
              <table
                style={{ width: "100%", textAlign: "left", fontSize: "11px" }}
                className="review_table">
                <thead>
                  <th>S/N</th>
                  <th>Name</th>
                  <th>Gender</th>
                  <th>COREN Member</th>
                  <th>COREN ID</th>
                  <th>Position</th>
                  <th>
                    Uploaded <br /> Educational Cert
                  </th>
                  <th>
                    Uploaded <br /> Coren
                  </th>
                  <th>
                    Uploaded <br /> Professional Cert
                  </th>
                  <th>
                    Uploaded <br /> Resume{" "}
                  </th>
                </thead>

                <tbody>
                  {current?.application_staff.map((item, index) => {
                    return (
                      <tr key={item?.id}>
                        <td>{++index}</td>
                        <td>{item?.name}</td>
                        <td>{item?.gender}</td>
                        <td>
                          {item?.coren_license_number == null ? "NO" : "YES"}
                        </td>
                        <td>
                          {item?.coren_license_number == null
                            ? "N/A"
                            : item?.coren_license_number}
                        </td>
                        <td>
                          {item?.current_position == null
                            ? "N/A"
                            : item?.current_position.position}
                        </td>
                        <td>
                          {item?.education_certificate == null
                            ? "N/A"
                            : "UPLOADED"}
                        </td>
                        <td>
                          {item?.coren_license_document == null
                            ? "N/A"
                            : "UPLOADED"}
                        </td>
                        <td>
                          {item?.professional_certificate == null
                            ? "N/A"
                            : "UPLOADED"}
                        </td>
                        <td>{item?.cv == null ? "N/A" : "UPLOADED"}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        )}

        {current !== null && (
          <div className="my-60">
            <h2 className="review_title">reference-project(s)</h2>
            <div
              style={{
                borderBottom: "1px dashed #ccc",
                paddingBottom: 20,
              }}></div>
            {current.application_projects?.length == 0 && (
              <p className="no-record">No Record has been added</p>
            )}
            {current.application_projects?.length > 0 && (
              <>
                {current.application_projects.map((item, index) => {
                  return (
                    <div
                      style={{
                        fontSize: 11,
                        padding: 10,
                        textTransform: "uppercase",
                      }}
                      key={item.id}>
                      <div className="project_details">
                        <section style={{ display: "flex", margin: 7 }}>
                          <div
                            style={{
                              textTransform: "uppercase",
                              width: 150,
                              paddingRight: 10,
                              fontWeight: "bolder",
                            }}>
                            Project Title :
                          </div>
                          <p> {item.name}</p>
                        </section>
                        <section style={{ display: "flex", margin: 7 }}>
                          <div
                            style={{
                              textTransform: "uppercase",
                              width: 150,
                              paddingRight: 10,
                              fontWeight: "bolder",
                            }}>
                            Employer :
                          </div>
                          <p> {item.employer}</p>
                        </section>
                        <section style={{ display: "flex", margin: 7 }}>
                          <div
                            style={{
                              textTransform: "uppercase",
                              width: 150,
                              paddingRight: 10,
                              fontWeight: "bolder",
                            }}>
                            Project Location :
                          </div>
                          <p> {item.location}</p>
                        </section>
                        <section
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            borderTop: "1px dashed #ccc",
                            paddingBottom: 10,
                            marginTop: 20,
                          }}>
                          {/* <section style={{ margin: 7 }}>
                            <div
                              style={{
                                textTransform: "uppercase",
                                width: 150,
                                paddingBottom: 10,
                                fontWeight: "bolder",
                              }}>
                              Project Cost :
                            </div>
                            <p> {formatCurrency(item.project_cost)}</p>
                          </section> */}
                          <section style={{ margin: 7 }}>
                            <div
                              style={{
                                textTransform: "uppercase",
                                width: 150,
                                paddingBottom: 10,
                                fontWeight: "bolder",
                              }}>
                              Award Date:
                            </div>
                            <p>{moment(item.date_of_contract).format("L")}</p>
                          </section>
                          <section style={{ margin: 7 }}>
                            <div
                              style={{
                                textTransform: "uppercase",
                                width: 150,
                                paddingBottom: 10,
                                fontWeight: "bolder",
                              }}>
                              Completion date:
                            </div>
                            <p>
                              {" "}
                              {moment(item.date_of_completion).format("L")}
                            </p>
                          </section>
                          <section style={{ margin: 7 }}>
                            <div
                              style={{
                                textTransform: "uppercase",
                                width: 150,
                                paddingBottom: 10,
                                fontWeight: "bolder",
                              }}>
                              Geo Coordinate:
                            </div>
                            <p> {item.geocoordinate}</p>
                          </section>
                        </section>
                        <section style={{ display: "flex", margin: 7 }}>
                          <div
                            style={{
                              textTransform: "uppercase",
                              width: 150,
                              paddingRight: 10,
                              fontWeight: "bolder",
                            }}>
                            Description
                          </div>
                          <p> {item.description}</p>
                        </section>
                        <section style={{ display: "flex", margin: 7 }}>
                          <div
                            style={{
                              textTransform: "uppercase",
                              width: 150,
                              paddingRight: 10,
                              fontWeight: "bolder",
                            }}>
                            Sub Contracted?
                          </div>
                          <p>
                            {" "}
                            {item?.subcontactor_role ? "Yes" : "No"} - (
                            {item?.subcontactor_role
                              ? item?.subcontactor_role
                              : "N/A"}
                            )
                          </p>
                        </section>

                        <section
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            border: "1px dashed #ccc",
                            padding: 5,
                            marginTop: 20,
                          }}>
                          {item.sub_contractors?.length > 0 &&
                            item.sub_contractors?.map((sc, index) => {
                              return (
                                <section
                                  style={{
                                    borderRight: "thin dashed #ccc",
                                    paddingRight: "20%",
                                  }}>
                                  <section
                                    style={{ display: "flex", margin: 7 }}>
                                    <div
                                      style={{
                                        textTransform: "uppercase",
                                        width: 150,
                                        paddingRight: 10,
                                        fontWeight: "bolder",
                                      }}>
                                      Sub Contractor - {index + 1}
                                    </div>
                                    <p> {sc.name}</p>
                                  </section>
                                  <section
                                    style={{ display: "flex", margin: 7 }}>
                                    <div
                                      style={{
                                        textTransform: "uppercase",
                                        width: 150,
                                        paddingRight: 10,
                                        fontWeight: "bolder",
                                      }}>
                                      Address
                                    </div>
                                    <p> {sc.address}</p>
                                  </section>
                                </section>
                              );
                            })}

                          {item.referees?.length > 0 &&
                            item.referees?.map((rf, index) => {
                              return (
                                <section>
                                  <section
                                    style={{ display: "flex", margin: 7 }}>
                                    <div
                                      style={{
                                        textTransform: "uppercase",
                                        width: 150,
                                        paddingRight: 10,
                                        fontWeight: "bolder",
                                      }}>
                                      Referee - {index + 1}
                                    </div>
                                    <p> {rf.name}</p>
                                  </section>
                                  <section
                                    style={{ display: "flex", margin: 7 }}>
                                    <div
                                      style={{
                                        textTransform: "uppercase",
                                        width: 150,
                                        paddingRight: 10,
                                        fontWeight: "bolder",
                                      }}>
                                      phone
                                    </div>
                                    <p> {rf.phone}</p>
                                  </section>
                                </section>
                              );
                            })}
                        </section>
                      </div>
                    </div>
                  );
                })}
              </>
            )}
          </div>
        )}

        {current !== null && (
          <div className="my-60">
            <h2 className="review_title">financial-details</h2>
            <div
              style={{
                borderBottom: "1px dashed #ccc",
                paddingBottom: 20,
              }}></div>
            {current.application_financials?.financial_info?.length == 0 && (
              <p className="no-record">No Record has been added</p>
            )}
            {current.application_financials?.financial_info?.length > 0 && (
              <table
                className="review_table"
                style={{ width: "100%", textAlign: "left", fontSize: "11px" }}>
                <thead>
                  <th></th>
                  <th>Total assets</th>
                  <th>Annual turn over</th>
                  <th>Total networth</th>
                  <th>Total liabilities</th>
                </thead>
                <tbody>
                  {current.application_financials?.financial_info?.map(
                    (item) => {
                      return (
                        <tr key={item.id}>
                          <td>{item.type.toUpperCase()}</td>
                          <td>{item.total_assets}</td>
                          <td>{item.annual_turnover}</td>
                          <td>{item.total_networth}</td>
                          <td>{item.total_liability}</td>
                        </tr>
                      );
                    }
                  )}
                </tbody>
              </table>
            )}
          </div>
        )}
        {current !== null && (
          <div className="my-60">
            <h2 className="review_title">financial debts information</h2>
            {/* <div
            style={{ borderBottom: "1px dashed #ccc", paddingBottom: 20 }}
          ></div> */}
            {current.application_financials?.financial_dept_info?.length ==
              0 && <p className="no-record">No Record has been added</p>}
            {current.application_financials?.financial_dept_info?.length > 0 &&
              current.application_financials?.financial_dept_info?.map(
                (debt, index) => {
                  return (
                    <div
                      key={index}
                      style={{
                        fontSize: 11,
                        padding: 10,
                        textTransform: "uppercase",
                      }}>
                      <div className="project_details">
                        <section
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            border: "1px dashed #ccc",
                            padding: 5,
                            marginTop: 20,
                          }}>
                          <section
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between",
                              // borderTop: "1px dashed #ccc",
                              paddingBottom: 10,
                              marginTop: 20,
                            }}>
                            <section style={{ margin: 7 }}>
                              <div
                                style={{
                                  textTransform: "uppercase",
                                  width: 150,
                                  paddingBottom: 10,
                                  fontWeight: "bolder",
                                }}>
                                Project name:
                              </div>
                              <p> {debt.project_name}</p>
                            </section>
                            <section style={{ margin: 7 }}>
                              <div
                                style={{
                                  textTransform: "uppercase",
                                  width: 150,
                                  paddingBottom: 10,
                                  fontWeight: "bolder",
                                }}>
                                Sector:
                              </div>
                              <p>{debt.sector}</p>
                            </section>
                            <section style={{ margin: 7 }}>
                              <div
                                style={{
                                  textTransform: "uppercase",
                                  width: 150,
                                  paddingBottom: 10,
                                  fontWeight: "bolder",
                                }}>
                                Aggregate:
                              </div>
                              <p> {debt.aggregate_amount}</p>
                            </section>
                            <section style={{ margin: 7 }}>
                              <div
                                style={{
                                  textTransform: "uppercase",
                                  width: 150,
                                  paddingBottom: 10,
                                  fontWeight: "bolder",
                                }}>
                                Loaction:
                              </div>
                              <p> {debt?.location}</p>
                            </section>
                            <section style={{ margin: 7 }}>
                              <div
                                style={{
                                  textTransform: "uppercase",
                                  width: 150,
                                  paddingBottom: 10,
                                  fontWeight: "bolder",
                                }}>
                                Date of Financial Close:
                              </div>
                              <p> {debt?.date_of_financial_close}</p>
                            </section>
                          </section>
                        </section>

                        <section
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            padding: 5,
                            marginTop: 20,
                          }}>
                          {debt?.borrowers?.length > 0 &&
                            debt?.borrowers.map((borrower, index) => {
                              return (
                                <section
                                  style={{
                                    borderRight: "thin dashed #ccc",
                                    paddingRight: "20%",
                                  }}>
                                  <section
                                    style={{ display: "flex", margin: 7 }}>
                                    <div
                                      style={{
                                        textTransform: "uppercase",
                                        width: 150,
                                        paddingRight: 10,
                                        fontWeight: "bolder",
                                      }}>
                                      Borrower - {++index}
                                    </div>
                                    <p> {borrower?.name}</p>
                                  </section>
                                  <section
                                    style={{ display: "flex", margin: 7 }}>
                                    <div
                                      style={{
                                        textTransform: "uppercase",
                                        width: 150,
                                        paddingRight: 10,
                                        fontWeight: "bolder",
                                      }}>
                                      RC Number
                                    </div>
                                    <p> {borrower?.rc_number}</p>
                                  </section>
                                  <section
                                    style={{ display: "flex", margin: 7 }}>
                                    <div
                                      style={{
                                        textTransform: "uppercase",
                                        width: 150,
                                        paddingRight: 10,
                                        fontWeight: "bolder",
                                      }}>
                                      Address
                                    </div>
                                    <p> {borrower.address}</p>
                                  </section>
                                </section>
                              );
                            })}
                        </section>
                      </div>
                    </div>
                  );
                }
              )}
          </div>
        )}

        {current?.application_decisions !== 0 && !loading && (
          <div
            className="my-60"
            style={{ borderTop: "thin dashed grey", padding: "20px 0" }}>
            <h2
              className="review_title"
              style={{ color: "red", fontWeight: 900 }}>
              Application Status Reviews & Decisions
            </h2>
            {current?.application_decisions?.length == 0 && (
              <p className="review_title"> No review yet</p>
            )}
            {current?.application_decisions.length > 0 && (
              <table
                className=""
                style={{ width: "100%", textAlign: "left", fontSize: "11px" }}>
                <thead>
                  <th>S/N</th>
                  <th>Status</th>
                  <th>Remark</th>
                  <th>Review date</th>
                  <th>Observations</th>
                </thead>
                <tbody>
                  {current?.application_decisions?.map((decision, index) => {
                    return (
                      <tr key={decision.id}>
                        <td>{index + 1}</td>
                        <td>
                          {decision.status == 1
                            ? "Submitted"
                            : decision.status == 2
                            ? "Queried"
                            : decision.status == 3
                            ? "Successful"
                            : decision.status == 5
                            ? "Under Review"
                            : "Unsuccessful"}
                        </td>
                        <td>{decision?.remark}</td>
                        <td>{moment(decision?.updated_at).format("llll")} </td>
                        <td>
                          <ol type="a">
                            {decision?.concerns.map((concern) => {
                              return <li key={concern.id}>{concern}</li>;
                            })}
                          </ol>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        )}

        {/* {!loading && (
          <Button
            disabled={
              current == null
                ? true
                : current.application_profile.length == 0 ||
                  current.application_staff.length == 0 ||
                  current.application_profile[0]?.share_holders?.length == 0 ||
                  current.application_profile[0]?.contact_persons?.length == 0
                ? true
                : false
            }
            style={{
              marginLeft: "auto",
              marginTop: 20,
              width: 200,
            }}
            onClick={async () => {
              const bodyData = {};

              setLoading2(true);
              const response = await query({
                method: "POST",
                url: `/api/applicant/application/submit?application_id=${programData.applicant.application.id}`,
                token: programData.user.user.token,
                bodyData,
              });

              setLoading2(false);
              if (response.success) {
                setAlert("Application Submitied");
                setOpenSubmittedModal(true);reminder
              } else {
                setAlert(
                  "You have to upload all documents relevant in the ELIGIBILITY REQUIREMENTS"
                );
              }
              setTimeout(() => {
                setAlert("");
              }, 2000);
            }}
            label="Submit"
          />
        )} */}
      </section>
      {/* </Preview> */}

      <Modal
        isOpen={openSubmittedModal}
        appElement={document.getElementById("root")}
        style={customStyles}>
        <div
          className=""
          style={{
            display: "flex",
            flexDirection: "column",
          }}>
          <Header text="Application submitted" />
          <div className="">
            <p style={{ lineHeight: "2em" }}>
              Thank you for your interest in the UNDP-GEF Africa Minigrids
              Program (AMP). Your application has been submitted successfully.{" "}
              <span style={{ fontWeight: 900 }}>
                Your application will be opened in a hybrid physical-virtual
                ceremony at 1.00pm (WAT) on Thursday 24th August 2023.{" "}
              </span>
              <br /> <br />
              The virtual link is attached in the confirmation email sent to
              you. For further enquiry, kindly drop a message on the platform.
              Thank you!
            </p>
          </div>

          <div
            style={{
              display: "flex",
              width: "25%",
              marginTop: 48,
              justifyContent: "space-between",
              marginLeft: "auto",
            }}>
            <Button
              onClick={() => {
                setOpenSubmittedModal(false);
                navigate("/Home");
              }}
              fontStyle={{
                color: "var(--primary)",
              }}
              style={{
                width: 134,
                backgroundColor: "#fff",
                border: "1px solid var(--primary)",
              }}
              label="Return to Home"
            />
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default Submit;
