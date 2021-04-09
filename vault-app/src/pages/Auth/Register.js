import React, { useState } from "react";

const Register = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    cellphone: "",
    isLandLordOrAgent: false,
    company: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(user);
  };

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleChangeAgent = (e) => {
    setUser({
      ...user,
      isLandLordOrAgent: user.isLandLordOrAgent ? false : true,
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-w-screen min-h-screen">
      <h2 className="xl:text-4xl text-2xl font-bold my-4">Register</h2>
      <form
        className="w-full flex flex-col items-center justify-center"
        onSubmit={handleSubmit}
      >
        <div>
          <label className="block mb-2 text-primary">Firstname</label>
          <input
            id="firstname"
            name="firstname"
            type="text"
            className="p-2 mb-2 text-black border-b-2 border-black outline-none focus:bg-gray-300"
            required
            maxLength="100"
            onChange={handleChange}
            value={user.firstname}
          />
        </div>
        <div>
          <label className="block mb-2 text-primary">Lastname</label>
          <input
            id="lastname"
            name="lastname"
            type="text"
            className="p-2 mb-2 text-black border-b-2 border-black outline-none focus:bg-gray-300"
            required
            maxLength="100"
            onChange={handleChange}
            value={user.lastname}
          />
        </div>
        <div>
          <label className="block mb-2 text-primary">Cellphone</label>
          <input
            id="cellphone"
            name="cellphone"
            type="text"
            className="p-2 mb-2 text-black border-b-2 border-black outline-none focus:bg-gray-300"
            required
            maxLength="100"
            onChange={handleChange}
            value={user.cellphone}
          />
        </div>
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
        <div className="my-2">
          <input
            className="m-1"
            type="checkbox"
            id="agent"
            name="agent"
            onChange={handleChangeAgent}
          />
          <label className="m-1" htmlFor="agent">
            ¿Are you a Landlord or professional agent?
          </label>
        </div>

        {user.isLandLordOrAgent ? (
          <div>
            <label className="block mb-2 text-primary">Company</label>
            <input
              id="company"
              name="company"
              type="text"
              className="p-2 mb-2 text-black border-b-2 border-black outline-none focus:bg-gray-300"
              required
              maxLength="100"
              onChange={handleChange}
              value={user.company}
            />
          </div>
        ) : null}
        <input
          className="btn bg-teal-700 hover:bg-teal-900 my-2"
          type="submit"
          value="Login"
        />
      </form>
    </div>
  );
};

export default Register;
