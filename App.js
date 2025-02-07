import * as React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home'; 
import Login from './constants/components/Login'; 
import Registration from './constants/components/Registration';
import List from'./constants/components/List';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/list" element={<List />} />
      </Routes>
    </Router>
  );
}
