import React, { useState, useRef, useEffect } from 'react';
import './Login.css';
import Navbar from '../Home Page/Navbar';
import Navbar2 from '../Home Page/Navbar2';
import Footer from '../Home Page/Footer';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [isFocused, setIsFocused] = useState(false);
  const [errorMessage, setErrorMessage] = useState(''); 
  const [email, setEmail] = useState(localStorage.getItem("email"));
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const leftEyeRef = useRef(null);
  const rightEyeRef = useRef(null);
  const navigate = useNavigate();

  const handleFocusIn = () => setIsFocused(true);
  const handleFocusOut = () => setIsFocused(false);

  useEffect(() => {
    const handleMouseMove = (event) => {
      const dw = window.innerWidth / 20;
      const dh = window.innerHeight / 20;
      const x = event.pageX / dw;
      const y = event.pageY / dh;

      if (leftEyeRef.current && rightEyeRef.current) {
        leftEyeRef.current.style.width = `${Math.min(x, 10)}px`;
        leftEyeRef.current.style.height = `${Math.min(y, 10)}px`;
        rightEyeRef.current.style.width = `${Math.min(x, 10)}px`;
        rightEyeRef.current.style.height = `${Math.min(y, 10)}px`;
      }
    };

    document.addEventListener("mousemove", handleMouseMove);
    return () => document.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const navigateToRegister = () => navigate('/signin');

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/login', { email, password });
      localStorage.setItem("email",email)
      navigate('/'); 
    } catch (error) {
      if (error.response) {
        // Check for specific error messages from the backend
        if (error.response.data.message === 'Invalid email and password') {
          setErrorMessage('Invalid email address !!. First Please Register.');
        } else if (error.response.data.message === 'Incorrect password') {
          setErrorMessage('Incorrect password.');
        } else {
          setErrorMessage('An error occurred. Please try again.');
        }
      } else {
        setErrorMessage('An error occurred. Please check your connection.');
      }
      setTimeout(() => setErrorMessage(''), 3000); // Clear message after 3 seconds
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='bodylogin'>
      <Navbar />
      <Navbar2 />
      <div className='logindiv'>
        <button className='btnlogin' onClick={navigateToRegister}><b>Register</b></button>
      </div>
      <div className="panda">
        <div className="ear"></div>
        <div className="face">
          <div className="eye-shade"></div>
          <div className="eye-white">
            <div className="eye-ball" ref={leftEyeRef}></div>
          </div>
          <div className="eye-shade rgt"></div>
          <div className="eye-white rgt">
            <div className="eye-ball" ref={rightEyeRef}></div>
          </div>
          <div className="nose"></div>
          <div className="mouth"></div>
        </div>
        <div className="body"></div>
        <div className="foot">
          <div className="finger"></div>
        </div>
        <div className="foot rgt">
          <div className="finger"></div>
        </div>
      </div>
      <form className={`${isFocused ? 'up' : ''} ${errorMessage ? 'wrong-entry' : ''}`} onSubmit={handleLogin}>
        <div className="hand"></div>
        <div className="hand rgt"></div>
        <h1>Panda Login</h1>
        <div className="form-group">
          <input
            aria-label="Email"
            required
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            
          />
          <label className="form-label">Username</label>
        </div>
        <div className="form-group">
          <input
            aria-label="Password"
            type="password"
            required
            className="form-control"
            onFocus={handleFocusIn}
            onBlur={handleFocusOut}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label className="form-label">Password</label>
          {errorMessage && <p className="alert">{errorMessage}</p>}
          <button className="btn" type="submit" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </div>
      </form>
      <Footer />
    </div>
  );
}

export default Login;
