import axios from "axios"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import AdminNav from "./Adminnav"

const Builders=()=>{ 
    const [data,setData]=useState([])
    const [builder,setBuilder]=useState('')
    useEffect(()=>{
        loadData()
    },[])
    const loadData=()=>{
        axios.get("http://localhost:8090/api/builders")
        .then(resp=>{
            console.log(resp.data)
            setData(resp.data)
        })
    }
    const handleDelete=(id)=>{
        const result=window.confirm('Are you sure to delete this builder ?')
        if(result){
            axios.delete('http://localhost:8090/api/builders/'+id)
            .then(resp=>{
                toast.success(resp.data)
                loadData()
            })
        }
    }

    const handleSubmit=(e)=>{
        e.preventDefault()
        if(builder===''){
            toast.error('Please provide builder name')
        }
        else{
                axios.post('http://localhost:8090/api/builders',{buildName:builder})
        .then(resp=>{
            setBuilder('')
            toast.success(resp.data)
            loadData()
        })
        .catch(error=>{
            toast.error(error)
        })
    }
    }
    
    return(
        <>
        <div className="container-fluid">
            <div className="container-fluid shadow p-2 bg-white" style={{minHeight:"88vh"}}>
                    <h4 className="p-2 mb-3 border-bottom border-primary text-center">Builders</h4>
                    <div className="row">
                        <div className="col-sm-8">
                            <table className="table table-bordered table-sm">
                            <thead>
                                <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((x,index)=>(
                                <tr key={index}>
                                <td>{x.id}</td>
                                <td>{x.buildName}</td>
                                <td>
                                    <a onClick={(e)=>handleDelete(x.id)} href="#" className="btn btn-outline-danger btn-sm"><i className="fa fa-trash" />Delete</a>                        
                                </td>
                                </tr>
                                ))}
                            </tbody>
                            </table>
                        </div>
                        <div className="col-sm-4">
                            <form>
                            <div className="form-group">
                                <label>Builder Name</label>
                                <input type="text" value={builder} onChange={(e)=>setBuilder(e.target.value)} className="form-control" name="buildName" />
                            </div>
                            <input type="submit" onClick={handleSubmit} className="btn btn-primary btn-block" defaultValue="Save Builder" />
                            </form>        
                        </div>
                        </div>

                    </div>
                </div>
        </>
    )
}

export default Builders;