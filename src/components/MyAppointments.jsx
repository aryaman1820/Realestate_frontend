import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'

export default function MyAppointments() {
  const userid = sessionStorage.getItem('userid')
  const [data, setData] = useState([])
  useEffect(() => {
    loadData()
  }, [])
  const loadData = () => {
    axios
      .get('http://localhost:8090/api/appointments/users?userid=' + userid)
      .then((resp) => {
        setData(resp.data)
      })
  }
  const handleCancel = (id) => {
    var res = window.confirm('Are you sure you want to cancel this appointment?')
    if (res) {
      axios.delete('http://localhost:8090/api/appointments/' + id).then((resp) => {
        toast.success(resp.data)
        loadData()
      })
    }
  }
  return (
    <>
      <div className='container-fluid' style={{ minHeight: '80vh' }}>
        <div className='card shadow mt-2'>
          <div className='card-body'>
            <h5 className='p-2' style={{ borderBottom: '2px solid blue' }}>
              My Appointments
            </h5>
            <table className='table table-bordered'>
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Builder Name</th>
                  <th>Posted Date</th>
                  <th>Price</th>
                  <th>Buy Date</th>
                  <th>To Date</th>
                  {/* <th>Status</th> */}
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {data.map((bk) => (
                  <tr key={bk.id}>
                    <td>{bk.id}</td>
                    <td>
                      {bk?.projectdetails?.projectName} - {bk?.projectdetails.builder.buildName}
                    </td>
                    <td>{bk?.bookingdate}</td>
                    <td>₹ {bk?.projectdetails.price}</td>
                    <td>{bk?.fromdate}</td>
                    <td>{bk?.todate}</td>
                    {/* <td>{bk.status}</td> */}
                    <td>
                      {bk.status === 'Pending' ? (
                        <button
                          onClick={(e) => handleCancel(bk.id)}
                          className='btn btn-outline-danger btn-sm'
                        >
                          cancel appointment
                        </button>
                      ) : (
                        <Link
                          to={'mybdetails/' + bk.id}
                          className='btn btn-outline-primary btn-sm'
                        >
                          Details
                        </Link>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  )
}
