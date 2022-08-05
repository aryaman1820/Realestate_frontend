import axios from 'axios'
import { useEffect, useState,useRef } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import AdminNav from './Adminnav'

const ProjectDetails = () => {
  const builderRef = useRef();
  const [data, setData] = useState([])
  const [builder, setBuilder] = useState([])
  const [selectedPhoto, setSelectedPhoto] = useState(null)
  const [file, setFile] = useState(null)
  const [isEdit, setIsEdit] = useState(false)
  const [id, setId] = useState(null)
  const [product, setProduct] = useState({
    projectName: '',
    price: '',
    location: '',
    builder:'',
    targetCompletion: '',
  })
  useEffect(() => {
    loadData()
    axios.get('http://localhost:8090/api/builders').then((resp) => {
      console.log(resp.data)
      setBuilder(resp.data)
    })
  }, [])
  const loadData = () => {
    axios.get('http://localhost:8090/api/projectdetails').then((resp) => {
      console.log(resp.data)
      setData(resp.data)
    })
  }
  const handleInput = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value })
  }

  const handleFileInput = (e) => {
    setSelectedPhoto(e.target.files[0])
    setFile(URL.createObjectURL(e.target.files[0]))
  }

  const handleDelete = (id) => {
    const result = window.confirm('Are you sure to remove this Project ?')
    if (result) {
      axios.delete('http://localhost:8090/api/projectdetails/' + id).then((resp) => {
        toast.success(resp.data)
        loadData()
      })
    }
  }

  const handleEdit = (vdata) => {
    console.log(vdata)
    setIsEdit(true)
    setId(vdata.id)
    setProduct({
      projectname: vdata.projectName,
      price: vdata.price,
      builder: vdata.builder.id,
      location:vdata.location,
      targetCompletion:vdata.targetCompletion,
    })
    setSelectedPhoto(vdata.photo)
    setFile('http://localhost:8090/' + vdata.photo)
  }

  const handleReset = (e) => {
    setProduct({
      projectName: '',
      price: '',
      location: '',
      builder:'',
      targetCompletion: '',
      photo: '',
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('projectName', product.projectName)
    formData.append('builder', product.builder)
    formData.append('price', product.price)
    formData.append('location', product.location)
    formData.append('targetCompletion', product.targetCompletion)
    console.log(product)
    if (isEdit) {
      axios
        .put('http://localhost:8090/api/projectdetails/' + id, formData)
        .then((resp) => {
          toast.success(resp.data)
          setProduct({
            projectName: '',
            builder: '',
            price: '',
            location:'',
            targetCompletion:'',
            photo: '',
          })
          setSelectedPhoto(null)
          setFile(null)
          setIsEdit(false)
          loadData()
        })
        .catch((error) => {
          toast.error(error)
        })
    } else {
      formData.append('photo', selectedPhoto)
      axios
        .post('http://localhost:8090/api/projectdetails', formData)
        .then((resp) => {
          toast.success(resp.data)
          setProduct({
            projectName: '',
            price: '',
            location:'',
            photo: '',
            targetCompletion: '',
            builder:'',
          })
          setSelectedPhoto(null)
          setFile(null)
          loadData()
        })
        .catch((error) => {
          toast.error(error)
        })
    }
  }
  return (
    <>
      <div className='container-fluid'>
        <div
          className='container-fluid shadow p-2 bg-white'
          style={{ minHeight: '88vh' }}
        >
          <h5 className='p-2 mb-3 text-center' style={{ borderBottom: '2px solid blue' }}>
            Available Projects Category
          </h5>
          <div className='row'>
            <div className='col-sm-12'>
              <table className='table table-bordered table-sm'>
                <thead>
                  <tr>
                    <th>Sr. no.</th>
                    <th>Project Name</th>
                    <th>Builder</th>
                    <th>Price</th>
                    <th>location</th>
                    <th>Target Completion</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((x, index=0) => (
                    <tr key={x.id}>
                      <td>{x.id}</td>
                      <td>
                        <img
                          src={'http://localhost:8090/' + x.photo}
                          style={{ width: '100px' }}
                        />{' '}
                        {x?.projectName}
                      </td>
                      <td>{x?.builder?.buildName}</td>
                      <td>{x.price} </td>
                      <td>{x.location}</td>
                      <td>{x.targetCompletion}</td>
                      <td>
                        <button
                          onClick={(e) => handleEdit(x)}
                          className='btn btn-primary btn-sm mr-2 btn-block'
                        >
                          Edit
                        </button>
                        <button
                          onClick={(e) => handleDelete(x.id)}
                          className='btn btn-danger btn-sm btn-block'
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className='col-sm-4 float-center'>
              <h5 className='p-2'>Add/Update Project Categories</h5>
              <form method='post'>
              <div className='form-group'>
                  <label>ProjectName</label>
                  <input
                    type='text'
                    value={product.projectName}
                    onChange={handleInput}
                    name='projectName'
                    defaultValue
                    className='form-control'
                  />
                </div>
                <div className='form-group'>
                  <label>Builder *</label>
                  <select
                    name='builder'
                    value={product.builder}
                    onChange={handleInput}
                    className='form-control'
                    ref={builderRef}
                  >
                    <option value>Select Builder</option>
                    {builder.map((x) => (
                      
                        <option value={x.id}>{x.id}- {x.buildName}</option>
                      
                    ))}
                  </select>
                </div>
                <div className='form-group'>
                  <label>Price</label>
                  <input
                    type='text'
                    value={product.price}
                    onChange={handleInput}
                    name='price'
                    defaultValue
                    className='form-control'
                  />
                </div>
                <div className='form-group'>
                  <label>Location</label>
                  <input
                    type='text'
                    value={product.location}
                    onChange={handleInput}
                    name='location'
                    defaultValue
                    className='form-control'
                  />
                </div>
                <div className='form-group'>
                  <label>Target Completion</label>
                  <input
                    type='text'
                    value={product.targetCompletion}
                    onChange={handleInput}
                    name='targetCompletion'
                    defaultValue
                    className='form-control'
                  />
                </div>
                {selectedPhoto ? (
                  <img
                    className='img-thumbnail float-right'
                    style={{ height: 100, width: 100 }}
                    src={file}
                    alt='Logo'
                  />
                ) : (
                  ''
                )}
                {isEdit ? (
                  ''
                ) : (
                  <>
                    <div className='form-group'>
                      <label>Photo</label>
                      <input
                        type='file'
                        id='photo'
                        name='photo'
                        value={product.photo}
                        onChange={handleFileInput}
                        accept='.jpg,.png'
                        className='form-control-file'
                      />
                    </div>
                  </>
                )}
                <div className='clearfix'></div>
                <button
                  onClick={handleSubmit}
                  className='btn btn-primary btn-sm m-2 p-2 mt-3 float-center'
                >
                  Save Category
                </button>
                <button
                  onClick={handleReset}
                  className='btn btn-danger btn-sm m-2 p-2 mt-3 float-center'
                >
                  Cancel
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ProjectDetails;
