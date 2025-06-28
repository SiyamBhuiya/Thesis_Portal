import React, { useState } from 'react';
import '../styles/submitThesis.css'; // new custom style file

const SubmitThesis = () => {
  const [formData, setFormData] = useState({
    studentID: '',
    thesisTitle: '',
    thesisAbstract: '',
  });
  const [thesisFile, setThesisFile] = useState(null);
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');

  const validate = () => {
    const newErrors = {};
    const idRegex = /^[0-9]{3}-[0-9]{2}-[0-9]{2}$/;

    if (!idRegex.test(formData.studentID)) {
      newErrors.studentID = 'Student ID must be in format 211-35-00';
    }
    if (!formData.thesisTitle.trim()) {
      newErrors.thesisTitle = 'Thesis title is required';
    }
    if (!formData.thesisAbstract.trim()) {
      newErrors.thesisAbstract = 'Thesis abstract is required';
    }
    if (!thesisFile) {
      newErrors.thesisFile = 'Thesis file is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData(prev => ({
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
    data.append('studentID', formData.studentID);
    data.append('thesisTitle', formData.thesisTitle);
    data.append('thesisAbstract', formData.thesisAbstract);
    data.append('thesisFile', thesisFile);

    try {
      await fetch('http://localhost:5000/api/submit-thesis', {
        method: 'POST',
        body: data,
      });
      setMessage('Thesis submitted successfully!');
      setFormData({ studentID: '', thesisTitle: '', thesisAbstract: '' });
      setThesisFile(null);
      setErrors({});
    } catch (err) {
      setMessage('Submission failed. Try again later.');
    }
  };

  return (
    <div className="submit-container">
      <div className="submit-box">
        <h2>📄 Thesis Submission</h2>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <label>Student ID</label>
          <input
            type="text"
            name="studentID"
            value={formData.studentID}
            onChange={handleChange}
            placeholder="211-35-00"
          />
          {errors.studentID && <p className="error">{errors.studentID}</p>}

          <label>Thesis Title</label>
          <input
            type="text"
            name="thesisTitle"
            value={formData.thesisTitle}
            onChange={handleChange}
            placeholder="Enter thesis title"
          />
          {errors.thesisTitle && <p className="error">{errors.thesisTitle}</p>}

          <label>Thesis Abstract</label>
          <textarea
            name="thesisAbstract"
            value={formData.thesisAbstract}
            onChange={handleChange}
            placeholder="Enter thesis abstract"
            rows="5"
          ></textarea>
          {errors.thesisAbstract && <p className="error">{errors.thesisAbstract}</p>}

          <label>Upload Thesis File</label>
          <input type="file" onChange={handleFileChange} accept=".pdf,.doc,.docx" />
          {errors.thesisFile && <p className="error">{errors.thesisFile}</p>}

          <button type="submit">📤 Submit Thesis</button>
        </form>
        {message && <p className="status-msg">{message}</p>}
      </div>
    </div>
  );
};

export default SubmitThesis;
