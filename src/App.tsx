import React, { useState } from "react";
import Header from "./components/header";
import ActionInfo from "./components/ActionInfo";
import "./assets/main.css";
import DailyFeed from "./components/DailyFeed";
import data from "./testData.json";

export const App: React.FC = () => {
  // Set active baby here
  // Feed takes care of displaying all the stuff
  const userID = data.userId;
  const babyName = data.babyName;
  const [activities, setactivities] = useState(data.activities);
  const [lastFeed, setLastFeed] = useState(data.lastFeed);

  const newFeed = () => {
    console.log("New Feed!");
    const nf = {
      timestamp: Date.now(),
      activityType: "feed",
      mainSide: "left",
    };
    const oldList = activities.slice();
    oldList.splice(0, 0, nf);
    setactivities(oldList);
    setLastFeed(nf);
  };

  return (
    <div className="font-sans">
      <Header babyName={babyName} />
      <ActionInfo userId={userID} newFeed={newFeed} lastFeed={lastFeed} />
      <DailyFeed feeds={activities} />
    </div>
  );
};

export default App;
