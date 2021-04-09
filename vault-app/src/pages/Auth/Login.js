import React, { useState } from "react";

const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(user);
  };

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex flex-col items-center justify-center min-w-screen min-h-screen">
      <h2 className="xl:text-4xl text-2xl font-bold my-4">Login</h2>
      <form
        className="w-full flex flex-col items-center justify-center"
        onSubmit={handleSubmit}
      >
        <div>
          <label className="block mb-2 text-primary">Email</label>
          <input
            id="email"
            name="email"
            type="text"
            className="p-2 mb-2 text-black border-b-2 border-black outline-none focus:bg-gray-300"
            required
            maxLength="100"
            onChange={handleChange}
            value={user.email}
          />
        </div>
        <div>
          <label className="block mb-2 text-primary">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            className="p-2 mb-2 text-black border-b-2 border-black outline-none focus:bg-gray-300"
            required
            maxLength="100"
            onChange={handleChange}
            value={user.password}
          />
        </div>
        <input
          className="btn bg-teal-700 hover:bg-teal-900"
          type="submit"
          value="Login"
        />
      </form>
    </div>
  );
};

export default Login;
