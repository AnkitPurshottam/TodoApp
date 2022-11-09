import { useEffect, useState } from "react";
import Auth from "./views/Auth";
import Dashboard from "./views/Dashboard";

export default function App() {
  const [user, setUser] = useState(null);

  return (
    <div className="w-screen h-screen">
      {user ? <Dashboard user={user} setUser={setUser} /> : <Auth setUser={setUser} />}
    </div>
  );
}
