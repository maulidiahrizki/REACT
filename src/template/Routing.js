import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Mahasiswa from '../pages/Mahasiswa';
import Jurusan from '../pages/Jurusan';
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
function Routing() {

  const token = localStorage.getItem('token');
  const isLoggedIn = !!token;
    // const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('token');
        console.log("Berhasil Logout");
        window.location.reload();
      };
    return (
        <Router>
        <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container">
            <Link className="navbar-brand" to="/">Frontend</Link>
            <div className="navbar-nav ml-auto">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link className="nav-link" to="/mhs">Mahasiswa</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/jrs">Jurusan</Link>
                </li>
                {isLoggedIn ? (
                  <li className="nav-item">
                    <Link className="nav-link" onClick={handleLogout}>Logout</Link>
                  </li>
                ) : (
                  <li className="nav-item">
                    <Link className="nav-link" to="/login">Login</Link>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </nav>

        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/mhs" element={<Mahasiswa />} />
            <Route path="/jrs" element={<Jurusan />} />
        </Routes>
        </div>
    </Router>
    );
}

export default Routing;