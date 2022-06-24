import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'
import UsersList from './components/UsersList'
import UsersForm from './components/UsersForm'
import { useForm } from 'react-hook-form'

const URL = 'https://users-crud1.herokuapp.com/users/'

function App() {

  const {handleSubmit, register, reset} = useForm()

  const [users, setUsers] = useState()
  const [isShowForm, setIsShowForm] = useState(false)
  const [objectUpdate, setObjectUpdate] = useState({})

  const getAllUsers = () => {
    axios.get(URL)
      .then(res => setUsers(res.data))
      .catch(err => console.log(err))
  }
   
  useEffect(() => {
    getAllUsers()
  }, [])

  const createUsers= userNew => {
    axios.post(URL, userNew)
      .then(res => {
        console.log(res.data)
        getAllUsers()
      })
      .catch(err => console.log(err))
  }

  const updateUserById = (id, updateUser) => {
    axios.patch(`${URL}${id}/`, updateUser)
      .then(res => {
        console.log(res.data)
        getAllUsers()
        setObjectUpdate()
        setIsShowForm(false)
      })
      .catch(err => console.log(err))
  }

  const showForm = () => {
    const obj = {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      birthday: "" 
    }

    reset(obj)
    setIsShowForm(!isShowForm)
  }
   
  
  return (
    <div className="App">
  
    <header className='header'>
    <h1>Users Form</h1> 
      <button  onClick={showForm}>{isShowForm ? 'Hide Form' :'+ Add User'}</button>
     
        </header>
       
        {
          
          isShowForm &&
          <div className='form-user'>
          <UsersForm 
          
            createUsers={createUsers}
            updateUserById={updateUserById}
            objectUpdate={objectUpdate}
            handleSubmit={handleSubmit}
            reset={reset}
            register={register}
          />
          </div>
        }
         <div className='users-container'>  
        { 
        
         users?.map(user =>(        
            <UsersList
            key={user.id}
            user={user}
            URL={URL}
            getAllUsers={getAllUsers}
            setObjectUpdate={setObjectUpdate}
            setIsShowForm={setIsShowForm}
            reset={reset}
          />  
          
         
        ))    
        
      }
         </div>
    </div>
  )
}

export default App
