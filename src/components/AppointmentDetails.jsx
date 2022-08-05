import axios from "axios"
import { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import { useParams } from "react-router-dom"
import { toast } from "react-toastify"
import AdminNav from "./Adminnav"

export default function AppointmentDetails(){
    const {bid}=useParams()
    const [data,setData]=useState(null)
    const [properties,setProperties]=useState([])
    const [pmts,setPmts]=useState([])
    const [Property,setProperty]=useState(null)  
    const history=useHistory()
    const handleSubmit=e=>{
        e.preventDefault()
        console.log(Property)
        console.log("bid: ", bid)
        axios.put('http://localhost:8090/api/appointments/'+bid,{apno:Property})
        .then(resp=>{
            toast.success(resp.data)
            history.push('/appointments')
        })
        .catch(error=>{
            toast.error(error)
        })
    }

    useEffect(()=>{
        console.log("Appointment id",bid)
        axios.get('http://localhost:8090/api/appointments/'+bid)
        .then(resp=>{
            console.log(resp.data)
            setData(resp.data)
            console.log("Data: ", data)
        })
        
    },[])
    useEffect(()=>{
        axios.get('http://localhost:8090/api/property/projectdetails/'+data?.projectdetails?.id)
        .then(resp=>{
            setProperties(resp.data)
        })
        axios.get('http://localhost:8090/api/appointments/payments/'+data?.id)
        .then(resp=>{
            setPmts(resp.data)
        })
    },[data])

    return (
        <>
         <div className="container-fluid">
            <div className="container-fluid shadow p-2 bg-white" style={{minHeight:"88vh"}}>
                    <h4 className="p-2 mb-3 border-bottom border-primary">Appointment Details</h4>
                    <div className="form-row">
                        <div className="col-sm-6">
                            <div className="card shadow">
                            <img src={'http://localhost:8090/'+data?.projectdetails?.photo} class="card-top-img" />
                            <div className="card-body">
                                <table className="table table-sm">
                                <tbody>
                                <tr>
                                    <th>Appointment ID</th>
                                    <th>{data?.id}</th>
                                    <th>Customer Name</th>
                                    <th>{data?.customer?.uname}</th>
                                </tr>
                                <tr>
                                    <th>From Date</th>
                                    <th>{data?.fromdate}</th>
                                    <th>To Date</th>
                                    <th>{data?.todate}</th>
                                </tr>
                                <tr>
                                    <th>Project Details</th>
                                    <th>{data?.projectdetails.projectName}</th>
                                    <th>Price</th>
                                    <th>{data?.projectdetails?.price}</th>
                                </tr>
                                <tr>                                    
                                    <th>Date</th>
                                    <th>{data?.bookingdate}</th>
                                </tr>
                                </tbody>
                                </table>
                            </div>
                            </div>
                        </div>
                        <div className="col-sm-6">
                    <div className="card shadow">
                        <div className="card-body">
                        <h5 className="text-center">Appointment Confirmation</h5>
                        {data?.status=='Pending' ? (
                        <form>
                            <div className="form-row">
                            <div className="col-sm-6">
                                <div className="form-group">
                                <label>Select Property *</label>
                                <select required className="form-control form-control-sm" name="bno" value={Property} onChange={(e)=>setProperty(e.target.value)}>
                                    <option value>-- Select Property --</option>
                                    {properties.map((x)=>(
                                        <option key={x.id} value={x.id}>{x.id}</option>
                                    ))}
                                </select>
                                </div>
                            </div>                            
                            </div>
                            <input type="submit" onClick={handleSubmit} defaultValue="Confirm Booking" className="btn btn-outline-success btn-sm float-right" />                        
                        </form>
                        ) :(
                            <>
                        <h4 className="text-success text-center p-2">Appointment confirmed</h4>
                        <div className="form-row">                        
                            <div className="col-sm-8 p-3">
                            <h5>Property ID : {data?.Property?.id}</h5>                            
                            </div>
                        </div>
                        <div className="card shadow" style={{minHeight: '100%'}}>
                            <div className="card-body p-2">
                            <h5 className="text-center p-2" style={{borderBottom: '2px solid green'}}>Payment History</h5>        
                            {pmts.map(x=>(                   
                            <div className="card shadow p-2 mb-2">
                                <p className="p-1 m-0">Date : {x.pmtDate}</p>
                                <p className="m-0">Amount : ₹ {x.amount}</p>
                                <p className="m-0 font-weight-bold">{x.remarks}</p>
                            </div>
                            ))}
                            </div>
                        </div>
                        </>
                        )}
                        </div>
                    </div>
                    </div>

                    </div>

                </div>
            </div>
        </>
    )
}