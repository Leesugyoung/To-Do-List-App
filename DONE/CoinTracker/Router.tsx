import { BrowserRouter, Routes, Route } from "react-router-dom";
import Coin from "../CoinTracker/routes/Coin";
import Coins from "../CoinTracker/routes/Coins";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        {/* nested route 으로 자식 route 는 상대경로로 작성한다. */}
        <Route path="/" element={<Coins />}></Route>
        <Route path="/:coinId" element={<Coin />}></Route>
        <Route path="/:coinId/*" element={<Coin />} />
        {/* 마지막에 /*를 적어 명시적으로 이 route의 내부에서 nested route가 render 될 수 있음을 표시하고,
        자식 route를 부모 route의 element 내부에 작성하는 방법 사용 */}
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
