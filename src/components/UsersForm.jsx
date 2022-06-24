import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'



const UsersForm = ({createUsers, updateUserById, objectUpdate, handleSubmit, reset, register}) => {

  const defaultValuesForm = {
      first_name: "",
      last_name: "",
      email:"",
      password: "",
      birthday: ""
  }
  
 
  const submit = data => {
    console.log(data)
    if(objectUpdate.id !== undefined){
      updateUserById(objectUpdate.id, data)
      reset(defaultValuesForm)
    } else {
      createUsers(data)
    }
    reset(defaultValuesForm)
  }

  return (

    <form onSubmit={handleSubmit(submit)}>
        <div>
          <label htmlFor="first_name">Name:</label>
          <input type="text" id='first_name' {...register('first_name')} />
        </div>
        <div>
          <label htmlFor="last_name">Last Name:</label>
          <input type="text" id='last_name' {...register('last_name')} />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input type="email" id='email' {...register('email')} />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input type="password" id='password' {...register('password')} />
        </div>
        <div>
          <label htmlFor="birthday">Birthday:</label>
          <input type="date" id='birthday' {...register('birthday')} />
        </div>
       <button>Submit</button>
      </form> 
    
  )
}

export default UsersForm