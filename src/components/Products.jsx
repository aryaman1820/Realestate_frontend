import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const Products=()=>{
    var classNames = require('classnames');
    const {cid}=useParams()
    console.log("Builder id",cid)
    const [data,setData]=useState([])
    const [builder,setBuilder]=useState([])
    useEffect(()=>{
        loadData()        
    },[])
    const loadData=()=>{
        if(cid==null){
          axios.get("http://localhost:8090/api/projectdetails")
          .then(resp=>{
              console.log(resp.data)
              setData(resp.data)
          })
        }else{
          axios.get("http://localhost:8090/api/projectdetails/builder/"+cid)
          .then(resp=>{
              console.log(resp.data)
              setData(resp.data)
          })
        }
        axios.get("http://localhost:8090/api/builders")
        .then(resp=>{
            console.log(resp.data)
            setBuilder(resp.data)
        })
    }
    return (
        <>
        <div className="container-fluid products" style={{marginTop: 0, minHeight: '80vh'}}>
  <div className="row">
          <div className="col-sm-12 p-4">
      <div className="list-group text-center">
        <Link to="/products" className={classNames('list-group-item list-group-item-action', { active: cid==null })}>All Builders</Link>
        {builder.map(x=>(
            <Link key={x.id} to={'/products/'+x.id} className={classNames('list-group-item list-group-item-action', { active: cid===x.id })}>{x.buildName}</Link>            
        ))}
      </div>
    </div>
    <div className="col-sm-12 p-0">
      <div className="card shadow">
        <div className="card-body p-1">
          <div className="container-fluid py-2">
            <div className="row m-2">
            {data.length>0 ? data.map(x=>(
              <div key={x.id} className="col-md-4">
                <div className="card shadow mt-2">
                  <Link to={'/details/'+x.id}><img style={{height: 200}} src={'http://localhost:8090/'+x.photo} className="card-top-img img-thumbnail mx-auto d-block p-2" /></Link>
                  <div className="card-footer bg-light text-blac font-weight-bold p-2">
                    <div className="form-row">
                      <div className="col-sm-7">
                         {x?.projectName} 
                         <br>  
                         </br>
                         {x?.builder?.buildName}  
                      </div>
                      <div className="col-sm-5 text-right">₹ {x.price}</div>
                    </div>
                  </div>
                </div>
              </div>
                )) : (<>
                <div className="col-md-12">
                <div className="card shadow mt-2">
                <h5 className="p-2 text-warning text-center">No Properties available from this Builder.</h5>
                </div>
                </div>
                </>)}
              <div className="clearfix"> </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

        </>
    )
}

export default Products;