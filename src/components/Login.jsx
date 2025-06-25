import React, { useState } from 'react';

const InputField = ({ label, name, type = 'text', value, error, onChange }) => (
  <div className="mb-4">
    <label htmlFor={name} className="block mb-3 text-lg font-medium text-black">
      {label}
    </label>
    <input
      type={type}
      name={name}
      id={name}
      value={value}
      onChange={onChange}
      placeholder="Enter your number"
      className={`mt-1 block w-full px-3 py-3 border ${error ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500`}
    />
    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
  </div>
);

const LoginPage = () => {
  const [form, setForm] = useState({ phone: '' });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!/^\d{10}$/.test(form.phone.trim())) {
      newErrors.phone = 'Phone number must be 10 digits';
    }
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      const updated = { ...errors };
      delete updated[name];
      setErrors(updated);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const foundErrors = validate();
    setErrors(foundErrors);
    if (Object.keys(foundErrors).length === 0) {
      console.table(form);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen bg-gray-50">
      <div className="w-full lg:w-1/2 h-64 lg:h-full">
        <img
          src="https://images.unsplash.com/photo-1496917756835-20cb06e75b4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1908&q=80"
          className="w-full h-full object-cover"
          alt="Login"
        />
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <h1 className="text-3xl font-bold text-center mb-6">Login</h1>
          <form onSubmit={handleSubmit} noValidate>
            <InputField
              label="Phone Number"
              name="phone"
              type="tel"
              value={form.phone}
              error={errors.phone}
              onChange={handleChange}
            />
            <button
              type="submit"
              className="w-full py-3 text-lg font-light px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
