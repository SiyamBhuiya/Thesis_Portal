import React, { useState } from "react";
import "../styles/submitThesis.css";

const SubmitThesis = () => {
  const [formData, setFormData] = useState({
    thesisTitle: "",
    thesisAbstract: "",
    authorName: "",
  });
  const [thesisFile, setThesisFile] = useState(null);
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");

  const studentID = localStorage.getItem("studentID"); // Assuming studentID is stored in localStorage

  const validate = () => {
    const newErrors = {};

    if (!formData.thesisTitle.trim()) {
      newErrors.thesisTitle = "Thesis title is required";
    }
    if (!formData.thesisAbstract.trim()) {
      newErrors.thesisAbstract = "Thesis abstract is required";
    }
    if (!thesisFile) {
      newErrors.thesisFile = "Thesis file is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleFileChange = (e) => {
    setThesisFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const data = new FormData();
    data.append("studentID", studentID);
    data.append("thesisTitle", formData.thesisTitle);
    data.append("thesisAbstract", formData.thesisAbstract);
    data.append("authorName", formData.authorName);
    data.append("thesisFile", thesisFile);

    try {
      await fetch("http://localhost:5000/api/submit-thesis", {
        method: "POST",
        body: data,
      });
      setMessage("Thesis submitted successfully!");
      setFormData({ thesisTitle: "", thesisAbstract: "", authorName: "" });
      setThesisFile(null);
      setErrors({});
    } catch (err) {
      setMessage("Submission failed. Try again later.");
    }
  };

  return (
    <div class="modal-overlay">
    <div className="modal">
      <div className="modal-header">
        <div className="modal-logo">
          <span className="logo-circle">
            {/* Folder SVG */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="512"
              height="419.116"
              viewBox="0 0 512 419.116"
            >
              <g>
                <path
                  d="M16.991,419.116A16.989,16.989,0,0,1,0,402.125V16.991A16.989,16.989,0,0,1,16.991,0H146.124a17,17,0,0,1,10.342,3.513L227.217,57.77H437.805A16.989,16.989,0,0,1,454.8,74.761v53.244h40.213A16.992,16.992,0,0,1,511.6,148.657L454.966,405.222a17,17,0,0,1-16.6,13.332H410.053v.562ZM63.06,384.573H424.722L473.86,161.988H112.2Z"
                  fill="var(--c-action-primary)"
                />
              </g>
            </svg>
          </span>
        </div>
      </div>

      <div className="modal-body">
        <h2 className="modal-title">Upload your Thesis</h2>

        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="title-field">
            <label>Thesis Title</label>
            <input
              type="text"
              name="thesisTitle"
              value={formData.thesisTitle}
              onChange={handleChange}
              placeholder="Enter thesis title"
            />
            {errors.thesisTitle && (
              <p className="error">{errors.thesisTitle}</p>
            )}
          </div>

          <div className="author-field">
            <label>Author Name (Optional)</label>
            <input
              type="text"
              name="authorName"
              value={formData.authorName}
              onChange={handleChange}
              placeholder="Enter author name"
            />
          </div>

          <label>Thesis Abstract</label>
          <textarea
            name="thesisAbstract"
            value={formData.thesisAbstract}
            onChange={handleChange}
            placeholder="Enter thesis abstract"
            rows="5"
          ></textarea>
          {errors.thesisAbstract && (
            <p className="error">{errors.thesisAbstract}</p>
          )}

          <p className="upload-thesis-pdf">Upload your Thesis PDF</p>

          <label>Upload Thesis File</label>
          <label className="upload-area">
            <span className="upload-area-icon">
              {/* Upload SVG */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                viewBox="0 0 340.531 419.116"
              >
                <g>
                  <path
                    d="M-2904.708-8.885A39.292,39.292,0,0,1,-2944-48.177V-388.708A39.292,39.292,0,0,1,-2904.708-428h209.558a13.1,13.1,0,0,1,9.3,3.8l78.584,78.584a13.1,13.1,0,0,1,3.8,9.3V-48.177a39.292,39.292,0,0,1-39.292,39.292Zm-13.1-379.823V-48.177a13.1,13.1,0,0,0,13.1,13.1h261.947a13.1,13.1,0,0,0,13.1-13.1V-323.221h-52.39a26.2,26.2,0,0,1-26.194-26.195v-52.39h-196.46A13.1,13.1,0,0,0,-2917.805-388.708Zm146.5,241.621a14.269,14.269,0,0,1-7.883-12.758v-19.113h-68.841c-7.869,0-7.87-47.619,0-47.619h68.842v-18.8a14.271,14.271,0,0,1,7.882-12.758,14.239,14.239,0,0,1,14.925,1.354l57.019,42.764c.242.185.328.485.555.671a13.9,13.9,0,0,1,2.751,3.292,14.57,14.57,0,0,1,.984,1.454,14.114,14.114,0,0,1,1.411,5.987,14.006,14.006,0,0,1-1.411,5.973,14.653,14.653,0,0,1-.984,1.468,13.9,13.9,0,0,1-2.751,3.293c-.228.2-.313.485-.555.671l-57.019,42.764a14.26,14.26,0,0,1-8.558,2.847A14.326,14.326,0,0,1,-2771.3-147.087Z"
                    transform="translate(2944 428)"
                    fill="var(--c-action-primary)"
                  />
                </g>
              </svg>
            </span>
            <input
              type="file"
              onChange={handleFileChange}
              accept=".pdf,.doc,.docx"
              hidden
            />
            <span className="upload-area-title">
              Drag file(s) here to upload.
            </span>
            <span className="upload-area-description">
              Alternatively, <strong>click here</strong> to select a file
            </span>
          </label>
 {errors.thesisFile && <p className="error">{errors.thesisFile}</p>}

 <div className="modal-footer">
 <button type="button" className="btn-secondary" style={{ color: 'black' }}>Cancel</button>
 <button type="submit" className="btn-primary">Upload File</button>
 </div>
 </form>
 {message && <p className="status-msg">{message}</p>}
 </div>
 </div>
 </div>
 );
};

export default SubmitThesis;
