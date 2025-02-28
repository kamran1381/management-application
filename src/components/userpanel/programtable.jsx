"use client";
import React, { useState, useEffect } from "react";

function ProgramTable() {
  const [users, setUsers] = useState([]);
  const [programs, setPrograms] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    const savedData = JSON.parse(localStorage.getItem("appData")) || {};
    const savedPrograms = JSON.parse(localStorage.getItem("programs")) || [];

    if (savedData.user) {
      const usersList = Object.keys(savedData.user).map((userId) => {
        const user = savedData.user[userId];

        if (user?.formProgress?.formData) {
          return {
            id: userId,
            name: user.formProgress.formData.name || "N/A",
            phoneNumber: user.formProgress.formData.phoneNumber || "N/A",
            gender: user.formProgress.formData.gender || "N/A",
            preference: user.formProgress.formData.preference || "N/A",
          };
        }
        return null;
      }).filter(Boolean);

      setUsers(usersList);
    }

    setPrograms(savedPrograms);
  };

  // Delete User from localStorage
  const deleteUser = (userId) => {
    const savedData = JSON.parse(localStorage.getItem("appData")) || {};
    if (savedData.user && savedData.user[userId]) {
      delete savedData.user[userId];
      localStorage.setItem("appData", JSON.stringify(savedData));
      fetchData();
    }
  };

  // Delete Program from localStorage
  const deleteProgram = (index) => {
    const updatedPrograms = programs.filter((_, i) => i !== index);
    localStorage.setItem("programs", JSON.stringify(updatedPrograms));
    setPrograms(updatedPrograms);
  };

  // Filter users & programs based on search query
  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.id.toString().includes(searchQuery) ||
      user.phoneNumber.includes(searchQuery)
  );

  const filteredPrograms = programs.filter((program) =>
    program.phoneNumber.includes(searchQuery)
  );

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Program & User Table</h2>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search by name, ID, or phone number"
        className="border px-4 py-2 rounded mb-6 w-full max-w-md"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      {/* User Table */}
      <h3 className="text-xl font-semibold mt-4 mb-2">Users</h3>
      {filteredUsers.length > 0 ? (
        <table className="min-w-full table-auto border-collapse mb-6">
          <thead>
            <tr>
              <th className="border-b px-4 py-2 text-left">ID</th>
              <th className="border-b px-4 py-2 text-left">Name</th>
              <th className="border-b px-4 py-2 text-left">Phone Number</th>
              <th className="border-b px-4 py-2 text-left">Gender</th>
              <th className="border-b px-4 py-2 text-left">Preference</th>
              <th className="border-b px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.id}>
                <td className="border-b px-4 py-2">{user.id}</td>
                <td className="border-b px-4 py-2">{user.name}</td>
                <td className="border-b px-4 py-2">{user.phoneNumber}</td>
                <td className="border-b px-4 py-2">{user.gender}</td>
                <td className="border-b px-4 py-2">{user.preference}</td>
                <td className="border-b px-4 py-2">
                  <button
                    onClick={() => deleteUser(user.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No matching users found</p>
      )}

      {/* Program Table */}
      <h3 className="text-xl font-semibold mt-4 mb-2">Programs</h3>
      {filteredPrograms.length > 0 ? (
        <table className="min-w-full table-auto border-collapse">
          <thead>
            <tr>
              <th className="border-b px-4 py-2 text-left">Phone Number</th>
              <th className="border-b px-4 py-2 text-left">Age</th>
              <th className="border-b px-4 py-2 text-left">Height</th>
              <th className="border-b px-4 py-2 text-left">Weight</th>
              <th className="border-b px-4 py-2 text-left">Session Count</th>
              <th className="border-b px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredPrograms.map((program, index) => (
              <tr key={index}>
                <td className="border-b px-4 py-2">{program.phoneNumber}</td>
                <td className="border-b px-4 py-2">{program.age} years</td>
                <td className="border-b px-4 py-2">{program.height} cm</td>
                <td className="border-b px-4 py-2">{program.weight} kg</td>
                <td className="border-b px-4 py-2">{program.sessionCount}</td>
                <td className="border-b px-4 py-2">
                  <button
                    onClick={() => deleteProgram(index)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No programs found</p>
      )}
    </div>
  );
}

export default ProgramTable;
