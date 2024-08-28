// import logo from './logo.svg';
// import './App.css';
// import React from 'react';

// const Home = () => {
//     return (
// 	<div className="App">
//       		<header className="App-header">
//         		<img src={logo} className="App-logo" alt="logo" />
//         		<p>
//           			Edita <code>src/App.js</code> y guardalo para recargar.
//         		</p>
// 			<h1>Welcome to the Server Management App</h1>
// 		        <a
// 		          className="App-link"
// 		          href="https://reactjs.org"
// 		          target="_blank"
// 		          rel="noopener noreferrer">
//           			Learn React
//         		</a>
//       		</header>
//     	</div>
//     );
// };

// export default Home;



// web/src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Minecraft from './pages/Minecraft';
import ProjectZomboid from './pages/ProjectZomboid';
import AssettoCorsa from './pages/AssettoCorsa';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
    return (
        <Router>
            <Header />
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/minecraft" element={<Minecraft />} />
                <Route path="/project-zomboid" element={<ProjectZomboid />} />
                <Route path="/assetto-corsa" element={<AssettoCorsa />} />
            </Routes>
            <Footer />
        </Router>
    );
}

export default App;
