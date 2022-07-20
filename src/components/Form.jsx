import { useState, useEffect } from "react";
import styled from "@emotion/styled";
import Error from "./Error";
import useSelectCurrencies from "../hooks/useSelectCurrencies";
import { currencies } from "../data/currencies";

const InputSubmit = styled.input`
  background-color: #9497ff;
  border: none;
  width: 100%;
  padding: 10px;
  color: #fff;
  font-weight: 700;
  text-transform: uppercase;
  font-size: 20px;
  border-radius: 5px;
  transition: background-color 0.3s ease;
  margin-top: 30px;
  &:hover {
    background-color: #7a7dfe;
    cursor: pointer;
  }
`;

const Form = ({ setCurrencies }) => {
  const [cryptos, setCryptos] = useState([]);
  const [error, setError] = useState(false);
  const [currency, SelectCurrency] = useSelectCurrencies(
    "Choose your Currency",
    currencies
  );
  const [cryptocurrency, SelectCriptomoneda] = useSelectCurrencies(
    "Choose your Cryptocurrency",
    cryptos
  );

  useEffect(() => {
    const queryAPI = async () => {
      const url =
        "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=20&tsym=USD";
      const response = await fetch(url);
      const result = await response.json();

      const arrayCryptos = result.Data.map((crypto) => {
        const returnObject = {
          id: crypto.CoinInfo.Name,
          name: crypto.CoinInfo.FullName,
        };

        return returnObject;
      });

      setCryptos(arrayCryptos);
    };

    queryAPI();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if ([currency, cryptocurrency].includes("")) {
      setError(true);
      return;
    }
    setError(false);
    setCurrencies({
      currency,
      cryptocurrency,
    });
  };

  return (
    <>
      {error && <Error>All fields are required</Error>}
      <form onSubmit={handleSubmit}>
        <SelectCurrency />
        <SelectCriptomoneda />
        <InputSubmit type="submit" value="Search" />
      </form>
    </>
  );
};

export default Form;
