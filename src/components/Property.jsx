import AdminNav from './Adminnav'
import { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'

const Property = () => {
  const [projectdetails, setProjectDetails] = useState([])
  const [data, setData] = useState([])
  const [filter, setFilter] = useState('All Properties')
  const [edit, setEdit] = useState(false)
  const [property, setProperty] = useState({
    id: '',
    noOfRooms: '',
    city: '',
    area: '',
    projid: '',
  })
  const history = useHistory()
  useEffect(() => {
    axios.get('http://localhost:8090/api/projectdetails').then((resp) => {
      setProjectDetails(resp.data)
    })
    loadData()
  }, [])

  const handleInput = (e) => {
    setProperty({ ...property, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(property)
    if (property.id === '' || property.noOfRooms === '' || property.city === '' || property.area === '' || property.projid === '') {
      toast.error('Please provide required details')
    } else {
      axios
        .post('http://localhost:8090/api/property', property)
        .then((resp) => {
          toast.success('Property saved successfully')
          setProperty({
            id: '',
            noOfRooms: '',
            city: '',
            area: '',
            projid: '',
          })
          setEdit(false)
          loadData()
        })
        .catch((error) => {
          toast.error(error)
        })
    }
  }

  const handleFilter = (city) => {
    setFilter(city)
  }

  const handleEdit = (item) => {
    setEdit(true)
    setProperty({
      id: item.id,
      noOfRoooms: item.noOfRooms,
      city: item.city,
      area: item.area,
      projid: item.projid,
    })
  }

  const handleDelete = (id) => {
    const resp = window.confirm('Are you sure you want to Delete this Property ?')
    if (resp) {
      axios
        .delete('http://localhost:8090/api/property/' + id)
        .then((resp) => {
          toast.success(resp.data)
          loadData()
        })
        .catch((error) => {
          toast.error('Property already in appointment')
        })
    }
  }

  const loadData = () => {
    axios.get('http://localhost:8090/api/property').then((resp) => {
      setData(resp.data)
    })
  }
  return (
    <>
      <div className='container-fluid'>
        <div
          className='container-fluid shadow p-2 bg-white'
          style={{ minHeight: '88vh' }}
        >
          <div className='row'>
            <div className='col-sm-12'>
              <div className='form-inline float-right mt-1 mr-2'>
                <label className='mr-2'>Filter</label>
                <select
                  onChange={(e) => handleFilter(e.target.value)}
                  className='form-control form-control-sm'
                  style={{ width: 200 }}
                >
                  <option>All Properties</option>
                  <option>Available</option>
                  <option>Not Available</option>
                </select>
              </div>
              <h5
                className='p-2 mb-3'
                style={{ borderBottom: '2px solid blue' }}
              >
                Properties
              </h5>
              <table className='table table-bordered table-sm'>
                <thead>
                  <tr>
                    <th>Sr. no.</th>
                    <th>Property Id</th>
                    <th>Project Name</th>
                    <th>Number of Rooms</th>
                    <th>Property Location</th>
                    <th>Target Completion</th>
                    <th>Status</th>
                    <th>Area in sqft</th>
                    <th>Price</th>
                    <th>Builder</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {data.filter((val) => {
                      if (filter === 'All Properties') return val
                      else return val.status === filter
                    }).map((x, index=0) => (
                      <tr key={x.id}>
                        <td>{index+1}</td>
                        <td>{x.id}</td>
                        <td>{x.projectDetails.projectName}</td>
                        <td>{x.noOfRooms}</td>
                        <td>{x.projectDetails.location}, {x.city}</td>
                        <td>{x.projectDetails.targetCompletion}</td>
                        <td>{x.status}</td>
                        <td>{x.area}</td>
                        <td>{x.projectDetails.price}</td>
                        <td>{x.projectDetails.builder.buildName}</td>
                        <td>
                          <button
                            className='btn btn-danger btn-sm btn-block'
                            onClick={(e) => handleDelete(x.id)}
                          >
                            Remove
                          </button>
                          <button
                            className='btn btn-primary btn-sm btn-block'
                            onClick={(e) => handleEdit(x)}
                          >
                            Edit
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
            <div className='col-sm-4 '>
              <div className='Biked'>
                <div className='Biked-body mt-3'>
                  <h5 style={{color: 'Blue', fontWeight: 'Bold'}}>Property Details</h5>
                  <form>
                    <div className='form-group mt-3'>
                      <label>Select Project and Builder</label>
                      <select
                        required
                        className='form-control'
                        name='projid'
                        value={property?.projid}
                        onChange={handleInput}
                      >
                        <option value>-- Select Project and builder --</option>
                        {projectdetails.map((x) => (
                          <option key={x.id} value={x.id}>
                            {x?.projectName} - {x?.builder?.buildName}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className='form-group'>
                      <label>Property Id</label>
                      <input
                        type='text'
                        disabled={edit}
                        required
                        className='form-control'
                        value={property?.id}
                        onChange={handleInput}
                        name='id'
                      />
                    </div>
                    <div className='form-group'>
                      <label>Number of Rooms</label>
                      <input
                        type='text'
                        required
                        className='form-control'
                        value={property?.noOfRooms}
                        onChange={handleInput}
                        name='noOfRooms'
                      />
                    </div>
                    <div className='form-group'>
                      <label>city</label>
                      <input
                        type='text'
                        required
                        className='form-control'
                        value={property?.city}
                        onChange={handleInput}
                        name='city'
                      />
                    </div>
                    <div className='form-group'>
                      <label>Area in sqft</label>
                      <input
                        type='text'
                        required
                        className='form-control'
                        value={property?.area}
                        onChange={handleInput}
                        name='area'
                      />
                      </div>
                    <div className='form-group'>
                      <label>project Id</label>
                      <input
                        type='text'
                        required
                        className='form-control'
                        value={property?.projid}
                        onChange={handleInput}
                        name='projid'
                      />
                    </div>
                    <div className='d-grid gap-2 d-md-block'>
                        
                        <input
                          type='submit'
                          onClick={handleSubmit}
                          className='btn btn-primary btn-block'
                          defaultValue='Save Property'
                        />
                        <Link
                          to='/property'
                          className='btn btn-danger btn-block'
                        >
                          Cancel
                        </Link>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Property;
