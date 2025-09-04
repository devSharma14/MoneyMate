import React, { useEffect } from "react";
import styled from "styled-components";
import { InnerLayout } from "../../styles/Layouts";
import LimitForm from "./LimitForm";
import { useGlobalContext } from "../../context/globalContext";
import LimitItem from "./LimitItem";

function Limits() {
  const { limits, getLimits, totalLimit } = useGlobalContext();

  useEffect(() => {
    getLimits(); // Load existing limits on mount
  }, []);

  return (
    <LimitStyled>
      <InnerLayout>
        <h1>Limit</h1>
        <h2 className="limitContent">
          Today's Limit: <span>${totalLimit()}</span>
        </h2>

        <div className="formContainer">
          <LimitForm />
        </div>

        <div className="lim">
          {limits.map((item) => {
            const { _id, amount, date } = item;
            return (
              <LimitItem
                key={_id}
                id={_id}
                amount={amount}
                date={date}
                indicatorColor="var(--color-green)"
              />
            );
          })}
        </div>
      </InnerLayout>
    </LimitStyled>
  );
}

const LimitStyled = styled.div`
  display: flex;
  overflow: auto;
  .limitContent {
    display: flex;
    justify-content: center;
    align-items: center;
    background: #fcf6f9;
    border: 2px solid #ffffff;
    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
    border-radius: 20px;
    padding: 1rem;
    margin: 1rem 0;
    font-size: 2rem;
    gap: 0.5rem;
    span {
      font-size: 2.5rem;
      font-weight: 800;
      color: var(--color-green);
    }
  }

  .formContainer {
    display: flex;
    gap: 2rem;
    .lim {
      flex: 1;
    }
  }
`;

export default Limits;
