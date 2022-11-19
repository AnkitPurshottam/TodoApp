import { useState } from "react";
import { API_URL } from "../../config";
import LoaderIcon from "../utils/LoaderIcon";

export default function SignUp({ setUser, goToSignin }) {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    try {
      async function signUpUser() {
        setIsLoading(true);
        if (password !== password2) {
          setErrMsg("Both passwords do not match!");
          return;
        }
        const response = await fetch(`${API_URL}/signup`, {
          headers: { "Content-type": "application/json" },
          method: "POST",
          body: JSON.stringify({ fname, lname, email, password }),
        });
        const data = await response.json();
        if (data.status === "success") {
          setUser(data.user);
          localStorage.setItem("token", data.token);
        } else setErrMsg("Wrong email or password");
        setIsLoading(false);
      }

      signUpUser();
    } catch (err) {
      setErrMsg("Failed to sign up");
    }
  }

  return (
    <div>
      <h2 className="text-3xl text-center text-blue-500 font-light mb-4">
        Create new account
      </h2>

      <form
        onSubmit={handleSubmit}
        className="p-8 mx-4 bg-blue-50 rounded-lg max-w-md"
      >
        <input
          onChange={(e) => setFname(e.target.value)}
          value={fname}
          type="text"
          placeholder="first name"
          className="w-full border border-blue-200 rounded py-1 px-2 text-lg focus:outline-none focus:border-blue-400"
          required
        />
        <input
          onChange={(e) => setLname(e.target.value)}
          value={lname}
          type="text"
          placeholder="last name"
          className="w-full border border-blue-200 rounded py-1 px-2 text-lg focus:outline-none focus:border-blue-400 mt-2"
          required
        />
        <input
          onChange={(e) => setEmail(e.target.value.trim())}
          value={email}
          type="email"
          placeholder="email"
          className="w-full border border-blue-200 rounded py-1 px-2 text-lg focus:outline-none focus:border-blue-400 mt-2"
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
        <input
          onChange={(e) => setPassword2(e.target.value.trim())}
          value={password2}
          type="password"
          placeholder="confirm password"
          className="w-full border border-blue-200 rounded py-1 px-2 text-lg focus:outline-none focus:border-blue-400 mt-2"
          required
        />
        <button className="w-full bg-blue-500 text-white rounded mt-4 py-2 flex justify-center">
          {isLoading ? (
            <LoaderIcon className="h-6 w-6 animate-spin" />
          ) : (
            "Sign Up"
          )}
        </button>

        {errMsg && (
          <p className="text-center text-red-600 mt-4 -mb-4">{errMsg}</p>
        )}
      </form>

      <p className="text-center mt-4 text-gray-600">
        Already have an account?
        <button
          onClick={goToSignin}
          className="text-blue-500 underline underline-offset-4 ml-2"
        >
          go to sign in
        </button>
      </p>
    </div>
  );
}
