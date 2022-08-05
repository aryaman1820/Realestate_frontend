import axios from 'axios'
import { useEffect, useState } from 'react'
import { Rating } from 'react-simple-star-rating'
import AdminNav from './Adminnav'
import moment from 'moment'

export default function Feedbacks() {
  const [data, setData] = useState([])
  useEffect(() => {
    axios.get('http://localhost:8090/api/appointments/feedbacks').then((resp) => {
      setData(resp.data)
    })
  }, [])
  return (
    <>
      <div className='container-fluid'>
        <div
          className='container-fluid shadow p-2 bg-white'
          style={{ minHeight: '88vh' }}
        >
          <h4 className='p-2' style={{ borderBottom: '2px solid blue' }}>
            Feedbacks
          </h4>
          <table className='table table-bordered table-sm p-2'>
            <thead>
              <tr>
                <th>ID</th>
                <th>Customer Name</th>
                <th>Feedback</th>
                <th>Ratings</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {data.map((x) => (
                <tr key={x.id}>
                  <td>{x.id}</td>
                  <td>{x.customer.uname}</td>
                  <td>{x.descr}</td>
                  <td>
                    <Rating
                      initialValue={x.ratings}
                      readonly={true}
                      size={22}
                    />
                  </td>
                  <td>{moment(x.createdon).format('DD-MMM-yyyy')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}
