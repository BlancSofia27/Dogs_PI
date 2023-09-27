
import { BrowserRouter as Router, Route,Routes } from 'react-router-dom';
import Landing from './views/Landing/Landing'
import Home from './views/Home/Home'
import  Detail  from './views/Detail/Detail';
import Create from './views/Create/Create'

function App() {
  

  return (
    <div className="App">
      <Router>
    <Routes>
      <Route exact path="/Landing" element={<Landing />} />;
      <Route path="/home" element={<Home />} />;
      <Route path="/detail/:id" element={<Detail />} />;
      <Route path="/create" element={<Create />} />;
    </Routes>
    </Router>
  </div>
);
}

export default App
