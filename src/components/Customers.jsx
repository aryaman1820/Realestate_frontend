import axios from "axios";
import { useEffect, useState } from "react";
import AdminNav from "./Adminnav"

const Customers=()=>{
    const [data,setData]=useState([])
    useEffect(()=>{
        axios.get("http://localhost:8090/api/customers")
        .then(resp=>{
            console.log(resp.data)
            setData(resp.data)
        })
    },[])
    return(
        <>
        <div className="container-fluid">
            <div className="container-fluid shadow p-2 bg-white" style={{minHeight:"88vh"}}>
                    <h4 className="p-2 mb-2 border-bottom border-primary text-center">Customer list</h4>
                     <table className="table table-bordered">
                        <thead className="table-light">
                            <tr>
                                <th>Sr. no.</th>
                                <th>Username</th>
                                <th>Name</th>
                                <th>email</th>
                                <th>Gender</th>
                                <th>Address</th>
                                <th>Phone</th>
                                <th>Date of creation</th>                              
                            </tr>
                        </thead>
                        <tbody>
                    {data.map((x,index=0)=>(
                    <tr key={x.userid}>
                        <td>{index+1}</td>                  
                        <td>{x.userid}</td>
                        <td>{x.uname}</td>
                        <td>{x.email}</td>
                        <td>{x.gender}</td>                                                        
                        <td>{x.address}</td>                                                        
                        <td>{x.phone}</td>
                        <td>{x.createdon}</td>                                                        
                    </tr>
                ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default Customers;