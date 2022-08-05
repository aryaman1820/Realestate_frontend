import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import './style.css'

export default function UserNavbar(){
    const dispatch=useDispatch()
    const history=useHistory()
    const state=useSelector((state)=>state);

    const logout=e=>{
        dispatch({type:'LogOut'})
        sessionStorage.clear();
        history.push("/");
    }
    return(
        <>
        <nav className="navbar navbar-expand-lg">
              <div className="container">
                <Link className="navbar-brand" to="/"><img src="https://www.clipartmax.com/png/middle/217-2178640_real-estate-logo-design-real-estate-free-logo.png" width={100} height={30}/><h2>Real <em>Estate</em></h2></Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                  <span className="navbar-toggler-icon" />
                </button>
                <div className="collapse navbar-collapse" id="navbarResponsive">
                  <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                      <Link className="nav-link" to="/">Home</Link>
                    </li>
                    <li className="nav-item"><Link className="nav-link" to="/Products">Properties</Link></li>
                    {state.loggedin && state.loggedin.Role==="User" ? (<>
                      <li className="nav-item"><Link className="nav-link" to="/myappointments"> My Appointments </Link></li>
                      <li className="nav-item"><Link className="nav-link" to="/">Welcome {state.loggedin.Userid }</Link></li>
                      <li className="nav-item"><Link className="nav-link" to="/Calculator">Calulate EMI</Link></li>
                      <li className="nav-item"><Link className="nav-link" onClick={logout} to="/">Logout</Link></li>
                    </>
                    ) : (
                        <>
                          <li className="nav-item"><Link className="nav-link" to="/about">About Us</Link></li>
                          <li className="nav-item"><Link className="nav-link" to="/contact">Contact Us</Link></li>
                          <li className="nav-item"><Link className="nav-link" to="/register">Register</Link></li>
                          <li className="nav-item"><Link className="nav-link" to="/login">Login</Link></li>                    
                      </>
                    )}
                  </ul>
                </div>
              </div>
            </nav>
        </>
    )
}