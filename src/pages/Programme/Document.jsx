import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/Loading";
import { FaUser } from "react-icons/fa";
import Button from "../../components/Button";
import { Document as MyDoc, Page } from "react-pdf";
import { Fade } from "react-awesome-reveal";
import MyModal from "../../components/MyModal";
import "../styles/document.css";
export default function Document() {
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [isPdf, setPdf] = useState(false);
  const [allDocs, setAllDocs] = useState([]);
  const [url, setUrl] = useState("");
  const programData = useSelector((state) => state);
  const [toggled, setToggled] = useState(false);
  const dispatch = useDispatch();
  const [modalOPen, setOPen] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [numPages, setNumPages] = useState(null);

  useEffect(() => {
    setAllDocs([...programData.program.program.uploads]);
  }, []);
  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }
  const navigate = useNavigate();
  return (
    <Fade>
      <div className="home_container">
        <MyModal isOpen={modalOPen}>
          <div className="doc-view">
            <Button
              style={{
                backgroundColor: "#000",
                maxWidth: 20,
                maxHeight: 20,
                marginLeft: "auto",
                marginTop: 10,
                marginBottom: 20,
              }}
              label="X"
              onClick={() => {
                setOPen(false);
              }}
            />
            {url !== "" && isPdf && (
              <embed
              src={url}
              type="application/pdf"
              height='100%'
              width='100%'
            />
            )}
            {url !== "" && !isPdf && (
              <img src={url} alt='none'/>
            )}
          </div>
        </MyModal>
        <h2>Program Documents</h2>
        <Loading loading={loading} />

        <table className="home_table_main">
          {allDocs.length > 0 && (
            <>
              <thead>
                <tr>
                  <th>S/N</th>
                  <th>Document</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {allDocs.map((doc, ind) => (
                  <tr key={ind.toString()}>
                    <td>{ind + 1}</td>
                    <td>{doc.name}</td>

                    <td>
                      <div className="table_actions">
                        <Button
                          style={{ width: 100 }}
                          onClick={() => {
                            const fileExtension = doc.file
                              .split("programFiles")[1]
                              .split(".")[1];
                            if (fileExtension == "pdf") {
                              setPdf(true);
                            }else{
                                setPdf(false)
                            }
                            setUrl(doc.file);
                            console.log(doc.file);
                            setOPen(true);
                          }}
                          label="View Doc"
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </>
          )}
        </table>
        {loading && <img src="/loading.gif" id="loader" />}
      </div>
    </Fade>
  );
}
