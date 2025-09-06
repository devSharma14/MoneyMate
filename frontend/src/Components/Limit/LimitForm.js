import React, { useState } from "react";
import styled from "styled-components";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useGlobalContext } from "../../context/globalContext";
import Button from "../Button/Button";
import { plus } from "../../utils/Icons";
import { toast } from "react-toastify";

function LimitForm() {
  const { addLimit } = useGlobalContext();
  const [inputState, setInputState] = useState({ date: new Date(), amount: "" });
  const { date, amount } = inputState;

  const handleInput = (name) => (e) => {
    setInputState({ ...inputState, [name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!amount || isNaN(amount)) {
      toast.error("Please enter a valid amount");
      return;
    }

    addLimit(inputState);
    setInputState({ date: new Date(), amount: "" });
    toast.success("Limit Added Successfully");
  };

  return (
    <LimitFormStyled onSubmit={handleSubmit}>
      <div className="input-control">
        <DatePicker
          id="date"
          placeholderText="Enter A Date"
          selected={date}
          dateFormat="dd/MM/yyyy"
          onChange={(date) => setInputState({ ...inputState, date })}
        />
      </div>

      <div className="input-control">
        <input
          value={amount}
          type="text"
          name="amount"
          placeholder="Add Limit"
          onChange={handleInput("amount")}
        />
      </div>

      <div className="submit-btn">
        <Button
          type="submit"
          name="Add Limit"
          icon={plus}
          bPad=".8rem 1.6rem"
          bRad="30px"
          bg="var(--color-accent)"
          color="#fff"
        />
      </div>
    </LimitFormStyled>
  );
}

const LimitFormStyled = styled.form`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  input, textarea, select {
    font-family: inherit;
    font-size: inherit;
    outline: none;
    border: none;
    padding: .5rem 1rem;
    border-radius: 5px;
    border: 2px solid #fff;
    background: transparent;
    resize: none;
    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
    color: rgba(34, 34, 96, 0.9);
    &::placeholder {
      color: rgba(34, 34, 96, 0.4);
    }
  }
  .input-control {
    input {
      width: 100%;
    }
  }

  .submit-btn {
    button {
      box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
      &:hover {
        background: var(--color-green) !important;
      }
    }
  }
`;

export default LimitForm;
