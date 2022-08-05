import './App.css';
import NavBar from './components/NavBar';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Customers from './components/Customers';
import Register from './components/Register';
import About from './components/About';
import Login from './components/Login';
import Contact from './components/Contact';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import Builders from './components/Builders';
import ProjectDetails from './components/ProjectDetails';
import Products from './components/Products';
import Details from './components/Details';
import { ToastContainer } from 'react-toastify';
 import 'react-toastify/dist/ReactToastify.css';
import MyAppointments from './components/MyAppointments';
import Appointments from './components/Appointments';
import AppointmentDetails from './components/AppointmentDetails';
import BkDetails from './components/BkDetails';
import Feedbacks from './components/Feedbacks';
import Reports from './components/Reports';
import MixedData from './components/MixedData';
import NotFound from './components/404NotFound';
import Property from './components/Property';
import Calculator from './components/Calculator';

function App() {
  require('dotenv').config()
  console.log(process.env)
  return (
    <div className="App">
      <ToastContainer 
      position="top-right"
      autoClose={5000}
      />    
      <Router>
      <NavBar />            
        <Switch>
          <Route component={Home} path="/" exact />
          <Route component={About} path="/about" />
          <Route component={Register} path="/register" />          
          <Route component={Login} path="/login" />          
          <Route component={Dashboard} path="/dashboard" />                    
          <Route component={Builders} path="/builders" />          
          <Route component={ProjectDetails} path="/projectdetails" />          
          <Route component={Property} path="/property" />          
          <Route component={Customers} path="/customers" />          
          <Route component={Products} path="/products" exact />          
          <Route component={Products} path="/products/:cid" />          
          <Route component={Details} path="/details/:projid" />                 
          <Route component={MyAppointments} path="/myappointments" />                                
          <Route component={BkDetails} path="/mybdetails/:bid" />                                
          <Route component={Appointments} path="/appointments" />                                
          <Route component={MixedData} path="/bookings2" />                                
          <Route component={AppointmentDetails} path="/bdetails/:bid" />                                
          <Route component={Contact} path="/contact" />                           
          <Route component={Feedbacks} path="/feedbacks" />                           
          <Route component={Reports} path="/reports" />
          <Route component={Calculator} path="/Calculator" /> 
          <Route path="*" component={NotFound} />                         
        </Switch>
        </Router>
    </div>
  );
}

export default App;
