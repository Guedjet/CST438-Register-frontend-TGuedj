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
    fetch('http://localhost:8080/students')
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
    <div className="AdminHome">
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

      <div>
        <h3>Add Student</h3>
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={newStudent.name}
            onChange={(e) =>
              setNewStudent({ ...newStudent, name: e.target.value })
            }
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={newStudent.email}
            onChange={(e) =>
              setNewStudent({ ...newStudent, email: e.target.value })
            }
            required
          />
        </div>
        <button onClick={handleAddStudent}>Add Student</button>
      </div>

      <div>
        <h3>Delete Student</h3>
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        <div>
          <label>Student ID:</label>
          <input
            type="text"
            value={deleteStudentId}
            onChange={(e) => setDeleteStudentId(e.target.value)}
            required
          />
        </div>
        <button onClick={handleDeleteStudent}>Delete Student</button>
      </div>

      <div>
        <h3>Update Student Status</h3>
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        <div>
          <label>Student ID:</label>
          <input
            type="text"
            value={updateStudentId}
            onChange={(e) => setUpdateStudentId(e.target.value)}
            required
          />
        </div>
        <div>
          <label>New Status:</label>
          <input
            type="text"
            value={newStatus}
            onChange={(e) => setNewStatus(e.target.value)}
            required
          />
        </div>
        <button onClick={handleUpdateStudentStatus}>Update Status</button>
      </div>
    </div>
  );
}

export default AdminHome;
