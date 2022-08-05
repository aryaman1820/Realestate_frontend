import { Link,useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"

const AdminNav = ()=>{
    const dispatch=useDispatch()
    const history=useHistory()
    const state=useSelector((state)=>state);
    console.log("loggedin",state.loggedin)
    const logout=e=>{
        dispatch({type:'LogOut'})
        sessionStorage.clear();
        history.push("/");
    }
    return(
    <div className="layout-navbar-fixed layout-footer-fixed">
    <nav className="main-header navbar navbar-expand navbar-white navbar-light">

        <h5 className="text-center text-uppercase" style={{width: '80%'}}>ADMINISTRATOR </h5>
        <ul className="navbar-nav ml-auto">        
          <li className="nav-item dropdown">
            <Link className="nav-link text-dark" data-toggle="dropdown" to="#">
            <i className="far fa-bell fas-shake animated" />
            </Link>
            <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right">
            <span className="dropdown-item dropdown-header">Admin Menu</span>
            <div className="dropdown-divider" />
            <Link to="/dashboard" className="dropdown-item" >
                <i className="fas fa-users mr-2" />Dashboard
            </Link>
            <Link to="/builders" className="dropdown-item">
                <i className="fas fa-users mr-2" />Builders
            </Link>
            <Link to="/projectdetails" className="dropdown-item">
                <i className="fas fa-users mr-2" />Projects 
            </Link>
            <Link to="/Property" className="dropdown-item">
                <i className="fas fa-users mr-2" />Properties
            </Link>
            <Link to="/customers" className="dropdown-item">
                <i className="fas fa-users mr-2" />Customers
            </Link>
            <Link to="/appointments" className="dropdown-item">
                <i className="fas fa-users mr-2" />Appointments
            </Link>
            <Link to="/feedbacks" className="dropdown-item">
                <i className="fas fa-users mr-2" />Feedbacks
            </Link>
            <Link to="/reports" className="dropdown-item">
                <i className="fas fa-users mr-2" />Reports
            </Link>
            <div className="dropdown-divider" />
            <Link to="#" className="dropdown-item" onClick={logout}>
                <i className="fas fa-users mr-2" />Logout
            </Link>
            </div>
            
        </li>
        </ul>
    </nav>
        </div>
    )
}

export default AdminNav;