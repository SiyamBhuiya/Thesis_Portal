import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/home.css';

const Home = () => {
  const [submissions, setSubmissions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchApproved = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/submissions/approved');
        setSubmissions(res.data);
      } catch (err) {
        console.error('Error fetching approved theses:', err);
      }
    };
    fetchApproved();
  }, []);

 const handleClick = (thesis) => {
 navigate('/thesis', { state: { thesis } });
 };

 return (
 <div className="home-list-container">
 <h2>📘 Approved Theses</h2>
 {submissions.length ===0 ? (
 <p>No approved theses yet.</p>
 ) : (
 <ul className="thesis-list">
 {submissions.map((sub, idx) => (
 <li
 key={idx}
 className="thesis-item"
 onClick={() => handleClick(sub)}
 >
 <h3>{sub.thesisTitle}</h3>
 <p><strong>By:</strong> {sub.studentName || 'Unknown'} ({sub.studentID})</p>
 {sub.citation && (
 <p className="citation"><strong>📌 Citation:</strong> {sub.citation}</p>
 )}
 {sub.reviewerRating >0 && (
 <p className="rating">
 <strong>⭐ Rating:</strong> {sub.reviewerRating}/5
 </p>
 )}
 </li>
 ))}
 </ul>
 )}
 </div>
 );
};

export default Home;
