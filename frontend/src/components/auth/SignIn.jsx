import { useEffect, useState } from "react";
import { API_URL } from "../../config";
import LoaderIcon from "../utils/LoaderIcon";

export default function SignIn({ setUser, goToSignUp }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isPageLoading, setIsPageLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      async function fetchUser() {
        setIsPageLoading(true);
        const response = await fetch(`${API_URL}/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        setUser(data);
        setIsPageLoading(false);
      }
      fetchUser();
    }
  }, []);

  function handleSubmit(e) {
    e.preventDefault();

    try {
      async function signInUser() {
        setIsLoading(true);
        const response = await fetch(`${API_URL}/signin`, {
          headers: { "Content-type": "application/json" },
          method: "POST",
          body: JSON.stringify({ email, password }),
        });
        const data = await response.json();
        if (data.status === "success") {
          setUser(data.user);
          localStorage.setItem("token", data.token);
        } else setErrMsg("Wrong email or password");
        setIsLoading(false);
      }

      signInUser();
    } catch (err) {
      setErrMsg("Failed to sign in");
    }
  }

  if (isPageLoading)
    return (
      <div className="h-screen w-screen flex items-center justify-center text-blue-600">
        <LoaderIcon className="h-16 w-16 animate-spin" />
      </div>
    );

  return (
    <div>
      <h2 className="text-3xl text-center text-blue-500 font-light mb-4">
        Sign in to you account
      </h2>

      <form
        onSubmit={handleSubmit}
        className="p-8 mx-4 bg-blue-50 rounded-lg max-w-md"
      >
        <input
          onChange={(e) => setEmail(e.target.value.trim())}
          value={email}
          type="email"
          placeholder="email"
          className="w-full border border-blue-200 rounded py-1 px-2 text-lg focus:outline-none focus:border-blue-400"
          required
        />
        <input
          onChange={(e) => setPassword(e.target.value.trim())}
          value={password}
          type="password"
          placeholder="password"
          className="w-full border border-blue-200 rounded py-1 px-2 text-lg focus:outline-none focus:border-blue-400 mt-2"
          required
        />
        <button className="w-full bg-blue-500 text-white rounded mt-4 py-2 flex justify-center">
          {isLoading ? (
            <LoaderIcon className="h-6 w-6 animate-spin" />
          ) : (
            "Sign In"
          )}
        </button>

        {errMsg && (
          <p className="text-center text-red-600 mt-4 -mb-4">{errMsg}</p>
        )}
      </form>

      <p className="text-center mt-4 text-gray-600">
        Does not have a account?
        <button
          onClick={goToSignUp}
          className="text-blue-500 underline underline-offset-4 ml-2"
        >
          go to sign up
        </button>
      </p>
    </div>
  );
}
