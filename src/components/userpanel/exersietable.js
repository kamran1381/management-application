// ExerciseTable.js
"use client";
import React, { useState, useEffect } from 'react';

function ExerciseTable() {
  const [exercises, setExercises] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch exercises from localStorage on mount
  useEffect(() => {
    const savedExercises = JSON.parse(localStorage.getItem('exercises')) || [];
    setExercises(savedExercises);
  }, []);

  // Filter exercises based on the search query
  const filteredExercises = exercises.filter(exercise =>
    exercise.exerciseName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    exercise.exerciseDetails.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = (index) => {
    const updatedExercises = exercises.filter((_, i) => i !== index);
    setExercises(updatedExercises);
    localStorage.setItem('exercises', JSON.stringify(updatedExercises));
  };

  return (
    <div className="mt-8 w-full">
      <h2 className="text-white text-2xl mb-4">Saved Exercises</h2>

      {/* Search Input */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search exercises..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="p-2 w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg border border-gray-300 rounded"
        />
      </div>

      {/* Table */}
      <table className="table-auto mt-4 border-collapse w-full bg-gray-800 text-white rounded-lg shadow-lg">
        <thead>
          <tr>
            <th className="border-b px-4 py-2 text-left">Exercise Name</th>
            <th className="border-b px-4 py-2 text-left">Details</th>
            <th className="border-b px-4 py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredExercises.length === 0 ? (
            <tr>
              <td colSpan="3" className="px-4 py-2 text-center">No exercises found</td>
            </tr>
          ) : (
            filteredExercises.map((exercise, index) => (
              <tr key={index}>
                <td className="border-b px-4 py-2">{exercise.exerciseName}</td>
                <td className="border-b px-4 py-2">{exercise.exerciseDetails}</td>
                <td className="border-b px-4 py-2 text-center">
                  <button
                    onClick={() => handleDelete(index)}
                    className="text-red-600 hover:text-red-800 transition-colors"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ExerciseTable;
