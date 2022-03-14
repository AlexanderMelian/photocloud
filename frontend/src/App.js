import s from './App.module.css';
import React from 'react';
import Index from './components/Index/Index';
import SingleUpload from './components/SingleUpload/SingleUpload';
import GetImages from './components/GetImages/GetImages';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';

function App() {
  return (
    <div>
    <p>aasd</p>
    
    <Router>
      <div className={s.App}>
      <Routes>
      <Route path="/" element={<Index/>} />
        <Route path="/index" element={<Index/>} />
        <Route path="/singleupload" element={<SingleUpload />} />
        <Route path="/getimages" element={<GetImages />} />
      </Routes>
      </div>
    </Router>
    </div>
  );
}

export default App;
