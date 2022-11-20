import styled from "styled-components";
import { PriceData } from "./Coin";

const PriceInfoContainer = styled.div`
  text-align: center;
  font-size: 18px;
  font-weight: 800;
  margin-bottom: 50px;
  margin-top: 40px;
  background: #0be881;
  background: linear-gradient(to right, #0be881 28%, #0fbcf9 80%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const PirceInfoDetail = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  align-items: center;
  gap: 20px;
`;

const PriceAgo = styled.div`
  text-align: center;
  font-weight: 400;
  font-size: 14px;
  border-bottom: 1px solid #7a7a7a;
  padding: 5px;
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }

    to {
      opacity: 5;
      transform: none;
    }
  }
  animation: fadeIn 0.5s ease-in-out;
`;

function Price({ tickersData }: { tickersData: PriceData }) {
  return (
    <>
      <PriceInfoContainer>
        <div>Price Change Informaton</div>
      </PriceInfoContainer>
      <PirceInfoDetail>
        <PriceAgo>
          30 Minutes Ago: {tickersData.quotes.USD.percent_change_30m}%
        </PriceAgo>
        <PriceAgo>
          1 Hours Ago: {tickersData.quotes.USD.percent_change_1h}%
        </PriceAgo>
        <PriceAgo>
          6 Hours Ago: {tickersData.quotes.USD.percent_change_1h}%
        </PriceAgo>
        <PriceAgo>
          12 Hours Ago: {tickersData.quotes.USD.percent_change_12h}%
        </PriceAgo>
        <PriceAgo>
          24 Hours Ago: {tickersData.quotes.USD.percent_change_24h}%
        </PriceAgo>
        <PriceAgo>
          7 Days Ago: {tickersData.quotes.USD.percent_change_7d}%
        </PriceAgo>
        <PriceAgo>
          30 Days Ago: {tickersData.quotes.USD.percent_change_30d}%
        </PriceAgo>
        <PriceAgo>
          1 Years Ago: {tickersData.quotes.USD.percent_change_1y}%
        </PriceAgo>
      </PirceInfoDetail>
    </>
  );
}

export default Price;
