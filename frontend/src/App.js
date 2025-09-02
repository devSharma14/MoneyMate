import React, { useState, useMemo, useEffect } from 'react';
import styled from "styled-components";
import bg from './img/bg.png';
import { MainLayout } from './styles/Layouts';
import Orb from './Components/Orb/Orb';
import Navigation from './Components/Navigation/Navigation';
import Dashboard from './Components/Dashboard/Dashboard';
import Income from './Components/Income/Income';
import Expenses from './Components/Expenses/Expenses';
import { useGlobalContext } from './context/globalContext';
import HomePage from './Components/HomePage';

function App() {
  const [active, setActive] = useState(1);
  const [userName, setUserName] = useState(""); 
  const global = useGlobalContext();
  console.log(global);

  const displayData = () => {
    switch(active){
      case 1:
        return <Dashboard />;
      case 2:
        return <Dashboard />;
      case 3:
        return <Income />;
      case 4: 
        return <Expenses />;
      default: 
        return <Dashboard />;
    }
  };

  const orbMemo = useMemo(() => <Orb />, []);

  // BACK BUTTON HANDLER
  useEffect(() => {
    const handleBackButton = (e) => {
      e.preventDefault();
      // Instead of leaving the page, go back to home page
      setUserName(""); 
      window.history.pushState(null, null, window.location.pathname); // reset history
    };

    window.history.pushState(null, null, window.location.pathname); // initial push
    window.addEventListener("popstate", handleBackButton);

    return () => {
      window.removeEventListener("popstate", handleBackButton);
    };
  }, []);

  // If userName is empty, show HomePage
  if (!userName) {
    return <HomePage onStart={setUserName} />;
  }

  return (
    <AppStyled bg={bg} className="App">
      {orbMemo}
      <MainLayout>
        <Navigation active={active} setActive={setActive} userName={userName} /> {/* pass name as prop */}
        <main>
          {displayData()}
        </main>
      </MainLayout>
    </AppStyled>
  );
}

const AppStyled = styled.div`
  height: 100vh;
  background-image: url(${props => props.bg});
  position: relative;
  main{
    flex: 1;
    background: rgba(252, 246, 249, 0.78);
    border: 3px solid #FFFFFF;
    backdrop-filter: blur(4.5px);
    border-radius: 32px;
    overflow-x: hidden;
    &::-webkit-scrollbar{
      width: 0;
    }
  }
`;

export default App;
