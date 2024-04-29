import React from 'react';
import { useForm } from 'react-hook-form';

const UserForm = ({ onSubmit }) => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const submitHandler = (data) => {
    onSubmit(data);
    reset();
  };

  return (
      <form onSubmit={handleSubmit(submitHandler)}>
        <div>
          <label>Name:</label>
          <input {...register('name', { required: true })} />
          {errors.name && <span>This field is required</span>}
        </div>
        <div>
          <label>Username:</label>
          <input {...register('username', { required: true })} />
          {errors.username && <span>This field is required</span>}
        </div>
        <div>
          <label>Email:</label>
          <input type="email" {...register('email', { required: true })} />
          {errors.email && <span>This field is required</span>}
        </div>
        <div>
          <label>Phone:</label>
          <input {...register('phone', { required: true })} />
          {errors.phone && <span>This field is required</span>}
        </div>
        <div>
          <label>Website:</label>
          <input {...register('website')} />
        </div>
        <div>
          <button type="submit">Create</button>
          <button type="button" onClick={reset}>Clear Table</button>
        </div>
      </form>
  );
};

const UserTable = ({ users, onDelete, onClear }) => {
  return (
      <div>
        {users.length === 0 ? (
            <p>Table is empty</p>
        ) : (
            <table>
              <thead>
              <tr>
                <th>Name</th>
                <th>Username</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Website</th>
                <th>Actions</th>
              </tr>
              </thead>
              <tbody>
              {users.map((user, index) => (
                  <tr key={index}>
                    <td>{user.name}</td>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td>{user.phone}</td>
                    <td>{user.website}</td>
                    <td><button onClick={() => onDelete(index)}>Delete</button></td>
                  </tr>
              ))}
              </tbody>
            </table>
        )}
        <button onClick={onClear}>Clear Table</button>
      </div>
  );
};

const App = () => {
  const [users, setUsers] = React.useState([]);

  const addUser = (data) => {
    const newUser = {
      name: data.name,
      username: data.username,
      email: data.email,
      phone: data.phone,
      website: data.website || '',
    };
    setUsers([...users, newUser]);
  };

  const deleteUser = (index) => {
    const updatedUsers = users.filter((user, i) => i !== index);
    setUsers(updatedUsers);
  };

  const clearTable = () => {
    setUsers([]);
  };

  return (
      <div>
        <h1>User Form</h1>
        <UserForm onSubmit={addUser} />
        <h1>User Table</h1>
        <UserTable users={users} onDelete={deleteUser} onClear={clearTable} />
      </div>
  );
};

export default App;
