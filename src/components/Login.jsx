import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { PROXY_URL } from "../utils/constants";
import Spinner from "./Spinner";

const Login = () => {
  const [username, setUsername] = useState("adityanagare");
  const [password, setPassword] = useState("adityanagare");
  const [loading, setloading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const getMe = async () => {
      const response = await fetch(`${PROXY_URL}/api/user/me`, {
        credentials: "include",
      });
      const data = await response.json();
      // console.log(data);

      if (!data.error) {
        navigate("/");
      }
    };
    getMe();
  }, [navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!username && !password) {
      toast("Please fill all fields !");
      return;
    }

    const data = {
      username,
      password,
    };

    try {
      setloading(true);
      const response = await fetch(`${PROXY_URL}/api/user/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(data),
      });

      const responseData = await response.json();

      if (responseData.error) {
        setloading(false);
        toast(responseData.error);
        return;
      }

      if (response.ok) {
        setloading(false);
        toast(responseData.message);
        navigate("/");
      }
      // console.log(responseData);
    } catch (error) {
      console.error("Error:", error); // Handle errors
    }
  };

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div className="p-10 text-black">
          <h1 className="mb-8 font-extrabold text-4xl text-white">Login</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-screen">
            <form
              onSubmit={handleSubmit}
              method="post"
              encType="multipart/form-data"
            >
              <div>
                <label
                  className="block text-white font-semibold"
                  htmlFor="username"
                >
                  Username
                </label>
                <input
                  className="w-full shadow-inner bg-gray-100 rounded-lg placeholder-black text-2xl p-4 border-none block mt-1"
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                  name="username"
                  required="required"
                  autoFocus="autofocus"
                />
              </div>

              <div className="mt-4">
                <label
                  className="block text-white font-semibold"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  className="w-full shadow-inner bg-gray-100 rounded-lg placeholder-black text-2xl p-4 border-none block mt-1"
                  id="password"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  value={password}
                  type="password"
                  name="password"
                  required="required"
                  autoComplete="new-password"
                />
              </div>

              <div className="flex items-center justify-between mt-8">
                <button
                  type="submit"
                  className="flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"
                >
                  Login
                </button>
                <Link
                  to="/signup"
                  className="font-semibold cursor-pointer text-white"
                >
                  New User ? Signup Here
                </Link>
              </div>
            </form>

            <aside className="">
              <div className="bg-gray-100 text-black p-8 rounded">
                <h2 className="font-bold text-2xl">Instructions</h2>
                <ul className="list-disc mt-4 list-inside">
                  <li>
                    All users must provide a valid email address and password to
                    Login.
                  </li>
                </ul>
              </div>
            </aside>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
