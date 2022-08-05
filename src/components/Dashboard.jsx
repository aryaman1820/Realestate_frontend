import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const Dashboard = () => {
  const [data, setData] = useState()
  useEffect(() => {
    axios.get('http://localhost:8090/api/admin').then((resp) => {
      setData(resp.data)
      console.log(resp.data)
    })
  }, [])
  return (
    <>
      <div className='container-fluid'>
        <div
          className='container-fluid shadow bg-white'
          style={{ minHeight: '88vh' }}
        >
          <h4 className='p-2 border-bottom border-primary'>Admin Dashboard</h4>
          <div className='row'>
            <div className='col'>
              <div className='card shadow m-2'>
                <div className='card-body p-3'>
                  <h5>Csutomers</h5>
                  <h5>{data?.customers}</h5>
                </div>

                <div class='card-footer'>
                  <Link to='/customers'>View Details</Link>
                </div>
              </div>
            </div>
            <div className='col-sm-3'>
              <div className='card shadow m-2'>
                <div className='card-body p-3'>
                  <h5>Builders</h5>
                  <h5>{data?.builder}</h5>
                </div>
                <div className='card-footer'>
                  <Link to='/builders'>View Details</Link>
                </div>
              </div>
            </div>

            <div className='col-sm-3'>
              <div className='card shadow m-2'>
                <div className='card-body p-3'>
                  <h5>Projects</h5>
                  <h5>{data?.projectdetails}</h5>
                </div>
                <div className='card-footer'>
                  <Link to='/ProjectDetails'>View Details</Link>
                </div>
              </div>
            </div>

            <div className='col-sm-3'>
              <div className='card shadow m-2'>
                <div className='card-body p-3'>
                  <h5>Properties</h5>
                  <h5>{data?.property}</h5>
                </div>
                <div className='card-footer'>
                  <Link to='/Property'>View Details</Link>
                </div>
              </div>
            </div>

            <div class='col-sm-3'>
              <div class='card shadow m-2'>
                <div class='card-body p-3'>
                  <h5>Appointments</h5>
                  <h5>{data?.appointments}</h5>
                </div>
                <div class='card-footer'>
                  <Link to='/appointments'>View Details</Link>
                </div>
              </div>
            </div> 
            <div class='col-sm-3'>
              <div class='card shadow m-2'>
                <div class='card-body p-3'>
                  <h5>Reports</h5>
                  <h5>{data?.appointments}</h5>
                </div>
                <div class='card-footer'>
                  <Link to='/reports'>View Details</Link>
                </div>
              </div>
            </div>
            <div class='col-sm-3'>
              <div class='card shadow m-2'>
                <div class='card-body p-3'>
                  <h5>Feedbacks</h5>
                  <h5>{data?.feedbacks}</h5>
                </div>
                <div class='card-footer'>
                  <Link to='/feedbacks'>View Details</Link>
                </div>
              </div>
            </div>  
          </div>
        </div>
      </div>
    </>
  )
}

export default Dashboard
