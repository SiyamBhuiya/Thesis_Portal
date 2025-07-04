import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/home.css';
import aboutUsGif from '../assets/about.gif';

const Home = () => {
 const [submissions, setSubmissions] = useState([]);
 const navigate = useNavigate();
 useEffect(() => {
  const dummyData = [
    {
      thesisTitle: 'AI in Healthcare Systems',
      studentName: 'John Doe',
      studentID: '2021-01-001',
      citation: 'Doe, J. (2021). AI in Healthcare. University of Example.',
      reviewerRating: 4.5,
    },
    {
      thesisTitle: 'Blockchain Security Mechanisms',
      studentName: 'Jane Smith',
      studentID: '2021-01-002',
      citation: 'Smith, J. (2021). Blockchain Security. University of Example.',
      reviewerRating: 4.2,
    },
    {
      thesisTitle: 'Sustainable Energy Modeling',
      studentName: 'Alice Johnson',
      studentID: '2021-01-003',
      citation: '',
      reviewerRating: 0,
    },
        {
      thesisTitle: 'AI in Healthcare Systems',
      studentName: 'John Doe',
      studentID: '2021-01-001',
      citation: 'Doe, J. (2021). AI in Healthcare. University of Example.',
      reviewerRating: 4.5,
    },
    {
      thesisTitle: 'Blockchain Security Mechanisms',
      studentName: 'Jane Smith',
      studentID: '2021-01-002',
      citation: 'Smith, J. (2021). Blockchain Security. University of Example.',
      reviewerRating: 4.2,
    },
    {
      thesisTitle: 'Sustainable Energy Modeling',
      studentName: 'Alice Johnson',
      studentID: '2021-01-003',
      citation: '',
      reviewerRating: 0,
    },
        {
      thesisTitle: 'AI in Healthcare Systems',
      studentName: 'John Doe',
      studentID: '2021-01-001',
      citation: 'Doe, J. (2021). AI in Healthcare. University of Example.',
      reviewerRating: 4.5,
    },
    {
      thesisTitle: 'Blockchain Security Mechanisms',
      studentName: 'Jane Smith',
      studentID: '2021-01-002',
      citation: 'Smith, J. (2021). Blockchain Security. University of Example.',
      reviewerRating: 4.2,
    },
    {
      thesisTitle: 'Sustainable Energy Modeling',
      studentName: 'Alice Johnson',
      studentID: '2021-01-003',
      citation: '',
      reviewerRating: 0,
    },
        {
      thesisTitle: 'AI in Healthcare Systems',
      studentName: 'John Doe',
      studentID: '2021-01-001',
      citation: 'Doe, J. (2021). AI in Healthcare. University of Example.',
      reviewerRating: 4.5,
    },
    {
      thesisTitle: 'Blockchain Security Mechanisms',
      studentName: 'Jane Smith',
      studentID: '2021-01-002',
      citation: 'Smith, J. (2021). Blockchain Security. University of Example.',
      reviewerRating: 4.2,
    },
    {
      thesisTitle: 'Sustainable Energy Modeling',
      studentName: 'Alice Johnson',
      studentID: '2021-01-003',
      citation: '',
      reviewerRating: 0,
    },
        {
      thesisTitle: 'AI in Healthcare Systems',
      studentName: 'John Doe',
      studentID: '2021-01-001',
      citation: 'Doe, J. (2021). AI in Healthcare. University of Example.',
      reviewerRating: 4.5,
    },
    {
      thesisTitle: 'Blockchain Security Mechanisms',
      studentName: 'Jane Smith',
      studentID: '2021-01-002',
      citation: 'Smith, J. (2021). Blockchain Security. University of Example.',
      reviewerRating: 4.2,
    },
    {
      thesisTitle: 'Sustainable Energy Modeling',
      studentName: 'Alice Johnson',
      studentID: '2021-01-003',
      citation: '',
      reviewerRating: 0,
    },
  ];
  setSubmissions(dummyData);
 /* const fetchApproved = async () => {
 try {
 const res = await axios.get('http://localhost:5000/api/submissions/approved');
 setSubmissions(res.data);
 } catch (err) {
 console.error('Error fetching approved theses:', err);
 }
 };
 fetchApproved(); */
 }, []);

 const handleClick = (thesis) => {
 navigate('/thesis', { state: { thesis } });
 };

 return (
 <div className="home-container">
 <div className="home-list-container">
 <h2>📘 Approved Theses</h2>
 {submissions.length ===0 ? (
 <p>No approved theses yet.</p>
 ) : (
 <ul className="thesis-list" style={{ maxHeight: '80vh', overflowY: 'auto' }}>
 {submissions.map((sub, idx) => (
 <li
 key={idx}
 className="thesis-item"
 onClick={() => handleClick(sub)}
 >
  <div className="thesis-content">
 <h3>{sub.thesisTitle}</h3>
 <p><strong>By:</strong> {sub.studentName || 'Unknown'} ({sub.studentID})</p>
 {sub.citation && (
 <p className="citation"><strong>📌 Citation:</strong> {sub.citation}</p>
 )}
 {sub.reviewerRating >0 && (
 <p className="rating">
 <strong>⭐ Rating:</strong> {sub.reviewerRating}/5
 </p>
 )}</div>
 </li>
 ))}
 </ul>
 )}
 </div>
    <div className="about-us-container">
        <img
    src={aboutUsGif}
    alt="About Us GIF"
    className="about-us-gif"
  />
 <h2>About Us</h2>
 <p>Firstly, I would like to express my deepest gratitude to the almighty Allah who
has enabled me to complete the research paper successfully.
I found the research very informative and interesting which will help me in the
long run. Though there were some limitations, I have tried my best to make the
research paper fruitful which will meet the objectives of doing research.
Without the support and assistance of my honourable supervisor, it would not
be possible for me to complete the research. I am grateful to my supervisor, Dr.
Md. Fazla Elahe, Assistant Professor & Associate Head of Daffodil
International University for his guidance, support, and kind assistance
throughout the semester to prepare the research paper. Thanks to my faculty for
being such a great mentor and providing me with the valuable suggestion which
helped me the most to make an effective research paper.
Besides, I am thankful to my family, friends and all the people who have
supported me to fulfil the work.</p>
 </div>
 </div>
 );
};

export default Home;