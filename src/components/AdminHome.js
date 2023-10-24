import React, { useState, useEffect } from 'react';

function AdminHome() {
  const [students, setStudents] = useState([]);
  const [newStudent, setNewStudent] = useState({ name: '', email: '' });
  const [deleteStudentId, setDeleteStudentId] = useState('');
  const [updateStudentId, setUpdateStudentId] = useState('');
  const [newStatus, setNewStatus] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = () => {
    setMessage('');
    fetch('http://localhost:8080/students', {
      headers: {
        Authorization: sessionStorage.getItem("jwt"), // Include the token in the request header
      },
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
      .then((data) => {
        setStudents(data);
      })
      .catch((error) => {
        console.error('Fetch error:', error);
      });
  };

  const handleAddStudent = () => {
    setMessage('');
    fetch('http://localhost:8080/students', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: sessionStorage.getItem("jwt"), // Include the token in the request header
      },
      body: JSON.stringify(newStudent),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        if (data.success) {
          fetchStudents();
          setNewStudent({ name: '', email: '' });
        } else {
          setErrorMessage(data.message);
        }
      })
      .catch((error) => {
        console.error('Fetch error:', error);
      });
  };

  const handleDeleteStudent = () => {
    setMessage('');
    fetch(`http://localhost:8080/students/${deleteStudentId}`, {
      method: 'DELETE',
      headers: {
        Authorization: sessionStorage.getItem("jwt"), // Include the token in the request header
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        if (data.success) {
          fetchStudents();
          setDeleteStudentId('');
        } else {
          setErrorMessage(data.message);
        }
      })
      .catch((error) => {
        console.error('Fetch error:', error);
      });
  };

  const handleUpdateStudentStatus = () => {
    setMessage('');
    fetch(`http://localhost:8080/students/${updateStudentId}/status`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: sessionStorage.getItem("jwt"), // Include the token in the request header
      },
      body: JSON.stringify({ status: newStatus }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        if (data.success) {
          fetchStudents();
          setUpdateStudentId('');
          setNewStatus('');
        } else {
          setErrorMessage(data.message);
        }
      })
      .catch((error) => {
        console.error('Fetch error:', error);
      });
  };

  return (
    <div>
      <div style={{ margin: 'auto' }}>
        <h3>Student List</h3>
      </div>
      <table style={{ margin: 'auto' }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id}>
              <td>{student.student_id}</td>
              <td>{student.name}</td>
              <td>{student.email}</td>
              <td>{student.status}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Rest of your component code... */}
    </div>
  );
}

export default AdminHome;
