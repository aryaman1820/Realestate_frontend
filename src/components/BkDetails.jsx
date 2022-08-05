import axios from 'axios'
import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { Rating } from 'react-simple-star-rating'
import { toast } from 'react-toastify'

export default function BkDetails() {
  const { bid } = useParams()
  const [data, setData] = useState({})
  const [pmts, setPmts] = useState([])
  const history = useHistory()
  const [fdata, setfdata] = useState({
    amount: 0,
    feedback: '',
    ratings: '',
    cardno: '',
    nameoncard: '',
  })
  const [complete, setcomplete] = useState(false)
  const handleInput = (e) => {
    setfdata({ ...fdata, [e.target.name]: e.target.value })
  }
  const handleRating = (rate) => {
    setfdata({ ...fdata, ['ratings']: rate / 20 })
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    fdata.amount = data?.bookingAmount - data.amountPaid
    console.log(fdata)
    axios
      .put('http://localhost:8090/api/appointments/complete/' + bid, fdata)
      .then((resp) => {
        toast.success(resp.data)
        history.push('/myappointments')
      })
      .catch((error) => {
        toast.error(error)
      })
  }
  useEffect(() => {
    console.log('Booking id', bid)
    axios.get('http://localhost:8090/api/appointments/' + bid).then((resp) => {
      console.log("Resp: ",resp.data)
      setData(resp.data)
    })
    axios
      .get('http://localhost:8090/api/appointments/payments/' + bid)
      .then((resp) => {
        setPmts(resp.data)
        resp.data.forEach((x) => {
          console.log("Payments:",x.iscompleted)
          setcomplete(x.iscompleted)
        })
      })
  }, [])
  return (
    <>
      <div className='container-fluid' style={{ minHeight: '80vh' }}>
        <h5 className='p-2 mb-2' style={{ borderBottom: '2px solid blue' }}>
          Appointment Details
        </h5>
        <div className='form-row'>
          <div className='col-sm-12'>
            <div className='card shadow my-2'>
              <div className='card-body'>
                <img
                  src={'http://localhost:8090/' + data?.projectdetails?.photo}
                  style={{ height: '250px' }}
                  class='mx-auto d-block'
                />
                <table className='table table-sm'>
                  <tbody>
                    <tr>
                      <th>Appointment ID</th>
                      <th>{data?.id}</th>
                    </tr>
                    <tr>
                      <th>Property ID</th>
                      <th>{data?.property?.id}</th>
                    </tr>
                    <tr>
                      <th>From Date</th>
                      <th>{data?.fromdate}</th>
                    </tr>
                    <tr>
                      <th>To Date</th>
                      <th>{data?.todate}</th>
                    </tr>
                    <tr>
                      <th>Project Category</th>
                      <th>{data?.projectdetails?.projectName}</th>
                    </tr>
                    <tr>
                      <th>Price</th>
                      <th>₹ {data?.projectdetails?.price} </th>
                    </tr>
                    <tr>
                      <th>Bill Amount</th>
                      <th>₹ {data?.bookingAmount}</th>
                    </tr>
                    <tr>
                      <th>Advance Paid </th>
                      <th>₹ {data?.amountPaid}</th>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className='col-sm-6'>
            <div className='card shadow'>
              <div className='card-body'>
                <div className='form-row'>
                  <div className='col-sm-8'>
                    {!complete ? (
                      <div className='card shadow'>
                        <div className='card-body'>
                          <h5 className='text-center'>
                            Final Payment and Feedback
                          </h5>
                          <form>
                            <div className='form-group'>
                              <label>Balance Amount *</label>
                              <input
                                type='text'
                                name='amount'
                                readOnly
                                value={data.bookingAmount - data.amountPaid}
                                className='form-control form-control-sm'
                              />
                            </div>
                            <div className='form-group'>
                              <label>Card No *</label>
                              <input
                                type='text'
                                name='cardno'
                                maxLength={16}
                                minLength={16}
                                value={fdata.cardno}
                                onChange={handleInput}
                                className='form-control form-control-sm'
                              />
                            </div>
                            <div className='form-group'>
                              <label>Name on card *</label>
                              <input
                                type='text'
                                name='nameoncard'
                                value={fdata.nameoncard}
                                onChange={handleInput}
                                className='form-control form-control-sm'
                              />
                            </div>
                            <div className='form-group'>
                              <label>Feedback *</label>
                              <textarea
                                rows={4}
                                placeholder='Feedback'
                                name='feedback'
                                value={fdata.descr}
                                onChange={handleInput}
                                className='form-control form-control-sm'
                              />
                            </div>
                            <div className='form-group'>
                              <label>Rating </label>
                              <div className='rating'>
                                <Rating
                                  ratingValue={fdata.ratings}
                                  name='ratings'
                                  onClick={handleRating}
                                />
                              </div>
                            </div>
                            <input
                              type='submit'
                              onClick={handleSubmit}
                              defaultValue='Make Payment'
                              className='btn btn-success btn-sm float-right'
                            />
                          </form>
                        </div>
                      </div>
                    ) : (
                      <div
                        className='card shadow'
                        style={{ minHeight: '100%' }}
                      >
                        <div className='card-body p-2'>
                          <h5
                            className='text-center p-2'
                            style={{ borderBottom: '2px solid green' }}
                          >
                            Payment History
                          </h5>
                          {pmts.map((x) => (
                            <div className='card shadow p-2 mb-2'>
                              <p className='p-1 m-0'>Date : {x.pmtdate}</p>
                              <p className='m-0'>Amount : ₹ {x.amount}</p>
                              <p className='m-0 font-weight-bold'>
                                {x.remarks}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
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
