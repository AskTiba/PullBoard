import { useLottie } from "lottie-react";
import { useEffect, useState } from "react";
import loader from "./assets/lotties/handLoading.json";
import newLottiePath from "./assets/lotties/2cvmhlpVau.lottie";

import "./App.css";

function App() {
  const [newLottieData, setNewLottieData] = useState(null);

  useEffect(() => {
    fetch(newLottiePath)
      .then((res) => res.json())
      .then((data) => setNewLottieData(data));
  }, []);

  const options1 = {
    animationData: loader,
    loop: true,
  };

  const options2 = {
    animationData: newLottieData,
    loop: true,
  };

  const { View: View1 } = useLottie(options1);
  const { View: View2 } = useLottie(options2);

  return (
    <>
      <div className="">
        <h1 className="text-blue-600">PR Board</h1>
        <div className="size-96 border m-5 rounded-3xl">
          <div className=" p-2">{View1}</div>
          {newLottieData && <div className="border p-2">{View2}</div>}
        </div>
      </div>
    </>
  );
}

export default App;
