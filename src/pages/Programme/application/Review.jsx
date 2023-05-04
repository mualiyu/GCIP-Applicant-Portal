import React from "react";
import Button from "../../../components/Button";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import query from "../../../helpers/query";
import { useState } from "react";
import "../../styles/review.css";
import Loading from "../../../components/Loading";
import Alert from "../../../components/Alert";
import { useNavigate } from "react-router-dom";
import { persistor } from "../../../redux/store";

function Review() {
  const [loading, setLoading] = useState(true);
  const [current, setCurrent] = useState(null);
  const [loading2,setLoading2]=useState(false)
  const [alertText, setAlert] = useState("");
  const navigate=useNavigate()
 
  const programData = useSelector((state) => state);
  const getData = async () => {
    const { success, data, error } = await query({
      method: "GET",
      url: `/api/applicant/application/get?program_id=${programData.program.id}`,
      token: programData.user.user.token,
    });
   
    setLoading(false);
    if (success) {
      setCurrent(data.data.application);
    }
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <div>
    <Loading loading={loading2}/>
    <Alert text={alertText}/>
      <h3>Review and submit</h3>
      <div className="review-sub">
        <h2>Application Profile</h2>
        {current !== null && (
          <div className="review-item">
            <div>
              <p>Business Name</p>
              <h4>{current.application_profile[0].name}</h4>
               </div>

               <div>
              <p>RC Number</p>
              <h4>{current.application_profile[0].cac_number}</h4>
               </div>
               <div>
              <p>Address</p>
              <h4>{current.application_profile[0].address}</h4>
               </div>
               <div>
              <p>Authorised Personel</p>
              <h4>{current.application_profile[0].authorised_personel}</h4>
               </div>
          </div>
        )}

<h2>Employees</h2>
{current !== null && (
          <div className="review-item">
            {
              current.application_staff.map((apl,ind)=>(
              <>
              <div>
              <p>Name</p>
              <h4>{apl.name}</h4>
               </div>

              <div>
              <p>Countries of experience</p>
              <h4>{apl.countries_experience}</h4>
               </div>

               <div>
              <p>Nationality</p>
              <h4>{apl.nationality}</h4>
               </div>

               <div>
              <p>Work Undertaken</p>
              <h4>{apl.work_undertaken}</h4>
               </div>
               <div>
              <p>Spoken Languages</p>
              <h4>{apl.language}</h4>
               </div>
              </>
              
              ))
            }
           
          </div>
        )}
      </div>

      {loading && <img src="/loading.gif" id="loader" />}
      <Button
        style={{
          width: 200,
          marginLeft: "auto",
          marginTop: 20,
        }}
        onClick={async () => {
          const bodyData = {
           
            
          };

          setLoading2(true);
          const response = await query({
            method: "POST",
            url: `/api/applicant/application/submit?application_id=${programData.applicant.application.id}`,
            token: programData.user.user.token,
            bodyData,
          });

          setLoading2(false);
          if (response.success) {
            // dispatch(setApplication(response.data.data.application));
            setAlert("Application Submitied");
            localStorage.clear()
            
            
          } else {
            setAlert("Application failed, please try again");
          }
          setTimeout(() => {
            navigate('/Home')
            setAlert("");
          }, 2000);
        }}
        label="Submit"
      />
    </div>
  );
}

export default Review;

{
  /* <table border={1}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Rating</th>
            <th>Review</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={item.id}>
              <td>{++index}</td>
              <td>{item.name}</td>
              <td>{item.rating}</td>
              <td>{item.review}</td>
              <td>
                {item.document.map((item) => (
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <span>{item.rating}</span>
                    <span>{item.review}</span>
                  </div>
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table> */
}
