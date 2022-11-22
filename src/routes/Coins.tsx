import styled from "styled-components";
import { Link } from "react-router-dom";
// import { useState, useEffect } from "react";
import { useQuery } from "react-query";
import { fetchCoins } from "../api";
import { Helmet } from "react-helmet";
import { isDarkAtom } from "../atoms";
import { useSetRecoilState, useRecoilValue } from "recoil";

const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
`;

const Header = styled.header`
  height: 20vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
  margin-bottom: 20px;
`;

const Desc = styled.p`
  margin-top: 20px;
  color: ${props => props.theme.listTextColor};
  font-size: 13px;
`;

const CoinsList = styled.ul``;

const Coin = styled.li`
  background-color: ${props => props.theme.cardBgColor};
  color: ${props => props.theme.listTextColor};
  border-radius: 15px;
  margin-bottom: 10px;
  border: 1px solid white;
  a {
    display: flex;
    align-items: center;
    padding: 20px;
    transition: color 0.2s ease-in;
  }
  &:hover {
    a {
      color: #f15353;
    }
  }
`;

const ToggleBtn = styled.p`
  position: absolute;
  top: 30px;
  left: 30px;
  width: 40px;
  height: 40px;
  font-size: 25px;
  background-color: #e4e6ed;
  border-radius: 50%;
  a {
    position: absolute;
    top: 5px;
    left: 3px;
  }
`;

const Title = styled.h1`
  color: ${props => props.theme.accentColor};
  font-size: 50px;
  font-weight: bold;
`;

const Loader = styled.div`
  text-align: center;
  color: ${props => props.theme.listTextColor};
`;

const Img = styled.img`
  width: 35px;
  height: 35px;
  margin-right: 10px;
`;

interface ICoin {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}

function Coins() {
  const isDark = useRecoilValue(isDarkAtom);
  const setDarkAtom = useSetRecoilState(isDarkAtom);
  const toggleDarkAtom = () => setDarkAtom(prev => !prev);
  const { isLoading, data } = useQuery<ICoin[]>(["allCoins"], fetchCoins);
  /* react query 사용 전 코드 
  const [coins, setCoins] = useState<ICoin[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    (async () => {
      const response = await fetch("https://api.coinpaprika.com/v1/coins");
      const json = await response.json();
      setCoins(json.slice(0, 100));
      setLoading(false);
    })();
  }, []); */
  return (
    <>
      {isDark ? (
        <ToggleBtn onClick={toggleDarkAtom}>
          <Link to="/">☀️</Link>
        </ToggleBtn>
      ) : (
        <ToggleBtn onClick={toggleDarkAtom}>
          <Link to="/">🌙</Link>
        </ToggleBtn>
      )}

      <Container>
        <Helmet>
          {/* react-helmet 사용 */}
          <title>Crypto Tracker</title>
        </Helmet>
        <Header>
          <Title>🪙Crypto Tracker</Title>
          <Desc>Choose your coin out of a total of 100 cryptocurrencies!</Desc>
        </Header>
        {isLoading ? (
          <Loader>Loading...</Loader>
        ) : (
          <CoinsList>
            {data?.slice(0, 100).map(coin => (
              <Coin key={coin.id}>
                <Link to={`/${coin.id}`} state={coin}>
                  <Img
                    src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`}
                  />
                  {coin.name} &rarr;
                </Link>
              </Coin>
            ))}
          </CoinsList>
        )}
      </Container>
    </>
  );
}
export default Coins;
