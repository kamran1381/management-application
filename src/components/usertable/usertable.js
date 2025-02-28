'use client'
import { useEffect, useState } from "react";

export default function UserTable() {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [notification, setNotification] = useState(""); 
  const [showNotification, setShowNotification] = useState(false); 

  useEffect(() => {
    fetchUsers();
  }, []);

  async function fetchUsers() {
    try {
      const response = await fetch("/api/users");
      const result = await response.json();

      if (!result.success) throw new Error(result.error);

      setUsers(result.data);
    } catch (error) {
      console.error("Error fetching users:", error);
      setUsers([]);
    }
  }

  async function deleteUser(id) {
    try {
      const response = await fetch("/api/users", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }), 
      });

      const result = await response.json();
      if (!result.success) throw new Error(result.error);

      setUsers(users.filter((user) => user.id !== id));

      setNotification("User deleted successfully!");
      setShowNotification(true);

      setTimeout(() => {
        setShowNotification(false);
        setNotification("");
      }, 3000);
    } catch (error) {
      console.error("Error deleting user:", error);

      // Show error notification
      setNotification("Failed to delete user.");
      setShowNotification(true);

      // Hide notification after 3 seconds
      setTimeout(() => {
        setShowNotification(false);
        setNotification("");
      }, 3000);
    }
  }

  function handleSearch(event) {
    setSearchQuery(event.target.value);
  }

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">User List</h2>

      <input
        type="text"
        placeholder="Search by name..."
        value={searchQuery}
        onChange={handleSearch}
        className="mb-4 p-2 border rounded w-full"
      />

      {showNotification && (
        <div
          className={`${
            notification.includes("success") ? "bg-green-500" : "bg-red-500"
          } text-white p-3 mb-4 rounded`}
        >
          {notification}
        </div>
      )}

      {/* User Table */}
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Name</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Gender</th>
            <th className="border p-2">Actions</th> 
          </tr>
        </thead>
        <tbody>
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="border p-2">{user.name}</td>
                <td className="border p-2">{user.email}</td>
                <td className="border p-2">{user.gender}</td>
                <td className="border p-2">
                  <button
                    onClick={() => deleteUser(user.id)} 
                    className="bg-red-500 text-white p-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center p-4">
                No users found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
