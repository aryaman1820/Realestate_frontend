import axios from 'axios'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import moment from 'moment'
import { toast } from 'react-toastify'
import Property from './Property'

const Details = () => {
  const { projid } = useParams()
  const state = useSelector((state) => state)
  console.log('LoggedIn ', state.loggedin.IsLoggedIn)
  const [data, setData] = useState({})
  const [bookingAmount, setBookingAmount] = useState(0)
  const today = moment(new Date()).format('YYYY-MM-DD')
  const [property, setProperty] = useState([])

  const [appointment, setAppointment] = useState({
    projid: projid,
    fromdate: today,
    todate: today,
    userid: sessionStorage.getItem('userid'),
    message: '',
    bookingAmount: 0,
    amountPaid: 0,
    cardno: '',
    nameOnCard: '',
    cvv: '',
    expiry: '',
  })
  const history = useHistory()

  const handleInput = (e) => {
    setAppointment({ ...appointment, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    appointment.bookingAmount = bookingAmount
    console.log('formdata', appointment)
    if (appointment.amountPaid > bookingAmount) {
      toast.error('Advance cannot be greater than billing amount')
      return
    }
    if (
      appointment.cardno === '' ||
      appointment.nameOnCard === '' ||
      appointment.cvv === '' ||
      appointment.expiry === ''
    ) {
      toast.error('Please provide payment details')
      return
    }
    axios
      .post('http://localhost:8090/api/appointments', appointment)
      .then((resp) => {
        toast.success(resp.data)
        history.push('/myappointments')
      })
      .catch((error) => {
        toast.error(error)
      })
    console.log('form submitted')
  }
  useEffect(() => {
    console.log(appointment)
    let bdays =
      moment(appointment.todate).diff(moment(appointment.fromdate), 'days') + 1
    setBookingAmount(800 * bdays)
    console.log('Days', bdays + 1)
  }, [appointment])

  useEffect(() => {
    axios.get('http://localhost:8090/api/projectdetails/' + projid).then((resp) => {
      console.log(resp.data)
      console.log(resp.data.id)
      setData(resp.data)
    })
  },[] )

  useEffect(()=> {
    axios.get("http://localhost:8090/api/property/projectdetails/" +projid)
    .then((response) =>{
      setProperty(response.data)
      console.log("Property: ",response.data)
    })
  },[])
  return (
    <>
      <div className='container-fluid'>
        <div className='row'>
          <div className='col-sm-12'>
            <div className='card m-2'>
              <div key ={data.id}className='card-header text-center'></div>
              <img
                style={{ height: 380 }}
                src={'http://localhost:8090/' + data.photo}
                className='card-top-img'
              />
              <div className='card-footer'>
                <table className='table table-sm'>
                  <thead>
                    <tr>
                      <th>Project</th>
                      <th></th>
                      <th>
                        {data.projectName}
                      </th>
                    </tr>
                    <tr>
                      <th>Price Range</th>
                      <th>
                      
                      </th>
                      <th>₹ {data.price} /- </th>
                    </tr>
                    <tr>
                      <th>Appointment and verification charges</th>
                      <th></th>
                      <th>₹ {bookingAmount} per day</th>
                    </tr>
                    <tr>
                      <th>Location</th>
                      <th></th>
                      <th>{data.location}</th>
                    </tr>
                    <tr>
                      <th>Property details</th>
                      <th>Built In Area </th>
                      <th>Number Of Rooms</th>
                      </tr>
                      
                      {property.map((x) =>(
                        <tr>
                          <th>{x.id}</th>
                          <th>{x.area} sqft</th>
                          <th>{x.noOfRooms} rooms</th>
                        </tr>
                      ))}
                  </thead>
                </table>
              </div>
            </div>
          </div>
          </div>
          <div>
          <div className='justify-content-center'>
            {state.loggedin.IsLoggedIn ? (
              <>
                <form>
                  <div className='card shadow mb-2'>
                    <div className='card-body'>
                      <h4 className='p-2' style={{ borderBottom: '2px solid blue', textAlign: 'center'}}>
                         Details
                      </h4>
                      <div className='form-row'>
                        <div className='col-sm-6 p-2'>
                          <div className='form-group'>
                            <label>From Date</label>
                            <input
                              type='date'
                              min={today}
                              value={appointment.fromdate}
                              onChange={handleInput}
                              name='fromdate'
                              className='form-control'
                            />
                          </div>
                        </div>
                        <div className='col-sm-6 p-2'>
                          <div className='form-group'>
                            <label>To Date</label>
                            <input
                              type='date'
                              min={today}
                              value={appointment.todate}
                              onChange={handleInput}
                              name='todate'
                              className='form-control'
                            />
                          </div>
                        </div>
                        <div className='col-sm-6'>
                          <div className='form-group'>
                            <label>Price</label>
                            <input
                              type='text'
                              readOnly
                              name='bookingAmount'
                              value={bookingAmount}
                              className='form-control'
                            />
                          </div>
                        </div>
                        <div className='col-sm-6'>
                          <div className='form-group'>
                            <label>Message (Optional)</label>
                            <input
                              type='text'
                              required
                              name='message'
                              onChange={handleInput}
                              value={appointment.message}
                              className='form-control'
                            />
                          </div>
                        </div>
                        <div className='col-sm-6'>
                          <div className='form-group'>
                            <label>Booking Money</label>
                            <input
                              type='number'
                              id='advance'
                              min={1}
                              onChange={handleInput}
                              required
                              name='amountPaid'
                              max={bookingAmount}
                              value={appointment.amountPaid}
                              placeholder='Advance Amount'
                              className='form-control'
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='card shadow mb-2'>
                    <div className='card-body'>
                      <h4 className='p-2' style={{ borderBottom: '2px solid blue', textAlign: 'center' }}>
                        Payment Details
                      </h4>
                      <div className='form-row'>
                        <div className='col-sm-6 p-2'>
                          <div className='form-group'>
                            <label>Card Number</label>
                            <input
                              type='text'
                              required
                              name='cardno'
                              onChange={handleInput}
                              value={appointment.cardno}
                              pattern='[0-9]{16,16}'
                              maxLength={16}
                              className='form-control'
                            />
                          </div>
                        </div>
                        <div className='col-sm-6 p-2'>
                          <div className='form-group'>
                            <label>Name on Card</label>
                            <input
                              type='text'
                              required
                              name='nameOnCard'
                              onChange={handleInput}
                              value={appointment.nameOnCard}
                              className='form-control'
                            />
                          </div>
                        </div>
                        <div className='col-sm-6 p-2'>
                          <div className='form-group'>
                            <label>CVV</label>
                            <input
                              type='text'
                              required
                              maxLength={3}
                              pattern='[0-9]{3,3}'
                              name='cvv'
                              onChange={handleInput}
                              className='form-control'
                            />
                          </div>
                        </div>
                        <div className='col-sm-6 p-2'>
                          <div className='form-group'>
                            <label>Expiry Date</label>
                            <input
                              type='month'
                              name='expiry'
                              onChange={handleInput}
                              required
                              className='form-control'
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <input
                    type='submit'
                    defaultValue='Booking Now'
                    onClick={handleSubmit}
                    className='btn btn-primary'
                  />
                </form>
              </>
            ) : (
              <>
                <h5 className='p-2 mt-4'>
                  Please <Link to='/login'>login</Link> or{' '}
                  <Link to='/register'>register</Link> to Book Property Appointments 
                </h5>
              </>
            )}
          </div>
          <div className='clearfix'> </div>
        </div>
      </div>
    </>
  )
}

export default Details
