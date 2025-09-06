import React, { useEffect } from "react";
import styled from "styled-components";
import { InnerLayout } from "../../styles/Layouts";
import LimitForm from "./LimitForm";
import LimitItem from "./LimitItem";
import { useGlobalContext } from "../../context/globalContext";

function Limits() {
  const { limits, getLimits, totalLimit, todayLimitLeft } = useGlobalContext();

  useEffect(() => {
    getLimits(); // fetch from backend on mount
  }, []);

  const todayLimit = totalLimit();
  const todayRemaining = todayLimitLeft();

  return (
    <LimitStyled>
      <InnerLayout>
        <h1>Limits</h1>
        <h2 className="limitContent">
          Today's Limit Set: <span>${todayLimit}</span>
        </h2>
        <h2 className="limitContent">
          Today's Limit Left: <span>${todayRemaining}</span>
        </h2>
        <div className="formContainer">
          <LimitForm />
        </div>
      </InnerLayout>
    </LimitStyled>
  );
}

const LimitStyled = styled.div`
  .limitContent {
    display: flex;
    justify-content: center;
    align-items: center;
    background: #fcf6f9;
    border-radius: 20px;
    padding: 1rem;
    margin: 1rem 0;
    span {
      color: var(--color-green);
      font-weight: 800;
    }
  }
  .formContainer {
    display: flex;
    gap: 2rem;
  }
  .lim {
    margin-top: 1rem;
  }
`;

export default Limits;
