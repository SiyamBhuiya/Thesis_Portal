import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MySubmissions = () => {
  const [submissions, setSubmissions] = useState([]);
  const studentID = localStorage.getItem('studentID'); // Or get from context

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/my-submissions/${studentID}`);
        setSubmissions(res.data);
      } catch (err) {
        console.error('Error fetching submissions:', err);
      }
    };
    fetchSubmissions();
  }, [studentID]);

  return (
    <div className="my-submissions">
      <h2>📘 My Submissions</h2>
      {submissions.length === 0 ? (
        <p>No submissions yet.</p>
      ) : (
        submissions.map((sub, idx) => (
          <div key={idx} className="submission-card">
            <h3>{sub.thesisTitle}</h3>
            <p><strong>Status:</strong> {sub.status}</p>
            <p><strong>Feedback:</strong> {sub.feedback || 'Pending'}</p>
            <a href={`/${sub.thesisFile}`} target="_blank" rel="noopener noreferrer">📎 View File</a>
          </div>
        ))
      )}
    </div>
  );
};

export default MySubmissions;
