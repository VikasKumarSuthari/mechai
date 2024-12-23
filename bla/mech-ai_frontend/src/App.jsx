import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './styles/globals.css';  // Ensure your global styles are imported
import Header from './components/layout/Header';  // Import the Header component
import Navbar from './components/layout/Navbar';  // Import the Navbar component
import Footer from './components/layout/Footer';  // Import the Footer component
import Home from './pages/Home';
import Works from './pages/HowItWorks';
import Features from './pages/Features';
import About from './pages/About';
import FAQ from './pages/FAQ';
import Mobile from './pages/MobileApp';
import Contact from './pages/Contact';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import Profile from './pages/Profile';
import Error from './pages/Error404';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Chat from './pages/Chat';
import Testimonials from './pages/Testimonials';
import OtpVerification from './pages/OtpVerification';
import ForgotPassword from './pages/ForgotPassword';
import Setpassword from './pages/Setpassword';

function App() {
  return (
    <Router>
      {/* Add Header and Navbar outside of Routes so they are always displayed */}
      <Header />
      <Navbar />

      {/* Main content area where routes will be rendered */}
      <div className="container mx-auto p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/works" element={<Works />} />
          <Route path="/features" element={<Features />} />
          <Route path="/chat" element={<Chat/>} />
          <Route path="/about" element={<About />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/mobile" element={<Mobile />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/error" element={<Error />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/testimonials" element={<Testimonials/>}/>
          <Route path="/otp-verification" element={<OtpVerification/>}/>
          <Route path="/forgot-password" element={<ForgotPassword/>}/>
          <Route path="/set-password/:token" element={<Setpassword/>}/>
        </Routes>
      </div>

      {/* Add Footer component, it will be displayed at the bottom of every page */}
      <Footer />
    </Router>
  );
}

export default App;
