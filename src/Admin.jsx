import { Navigate ,useNavigate } from "react-router-dom";
import { useEffect, useState,useCallback } from "react";
import axios from "axios";

const GET_URL = "http://localhost:5000/api/enquiries";
const DELETE_URL = "http://localhost:5000/api/enquiry";

function Admin() {
  if (!localStorage.getItem("isLoggedIn")) {
  return <Navigate to="/login" />;
}
const navigate = useNavigate();

const handleLogout = () => {
  localStorage.removeItem("isLoggedIn");
  navigate("/login");
};
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(false);
  const[search,setSearch]=useState("");

  const fetchEnquiries = useCallback(async () => {
  try {
    setLoading(true);
    const res = await axios.get(GET_URL);
    setEnquiries(res.data);
  } catch (err) {
    console.log(err);
  } finally {
    setLoading(false);
  }
}, []);
 const deleteEnquiry = async (id) => {
  try {
    await axios.delete(`${DELETE_URL}/${id}`);

    // ✅ instantly update UI (no refresh needed)
    setEnquiries((prev) => prev.filter((item) => item._id !== id));

  } catch (err) {
    console.log(err);
  }
};
  useEffect(() => {
    fetchEnquiries();
  }, [fetchEnquiries]);

  return (
   <div style={styles.container}>
  <h1 style={styles.title}>📊 Admin Dashboard</h1>

  <button
    onClick={handleLogout}
    style={styles.logoutBtn}
  >
    Logout
  </button>
  <div style={styles.card}>
  <h2>Total Registrations</h2>
  <h1>{enquiries.length}</h1>
</div>
  <input
  type="text"
  placeholder="Search by name..."
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  style={styles.search}
/>

      {loading ? (
        <p style={styles.text}>Loading...</p>
      ) : (
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Name</th>
              <th style={styles.th}>Email</th>
              <th style={styles.th}>Phone</th>
              <th style ={styles.th}>Date & Time</th>
              <th style={styles.th}>Action</th>
            </tr>
          </thead>

          <tbody>
  {enquiries
    .filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase())
    )
    .map((item) => (
      <tr key={item._id}>
        <td style={styles.td}>{item.name}</td>
        <td style={styles.td}>{item.email}</td>
        <td style={styles.td}>{item.phone}</td>
        <td style={styles.td}>
          {new Date(item.createdAt).toLocaleString()}
          </td>
          <td style={styles.td}>
          <button
            onClick={() => deleteEnquiry(item._id)}
            style={styles.btn}
          >
            Delete
          </button>
        </td>
      </tr>
    ))}
</tbody>
        </table>
      )}
    </div>
  );
}

const styles = {
  container: {
    padding: "30px",
    fontFamily: "Arial",
    backgroundColor: "#f4f6f8",
    minHeight: "100vh",
  },
  title: {
    textAlign: "center",
    marginBottom: "20px",
    color: "#333",
  },
  text: {
    textAlign: "center",
    fontSize: "18px",
  },
  search: {
  width: "100%",
  padding: "12px",
  marginBottom: "20px",
  borderRadius: "8px",
  border: "1px solid #ccc",
  fontSize: "16px",
},

  table: {
    width: "100%",
    borderCollapse: "collapse",
    backgroundColor: "white",
    borderRadius: "10px",
    overflow: "hidden",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
  },
  th: {
    backgroundColor: "#4f46e5",
    color: "white",
    padding: "12px",
    textAlign: "left",
  },
  td: {
    padding: "12px",
    borderBottom: "1px solid #ddd",
  },
  btn: {
    background: "red",
    color: "white",
    border: "none",
    padding: "6px 10px",
    cursor: "pointer",
    borderRadius: "5px",
  },
  logoutBtn: {
  backgroundColor: "#dc2626",
  color: "white",
  border: "none",
  padding: "10px 15px",
  borderRadius: "8px",
  cursor: "pointer",
  marginBottom: "20px",
},
card: {
  backgroundColor: "white",
  width: "250px",
  padding: "20px",
  borderRadius: "15px",
  boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
  marginBottom: "20px",
},
};

export default Admin;