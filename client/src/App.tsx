import { useLottie } from "lottie-react";
import { useEffect, useState } from "react";
import loader from "./assets/lotties/handLoading.json";
import newLottiePath from "./assets/lotties/2cvmhlpVau.lottie";

import "./App.css";
import {
  Export,
  Filter,
  Github,
  GitPR,
  Shield,
  Team,
  X,
  Docs,
} from "./components/icons";
import { PBIcon, PBLogo, PBLogoWhite } from "./components/brand";
import { Chart, ChatsCircle, Clock, Copyright, Timer } from "./components/ui";

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
      <div className="mb-10">
        <h1 className="text-blue-600">PR Board</h1>
        <div className="size-96 border m-5 rounded-3xl">
          <div className=" p-2">{View1}</div>
          {newLottieData && <div className="border p-2">{View2}</div>}
          <div className="flex my-5 gap-1 w-full">
            <Github width={24} height={24} fill="#ffd700" />
            <GitPR width={24} height={24} fill="#fff" />
            <Filter width={24} height={24} fill="#fff" color="#fff" />
            <Timer width={24} height={24} fill="#fff" />
            <Clock width={24} height={24} fill="#fff" />
            <Copyright width={24} height={24} fill="#fff" />
            <Team width={24} height={24} fill="#fff" />
            <Chart width={24} height={24} fill="#fff" />
            <ChatsCircle width={24} height={24} fill="#fff" />
            <Shield width={24} height={24} fill="#fff" />
            <X width={24} height={24} fill="#fff" />
            <Export width={24} height={24} fill="#fff" />
            <Docs width={24} height={24} fill="#fff" />
            <PBIcon width={24} height={24} />
          </div>
          <section className="flex flex-col gap-4 my-8">
            <div className="border">
              <PBLogo fill="#ffd700" />
            </div>
            <div className="border">
              <PBLogoWhite />
            </div>
          </section>
        </div>
      </div>
    </>
  );
}

export default App;
