'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

function Loginform() {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    const [errorMessage, setErrorMessage] = useState('');
    const router = useRouter();

    const handleLogin = (e) => {
        e.preventDefault();

        if (!formData.username || !formData.password) {
            setErrorMessage('Both fields are required.');
            return;
        }

        if (formData.username === 'lachin' && formData.password === '123456') {
            router.push('/userpanel/account');
        } else {
            router.push('/signup');
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-[#0f0e0c]">
            <div className="w-full max-w-sm p-4 ">
                <form className="border border-white shadow-md rounded px-8 pt-6 pb-8 mb-4 text-white" onSubmit={handleLogin}>
                    <div className="text-center mt-6 mb-4">
                        <span className="text-2xl">Login</span>
                    </div>
                    <div className="mb-4 px-10">
                        <label className="block text-[#F9F9F9] text-sm mb-3" htmlFor="username">Username</label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline bg-transparent"
                            id="username"
                            name="username"
                            type="text"
                            value={formData.username}
                            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                        />
                    </div>
                    <div className="pt-5 px-10">
                        <label className="block text-[#F9F9F9] text-sm mb-3" htmlFor="password">Password</label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-white mb-3 leading-tight focus:outline-none focus:shadow-outline bg-transparent"
                            id="password"
                            name="password"
                            type="password"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        />
                    </div>
                    <div className="px-10 pt-5">
                        <button
                            className="bg-[#E60000] text-white font-bold py-2 px-4 w-full rounded focus:outline-none focus:shadow-outline"
                            type="submit"
                        >
                            Login
                        </button>
                    </div>
                    {errorMessage && (
                        <div className="text-red-500 text-xs pt-4 text-center">
                            {errorMessage}
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
}

export default Loginform;
