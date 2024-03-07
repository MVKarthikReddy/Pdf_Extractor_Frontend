import { useEffect, useState } from "react";
import axios from "axios";
import { pdfjs } from "react-pdf";
import '../styles/homepage.css'
import { IoIosCloseCircle } from "react-icons/io";


pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();

function HomePage() {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState("");
  const [allPdf, setAllPdf] = useState(null);
  const [url,setUrl] = useState(null)
  useEffect(() => {
    // console.log('Hello')
    getPdf();
  }, []);
  const getPdf = async () => {
    console.log("hello");
    const token = localStorage.getItem('token')
    const result = await axios.get("https://pdf-extractor-backend.onrender.com/api/pdf",{
        headers : {
            Authorization: `Bearer ${token}`
        }
    }
    ).then((res) => {
        console.log(res.data.pdfs)
        setAllPdf(res.data.pdfs)
        
    })
  };

  const submitPdf = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("pdf", file);
    console.log(title, file);
    const token = localStorage.getItem('token')

    const result = await axios.post(
      "https://pdf-extractor-backend.onrender.com/api/upload/",
      formData,
      {
        headers: { 
            
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data" },
      }
    ).then((res) => {
        console.log(res)
        alert("Uploaded Successfully!!!");
        setTitle("")
        setFile("")
        getPdf();
    })
   
  };
  const showPdf = (pdf) => {
    console.log(pdf)
    setUrl(pdf)
  };
  return (
    <div className="homepage">
      <form className="formStyle" onSubmit={submitPdf}>
        <h4>Upload Pdf</h4>
        <br />
        <input
          type="text"
          className="form-control"
          placeholder="Title"
          required
          onChange={(e) => setTitle(e.target.value)}
        />
        <br />
        <input
          type="file"
          className="form-control"
          accept="application/pdf"
          required
          onChange={(e) => setFile(e.target.files[0])}
        />
        <br />
        <button className="btn btn-primary" type="submit">
          Submit
        </button>
      </form>
      <div className="uploaded">
        <h4>Uploaded PDF:</h4>
        <div className="output-div">
            <div className="output-div1">
            {allPdf == null
                ? ""
                : allPdf.map((data,index) => {
                    return (
                        <>
                            <div className="inner-div" key={index}>
                                <h4>Title: {data.title}</h4>
                                <button
                                className="btn btn-primary"
                                onClick={() => showPdf(data.pdf)}
                                >
                                Show Pdf
                                </button>
                            </div>
                            
                        </>
                    );
                })}
            </div>
        </div>
        <div className="pdfContainer">
            
            {
                url && <IoIosCloseCircle className="crossmark" onClick={ () => {setUrl(null)}}/>
            }
            
            {
                url && 
                <iframe src = {url}
                        width="640px"
                        height="480px"
                    />
            }
        </div>
      </div>
    </div>
  );
}

export default HomePage;