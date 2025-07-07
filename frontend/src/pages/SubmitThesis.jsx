import React, { useState } from "react";
import "../styles/submitThesis.css";

const SubmitThesis = () => {
  const [formData, setFormData] = useState({
    thesisTitle: "",
    thesisAbstract: "",
    authorName: "",
    degreeProgram: "",
    department: "",
    supervisorName: "",
    submissionDate: new Date().toISOString().split("T")[0],
    keywords: "",
    thesisType: "",
  });

  const [thesisFile, setThesisFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");

  const studentID = localStorage.getItem("studentID"); // Assume it's stored

  const validate = () => {
    const newErrors = {};
    if (!formData.thesisTitle.trim()) newErrors.thesisTitle = "Thesis title is required";
    if (!formData.authorName.trim()) newErrors.authorName = "Author name is required";
    if (!formData.thesisAbstract.trim()) newErrors.thesisAbstract = "Abstract is required";
    if (!formData.degreeProgram) newErrors.degreeProgram = "Select your degree program";
    if (!formData.department) newErrors.department = "Department is required";
    if (!formData.supervisorName.trim()) newErrors.supervisorName = "Supervisor name is required";
    if (!formData.keywords.trim()) newErrors.keywords = "Keywords are required";
    if (!formData.thesisType) newErrors.thesisType = "Thesis type is required";
    if (!thesisFile) newErrors.thesisFile = "Thesis file is required";

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
    const file = e.target.files[0];
    validatePDF(file);
  };

  const validatePDF = (file) => {
    if (file && file.type === "application/pdf") {
      setThesisFile(file);
      setErrors((prev) => ({ ...prev, thesisFile: null }));
    } else {
      setThesisFile(null);
      setErrors((prev) => ({
        ...prev,
        thesisFile: "Only PDF files are allowed.",
      }));
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    validatePDF(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const data = new FormData();
    data.append("studentID", studentID);
    Object.entries(formData).forEach(([key, value]) => data.append(key, value));
    data.append("thesisFile", thesisFile);

    try {
      await fetch("http://localhost:5000/api/submit-thesis", {
        method: "POST",
        body: data,
      });
      setMessage("Thesis submitted successfully!");
      setFormData({
        thesisTitle: "",
        thesisAbstract: "",
        authorName: "",
        degreeProgram: "",
        department: "",
        supervisorName: "",
        submissionDate: new Date().toISOString().split("T")[0],
        keywords: "",
        thesisType: "",
      });
      setThesisFile(null);
      setErrors({});
    } catch (err) {
      setMessage("Submission failed. Try again later.");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <div className="modal-logo">
            <span className="logo-circle">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="#ffffff">
                <path d="M10 4H2v16h20V6H12l-2-2z" />
              </svg>
            </span>
          </div>
        </div>

        <div className="modal-body">
          <h2 className="modal-title">Upload your Thesis</h2>
          <form onSubmit={handleSubmit} encType="multipart/form-data" className="submit-thesis-form">
            <div className="title-field">
              <label>Thesis Title</label>
              <input type="text" name="thesisTitle" value={formData.thesisTitle} onChange={handleChange} placeholder="Thesis Title" />
              {errors.thesisTitle && <p className="error">{errors.thesisTitle}</p>}
            </div>

            <div className="author-field">
              <label>Author Name</label>
              <input
                type="text"
                name="authorName"
                value={formData.authorName}
                onChange={handleChange}
                placeholder="Enter author name"
              />
              {errors.authorName && <p className="error">{errors.authorName}</p>}
            </div>

            <label>Thesis Abstract</label>
            <textarea name="thesisAbstract" rows="5" value={formData.thesisAbstract} onChange={handleChange} placeholder="Write Abstract"/>
            {errors.thesisAbstract && <p className="error">{errors.thesisAbstract}</p>}

            <label>Degree Program</label>
            <select name="degreeProgram" value={formData.degreeProgram} onChange={handleChange}>
              <option value="">Select Program</option>
              <option value="BSc">BSc</option>
              <option value="MSc">MSc</option>
              <option value="PhD">PhD</option>
            </select>
            {errors.degreeProgram && <p className="error">{errors.degreeProgram}</p>}

            <label>Department</label>
            <input type="text" name="department" value={formData.department} onChange={handleChange} placeholder="Name Of The Department" />
            {errors.department && <p className="error">{errors.department}</p>}

            <label>Supervisor Name</label>
            <input type="text" name="supervisorName" value={formData.supervisorName} onChange={handleChange} placeholder="Supervisor Name" />
            {errors.supervisorName && <p className="error">{errors.supervisorName}</p>}

            <label>Submission Date</label>
            <input type="date" name="submissionDate" value={formData.submissionDate} onChange={handleChange} />

            <label>Keywords (comma-separated)</label>
            <input type="text" name="keywords" value={formData.keywords} onChange={handleChange} placeholder="Supervisor Name" />
            {errors.keywords && <p className="error">{errors.keywords}</p>}

            <label>Thesis Type</label>
            <select name="thesisType" value={formData.thesisType} onChange={handleChange}>
              <option value="">Select Type</option>
              <option value="Research Thesis">Research Thesis</option>
              <option value="Project Report">Project Report</option>
              <option value="Capstone Paper">Capstone Paper</option>
            </select>
            {errors.thesisType && <p className="error">{errors.thesisType}</p>}

            {/* Upload Area with Drag-and-Drop */}
            <label
              className={`upload-area ${isDragging ? "dragging" : ""}`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <span className="upload-area-icon">
                {thesisFile ? (
                  <svg xmlns="http://www.w3.org/2000/svg" height="40" viewBox="0 0 24 24" width="40" fill="#e63946">
                    <path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm1 7V3.5L18.5 9H15zM8 15h1.5v-1.5H8V15zm2.25 0h1.5v-4.5h-1.5V15zm3 0H15v-1.5h-1.75v-.75H15v-1.5h-2.25V15z" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" height="40" viewBox="0 0 24 24" width="40" fill="var(--c-action-primary)">
                    <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18h14v2H5z" />
                  </svg>
                )}
              </span>

              <input type="file" onChange={handleFileChange} accept=".pdf" hidden />

              <span className="upload-area-title">
                {thesisFile ? thesisFile.name : "Drag file(s) here to upload."}
              </span>
              <span className="upload-area-description">
                Alternatively, <strong>click here</strong> to select a file
              </span>
            </label>
            {errors.thesisFile && <p className="error">{errors.thesisFile}</p>}

            <div className="modal-footer">
              <button type="button" className="btn-secondary">Cancel</button>
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
