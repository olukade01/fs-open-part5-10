import { Link } from "react-router-dom";

const Users = ({users}) => {
  return(
    <div>
      <h2>Users</h2>
      <p style={{marginLeft: 50, fontWeight: "bold"}}>blogs created</p>
      {users.map(user => <div key={user.id}>
       <Link to={`/users/${user.id}`}> {user.username} </Link>{user.blogs.length} 
      </div>)}
    </div>
  )
}

export default Users