'use client'
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

function Programformadd() {
  const [progress, setProgress] = useState(0);
  const [formData, setFormData] = useState({
    phoneNumber: '',
    age: '',
    height: '',
    weight: '',
    sessionCount: '',
  });
  const [errors, setErrors] = useState({});
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const filledInputs = Object.values(formData).filter(value => value).length;
    setProgress((filledInputs / Object.keys(formData).length) * 100);
  }, [formData]);

  const validateForm = () => {
    let newErrors = {};
    if (!/^[0-9]+$/.test(formData.phoneNumber) || formData.phoneNumber.length < 4) {
      newErrors.phoneNumber = 'Phone number must be at least 4 digits and contain only numbers';
    }
    ['age', 'height', 'weight', 'sessionCount'].forEach(field => {
      if (!/^[0-9]+$/.test(formData[field])) {
        newErrors[field] = 'This field must contain only numbers';
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;

    // Store the form data in localStorage
    const existingPrograms = JSON.parse(localStorage.getItem('programs')) || [];
    existingPrograms.push(formData);

    localStorage.setItem('programs', JSON.stringify(existingPrograms));

    router.push('/userpanel/program');
    console.log('submitted')
  };

  if (!isMounted) return null;

  return (
    <div className="flex flex-col items-center pt-20">
      <div className="p-4 rounded-md shadow-md w-full max-w-5xl">
        <div className="flex flex-col items-center">
          <span className="text-[#E60000] text-lg pb-3">Build new program</span>
          <div className="w-[30%] bg-transparent bg-gray-600 border rounded-full h-4 mb-4">
            <div className="bg-red-700 h-4 rounded-xl" style={{ width: `${progress}%` }}></div>
          </div>
          <span className="text-white">{Math.round(progress)}%</span>
        </div>
        <p className="mb-9 text-lg font-medium text-white mt-7">Please complete below details</p>
        <div className="flex flex-col md:flex-row md:justify-between gap-10 text-white">
          <div className="w-full md:w-2/5 flex flex-col">
            <label className="pb-2">Phone Number</label>
            <input
              name="phoneNumber"
              type="text"
              value={formData.phoneNumber}
              onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
              className="mb-2 bg-transparent border border-[#E60000] py-1"
            />
            {errors.phoneNumber && <span className="text-red-500">{errors.phoneNumber}</span>}
          </div>
          <div className="w-full md:w-1/5 lg:px-8 flex flex-col">
            {['age', 'height', 'weight'].map(field => (
              <div key={field}>
                <label className="pb-2">{field.charAt(0).toUpperCase() + field.slice(1)} (cm/kg)</label>
                <input
                  name={field}
                  type="text"
                  value={formData[field]}
                  onChange={(e) => setFormData({ ...formData, [field]: e.target.value })}
                  className="mb-2 bg-transparent border border-[#E60000] py-1"
                />
                {errors[field] && <span className="text-red-500">{errors[field]}</span>}
              </div>
            ))}
          </div>
          <div className="w-full md:w-1/5 flex flex-col">
            <label className="pb-2">Session Count</label>
            <input
              name="sessionCount"
              type="text"
              value={formData.sessionCount}
              onChange={(e) => setFormData({ ...formData, sessionCount: e.target.value })}
              className="mb-2 bg-transparent border border-[#E60000] py-1"
            />
            {errors.sessionCount && <span className="text-red-500">{errors.sessionCount}</span>}
          </div>
        </div>
        <button
          onClick={handleSubmit}
          className="bg-[#E60000] text-white font-bold py-2 px-4 rounded-full flex items-center gap-2"
        >
          Submit Program
        </button>
      </div>
    </div>
  );
}

export default Programformadd;
