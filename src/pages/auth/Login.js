import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:3000/api/auth/login', { username, password });
      const token = response.data.token;
  
      if (token) {
        localStorage.setItem('token', token);
        navigate('/mhs');
        window.location.reload();
      } else {
        console.error('Gagal login: Token tidak diterima');
      }
    } catch (error) {
      if (error.response.status === 401) {
        console.error('Gagal login: Kata sandi atau username salah');
      } else {
        console.error('Gagal login:', error);
      }
    }
  };
  
  return (
    <div className="container mt-5">
    <div className="row justify-content-center">
      <div className="col-md-6">
        <div className="card shadow">
          <div className="card-header bg-primary text-white">
            <h3 className="text-center">Login</h3>
          </div>
          <div className="card-body">
            <div className="form-group">
              <label>Username:</label>
              <input className="form-control" type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
            </div>
            <div className="form-group">
              <label>Password:</label>
              <input className="form-control" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div className="d-grid mt-4">
              <button className="btn btn-primary" onClick={handleLogin}>Masuk</button>
            </div>
            <p className="mt-2 text-center">Belum punya akun? <a href="/register">Daftar</a></p>
          </div>
        </div>
      </div>
    </div>
  </div>
);
}

export default Login;