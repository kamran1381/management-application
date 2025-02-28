"use client";
import React, { useState, useEffect } from 'react';

function NewExerciseForm() {
  const [formData, setFormData] = useState({
    exerciseName: '',
    details: '',
  });
  
  useEffect(() => {
    const storedName = localStorage.getItem('name');
    if (storedName) {
      setFormData(prevState => ({
        ...prevState,
        exerciseName: storedName,
      }));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    const existingExercises = JSON.parse(localStorage.getItem('exercises')) || [];
    const newExercise = {
      exerciseName: formData.exerciseName,
      exerciseDetails: formData.details,
    };
    
    const updatedExercises = [...existingExercises, newExercise];
    localStorage.setItem('exercises', JSON.stringify(updatedExercises));

    console.log('Exercise saved to localStorage:', newExercise);
    router.push('/userpanel/excersises');
  };

  return (
    <div className="flex flex-col items-center mt-5 w-full">
      <label className='text-white'>Exercise Name:</label>
      <input
        type="text"
        name="exerciseName"
        placeholder="Enter exercise name"
        value={formData.exerciseName}
        onChange={handleChange}
        className="mb-4 p-2 w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg border border-gray-300 rounded"
      />

      <label className='text-white'>Details:</label>
      <input
        type="text"
        name="details"
        placeholder="Explain the exercise"
        value={formData.details}
        onChange={handleChange}
        className="mb-4 p-2 w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg border border-gray-300 rounded"
      />

      <button
        onClick={handleSubmit}
        className="py-2 px-5 bg-red-800 text-white rounded-md"
      >
        Save
      </button>
    </div>
  );
}

export default NewExerciseForm;