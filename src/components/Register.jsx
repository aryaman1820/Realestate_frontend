import axios from "axios";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";

const Register = ()=>{
  const history=useHistory()
    const [user,setUser]=useState({
        "uname":"",
        "address":"",
        "userid":"",
        "pwd":"",
        "cpwd":"",
        "phone":"",
        "gender":"",
        "email":""
    })
    const handleInput=(e)=>{
        setUser({...user,[e.target.name]:e.target.value})
    }
    const handleSubmit=(e)=>{
        e.preventDefault()  
        console.log(user)
        if(user.pwd!=user.cpwd){
          toast.error("Password not match with confirm")          
        } else {
          axios.post('http://localhost:8090/api/customers',user)
          .then(resp=>{
              console.log(resp.data)
              toast.success(resp.data)
              history.push("/login")
          }).catch(error=>{          
              console.log("Error",error.response)
              toast.error(error.response.data)
          })      
      }     
    }
    return(
        <>
        <div className="container" style={{minHeight: '79vh'}}>
  <div className="row">
    <div className="col-sm-8 mx-auto text-center" style={{boxShadow: '0 0 2px 1px white'}}>
      <div className="card shadow" style={{marginTop: 50}}>
        <div className="card-body">
          <img src="https://cdn-icons-png.flaticon.com/512/5087/5087579.png" style={{width: 150}} className="my-2 rounded-circle" />
          <form onSubmit={handleSubmit} autoComplete="off" action="regprocess.php">
            <div className="form-row">
              <div className="col-sm-6">
                <div className="form-group">
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <span className="input-group-text bg-primary border-0 text-white">
                        <i className="fas fa-user-tie" />
                      </span>
                    </div>
                    <input type="text" pattern="[a-zA-Z ]+" required placeholder="Full Name" name="uname" value={user.uname} onChange={handleInput} className="form-control" />
                  </div>
                </div>
                <div className="form-group">
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <span className="input-group-text bg-primary border-0 text-white">
                        <i className="fas fa-user-tie" />
                      </span>
                    </div>
                    <input type="Text" required placeholder=" User ID" name="userid" value={user.userid} onChange={handleInput} className="form-control" />
                  </div>
                </div>
                <div className="form-group">
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <span className="input-group-text bg-primary border-0 text-white">
                        <i className="fas fa-key" />
                      </span>
                    </div>
                    <input type="password" required name="pwd" value={user.pwd} onChange={handleInput}  placeholder="Password" className="form-control" />
                  </div>
                </div>
                <div className="form-group">
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <span className="input-group-text bg-primary border-0 text-white">
                        <i className="fas fa-key" />
                      </span>
                    </div>
                    <input type="password" required name="cpwd" value={user.cpwd} onChange={handleInput}  placeholder="Repeat Password" className="form-control" />
                  </div>
                </div>
              </div>
              <div className="col-sm-6">
                <div className="form-group">
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <span className="input-group-text bg-primary border-0 text-white">
                        <i className="fas fa-user-tie" />
                      </span>
                    </div>
                    <input type="text" pattern="[0-9]{10,10}" value={user.phone} onChange={handleInput}  required placeholder="Phone Number" name="phone" className="form-control" maxLength={10} />
                  </div>
                </div>
                <div className="form-group">
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <span className="input-group-text bg-primary border-0 text-white">
                        <i className="fas fa-key" />
                      </span>
                    </div>
                    <select required name="gender" value={user.gender} onChange={handleInput}  className="form-control">
                      <option value>-- Select Gender --</option>
                      <option>Male</option>
                      <option>Female</option>
                    </select>
                  </div>
                </div>
                <div className="form-group">
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <span className="input-group-text bg-primary border-0 text-white">
                        <i className="fas fa-home" />
                      </span>
                    </div>
                    <input type="text" required placeholder="Address" value={user.address} onChange={handleInput}  name="address" className="form-control" />
                  </div>
                </div>
                <div className="form-group">
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <span className="input-group-text bg-primary border-0 text-white">
                        <i className="fas fa-home" />
                      </span>
                    </div>
                    <input type="email" required placeholder="Email address " name="email" value={user.email} onChange={handleInput} className="form-control" />
                  </div>
                </div>
              </div>
            </div>
            <input type="submit" defaultValue="Register" className="btn btn-primary btn-block" />
          </form>
        </div>
      </div>
    </div>
  </div>
</div>

        </>
    )
}

export default Register;