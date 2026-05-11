import { useState, useEffect } from "react";

function App () {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); 

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("https://jsonplaceholder.typicode.com/users");

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const data = await response.json();
        setUsers(data);
        setLoading(false);

      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return <h2>Loading...</h2>
  if (error) return <h2>Error: {error}</h2>


  return (
    <div>
      <h1>User List</h1>

      {users.slice(0, 5).map((user) => (
        <div
          key={user.id}
          style={{
            border: "5px solid gray",
            borderRadius: "10px",
            padding: "10px",
            margin: "10px",
          }}
        >
          <h3>{user.name}</h3>
          <p>Email: {user.email}</p>
          <p>Company: {user.company.name}</p>
        </div>
      ))}
    </div>
  );
}

export default App;
