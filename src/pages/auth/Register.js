import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Register() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    try {
      const response = await axios.post('http://localhost:3000/api/auth/register', {
        username: username,
        password: password,
      });
      console.log('Pendaftaran berhasil:', response.data);
      navigate('/login');
      window.location.reload();
    } catch (error) {
      console.error('Gagal mendaftar:', error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow">
            <div className="card-header bg-success text-white">
              <h3 className="text-center">Form Pendaftaran</h3>
            </div>
            <div className="card-body">
              <div className="form-group">
                <label>Username:</label>
                <input className="form-control" type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
              </div>
              <div className="form-group mt-4">
                <label>Password:</label>
                <input className="form-control" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
              </div>
              <div className="d-grid mt-2">
                <button className="btn btn-success mt-2" onClick={handleRegister}>Daftar</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;