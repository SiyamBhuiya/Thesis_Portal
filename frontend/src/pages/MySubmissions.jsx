import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from "react-router-dom";
import axios from 'axios';
import '../styles/mysubmissions.css'; // Custom styles for MySubmissions

const MySubmissions = () => {
  const [submissions, setSubmissions] = useState([]);
  const studentID = localStorage.getItem('studentID');

  useEffect(() => {
    /*const fetchSubmissions = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/my-submissions/${studentID}`);
        setSubmissions(res.data);
      } catch (err) {
        console.error('Error fetching submissions:', err);
      }
    };
    fetchSubmissions();
  }, [studentID]); */
    // Dummy data for testing  const dummyData = [
  const dummyData = [
    {
      _id: '1',
      thesisTitle: 'Understanding AI in Education',
      status: 'Approved',
      feedback: 'Great work. Consider publishing!',
      thesisFile: 'theses/ai-education.pdf'
    },
    {
      _id: '2',
      thesisTitle: 'Blockchain in Healthcare',
      status: 'Pending',
      feedback: '',
      thesisFile: 'theses/blockchain-healthcare.pdf'
    },
    {
      _id: '3',
      thesisTitle: 'Sustainable Urban Design',
      status: 'Rejected',
      feedback: 'Too broad, narrow your focus.',
      thesisFile: 'theses/urban-design.pdf'
    }
  ];
  setSubmissions(dummyData);
}, []);

 const navigate = useNavigate();
  const handleEdit = (id) => {
    console.log("Edit submission ID:", id);
    // Navigate to edit form with submission ID
     navigate("/edit");
  };

  const handleAdd = () => {
    console.log("Add new submission");
    // Navigate to submission form
    navigate("/submit");
  };

  return (
    <div className="home-list-container"> {/* reuse same container class */}
      <h2>📘 My Submissions</h2>

      <div className="thesis-list">
        {submissions.length === 0 ? (
          <p>No submissions yet.</p>
        ) : (
          submissions.map((sub, idx) => (
            <div key={idx} className="thesis-item">
              <div className="thesis-content">
                <h3>{sub.thesisTitle}</h3>
                <p><strong>Status:</strong> {sub.status}</p>
                <p><strong>Feedback:</strong> {sub.feedback || 'Pending'}</p>
                <a href={`/${sub.thesisFile}`} target="_blank" rel="noopener noreferrer">
                  📎 View File
                </a>
                <div className="submission-actions">
                  <button onClick={() => handleEdit(sub._id)} className="edit-btn">✏️ Edit</button>
                </div>
              </div>
            </div>
          ))
        )}
        <div className="submission-actions">
          <button onClick={handleAdd} className="add-btn">➕ Add New Submission</button>
        </div>
      </div>
    </div>
  );
};

export default MySubmissions;
