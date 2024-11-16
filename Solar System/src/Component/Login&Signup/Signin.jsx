import React, { useState, useRef, useEffect } from 'react';
import './Signin.css'; // Renamed CSS to match component
import Navbar from '../Home Page/Navbar';
import Navbar2 from '../Home Page/Navbar2';
import Footer from '../Home Page/Footer';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [isFocused, setIsFocused] = useState(false);
  const [isWrongEntry, setIsWrongEntry] = useState(false);
  const leftEyeRef = useRef(null);
  const rightEyeRef = useRef(null);
  const navigate = useNavigate();
  const emailvalue = useRef();
    // Form state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reset messages
    setMessage('');
    setIsWrongEntry(false);

    // Basic validation
    if (password !== confirmPassword) {
      setIsWrongEntry(true);
      setMessage('Passwords do not match.');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('http://localhost:5000/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message);
        // Optionally, redirect to login after successful registration
        localStorage.setItem("email",emailvalue.current.value);
        setTimeout(() => navigate('/login'), 2000);
      } else {
        setIsWrongEntry(true);
        setMessage(data.message || 'Error registering user');
      }
    } catch (error) {
      setIsWrongEntry(true);
      setMessage('Error registering user');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle focus events
  const handleFocusIn = () => setIsFocused(true);
  const handleFocusOut = () => setIsFocused(false);

  // Panda eye move effect
  useEffect(() => {
    const handleMouseMove = (event) => {
      const dw = window.innerWidth / 15;
      const dh = window.innerHeight / 15;
      const x = event.pageX / dw;
      const y = event.pageY / dh;

      if (leftEyeRef.current) {
        leftEyeRef.current.style.transform = `translate(${x}px, ${y}px)`;
      }
      if (rightEyeRef.current) {
        rightEyeRef.current.style.transform = `translate(${x}px, ${y}px)`;
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Navigate to login page
  const navigateToLogin = () => {
    navigate('/login');
  };




  return (
    <div className='bodysign'>
      <Navbar />
      <Navbar2 />
      <div className='logindiv'>
        <button className='btnlogin' onClick={navigateToLogin}>
          <b>Login</b>
        </button>
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
      <form
        className={`${isFocused ? 'up' : ''} ${isWrongEntry ? 'wrong-entry' : ''}`}
        onSubmit={handleSubmit}
      >
        <div className="hand"></div>
        <div className="hand rgt"></div>
        <h1>Panda Register</h1>
        <div className="form-group">
          <input
            type="text"
            name="name"
            required
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onFocus={handleFocusIn}
            onBlur={handleFocusOut}
          />
          <label className="form-label" htmlFor="name">Username</label>
        </div>
        <div className="form-group">
          <input
            type="email"
            name="email"
            required
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onFocus={handleFocusIn}
            onBlur={handleFocusOut}
            ref={emailvalue}
          />
          <label className="form-label" htmlFor="email">Email</label>
        </div>
        <div className="form-group">
          <input
            type="password"
            name="password"
            required
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onFocus={handleFocusIn}
            onBlur={handleFocusOut}
          />
          <label className="form-label" htmlFor="password">Create Password</label>
        </div>
        <div className="form-group">
          <input
            type="password"
            name="confirmPassword"
            required
            className="form-control"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            onFocus={handleFocusIn}
            onBlur={handleFocusOut}
          />
          <label className="form-label" htmlFor="confirmPassword">Confirm Password</label>
        </div>
        {isWrongEntry && <p className="alert">{message}</p>}
        {message && !isWrongEntry && <p className="success">{alert("Resister Successfull Thanks!" )}</p>}
        <button type="submit" className="btn" disabled={isSubmitting} >
          {isSubmitting ? 'Registering...' : 'Register'}
        </button>
      </form>
      <Footer />
    </div>
  );
}

export default Register;
