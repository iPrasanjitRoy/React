import React from 'react';
import Navbar from './components/Navbar';
import News from './components/News';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const apiKey = 'd05563598bc243bcb34dcc5073b8c59f';

const App = () => {
  return (
    <div>
      <Router>
        <Navbar />

        <Routes>
          <Route path="/" element={<News key="general" country="in" category="general" apiKey={apiKey} />} />
          <Route path="/business" element={<News key="business" country="in" category="business" apiKey={apiKey} />} />
          <Route path="/entertainment" element={<News key="entertainment" country="in" category="entertainment" apiKey={apiKey} />} />
          <Route path="/general" element={<News key="general" country="in" category="general" apiKey={apiKey} />} />
          <Route path="/health" element={<News key="health" country="in" category="health" apiKey={apiKey} />} />
          <Route path="/science" element={<News key="science" country="in" category="science" apiKey={apiKey} />} />
          <Route path="/sports" element={<News key="sports" country="in" category="sports" apiKey={apiKey} />} />
          <Route path="/technology" element={<News key="technology" country="in" category="technology" apiKey={apiKey} />} />
        </Routes>

      </Router>
    </div>
  );
};

export default App;
