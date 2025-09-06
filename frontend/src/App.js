import React, { useState, useMemo } from "react";
import styled from "styled-components";
import bg from "./img/bg.png";
import { MainLayout } from "./styles/Layouts";
import Orb from "./Components/Orb/Orb";
import Navigation from "./Components/Navigation/Navigation";
import Dashboard from "./Components/Dashboard/Dashboard";
import Income from "./Components/Income/Income";
import Expenses from "./Components/Expenses/Expenses";
import Limits from "./Components/Limit/Limit";
import HomePage from "./Components/HomePage";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";

function App() {
  // user state
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : ["", ""];
  });

  const [name, email] = user;
  const orbMemo = useMemo(() => <Orb />, []);

  return (
    <Router>
      <AppStyled bg={bg} className="App">
        {orbMemo}

        <Toaster position="top-right" reverseOrder={false}/>

        <Routes>
          {/* Homepage should always show at "/" */}
          <Route path="/" element={<HomePage onStart={setUser} />} />

          {/* Protected Dashboard Routes */}
          {name && email && (
            <Route
              path="/dashboard/*"
              element={
                <MainLayout>
                  <Navigation userName={name} email={email} />
                  <main>
                    <Routes>
                      <Route index element={<Dashboard />} />
                      <Route path="income" element={<Income />} />
                      <Route path="expenses" element={<Expenses />} />
                      <Route path="limits" element={<Limits />} />
                    </Routes>
                  </main>
                </MainLayout>
              }
            />
          )}

          {/* If not logged in and trying to access dashboard → redirect to home */}
          {!name || !email ? (
            <Route path="/dashboard/*" element={<Navigate to="/" replace />} />
          ) : null}
        </Routes>
      </AppStyled>
    </Router>
  );
}

const AppStyled = styled.div`
  height: 100vh;
  background-image: url(${(props) => props.bg});
  position: relative;
  main {
    flex: 1;
    background: rgba(252, 246, 249, 0.78);
    border: 3px solid #ffffff;
    backdrop-filter: blur(4.5px);
    border-radius: 32px;
    overflow-x: hidden;
    &::-webkit-scrollbar {
      width: 0;
    }
  }
`;

export default App;
