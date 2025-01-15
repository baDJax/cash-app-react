import { profileSlice } from "@/features/profileData";
import { ProfileRootState } from "@/store/profileStore";
import React, { FormEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const RegisterForm: React.FC = () => {
  const dispatch = useDispatch();
  const { id, username, email, password } = useSelector(
    (state: ProfileRootState) => state.root
  );
  console.log("root :>> ", id, username, email, password);
  const [formData, setFormData] = useState({
    id: "",
    username: "",
    email: "",
    password: "",
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log("formData :>> ", formData);
    const action = profileSlice.actions.addProfile;
    console.log('action :>> ', action);
    const updatedFormData = {
      ...formData,
      id: Math.random().toString(36).substr(2, 9), // Using a random string for id
    };
    dispatch(action(updatedFormData));
  };

  return (
    <div className="w-fit">
      <form
        onSubmit={handleSubmit}
        action="GET"
        className="max-w-[400px] flex gap-4 flex-col w-full border border-white/15 py-5 m-4 px-4 rounded-md bg-[#131313]"
      >
        <h5 className="text-center text-2xl">Sign Up</h5>
        <input
          className="bg-transparent border border-white/15 p-3 px-5 rounded-md"
          type="text"
          name="username"
          onChange={handleInputChange}
          placeholder="Username"
        />
        <input
          className="bg-transparent border border-white/15 p-3 px-5 rounded-md"
          type="email"
          name="email"
          onChange={handleInputChange}
          placeholder="Email"
        />
        <input
          className="bg-transparent border border-white/15 p-3 px-5 rounded-md"
          type="password"
          name="password"
          onChange={handleInputChange}
          placeholder="Password"
        />
        <button
          className="w-full text-center px-4 py-3 bg-green-600 hover:bg-green-700 transition rounded-lg cursor-pointer"
          type="submit"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;
