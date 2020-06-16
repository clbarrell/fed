import React, { useState } from "react";
import Header from "./components/header";
import ActionInfo from "./components/ActionInfo";
import "./assets/main.css";
import DailyFeed from "./components/DailyFeed";
import data from "./testData.json";
import NewActivityModal from "./components/NewActivityModal";

export const App: React.FC = () => {
  // Set active baby here
  // Feed takes care of displaying all the stuff
  const userID = data.userId;
  const babyName = data.babyName;
  const [activities, setactivities] = useState(data.activities);
  const [lastFeed, setLastFeed] = useState(data.lastFeed);
  const [newActivity, setNewActivity] = useState(false);

  const saveNewFeed = (timestamp: number, activityType: string, mainSide: string) => {
    const nf = {
      timestamp: timestamp,
      activityType: activityType,
      mainSide: mainSide,
      id: Date.now(),
    };
    const oldList = activities.slice();
    oldList.splice(0, 0, nf);
    setactivities(oldList);
    setLastFeed(nf);
    toggleNewActivity();
  };

  const deleteActivity = (id: number) => {
    setactivities(activities.filter((a) => a.id !== id));
  };

  const toggleNewActivity = () => {
    setNewActivity(!newActivity);
  };

  const otherSide = {
    left: "right",
    right: "left",
  };

  return (
    <div className="font-sans">
      <Header babyName={babyName} />
      {!newActivity ? (
        <>
          <ActionInfo userId={userID} newFeed={toggleNewActivity} lastFeed={lastFeed} />
          <DailyFeed feeds={activities} deleteActivity={deleteActivity} />
        </>
      ) : (
        <NewActivityModal
          newFeed={saveNewFeed}
          cancel={toggleNewActivity}
          defaultMainSide={otherSide[lastFeed.mainSide]}
        />
      )}
    </div>
  );
};

export default App;
