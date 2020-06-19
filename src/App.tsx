import React, { useState } from "react";
import Header from "./components/header";
import ActionInfo from "./components/ActionInfo";
import "./assets/main.css";
import DailyFeed from "./components/DailyFeed";
import data from "./testData.json";
import NewActivityModal from "./components/NewActivityModal";
import { ActivityType } from "./components/Activity";
import useLocalStorage from "./lib/useLocalStorage";

export const App: React.FC = () => {
  const babyName = data.babyName;
  const [activities, setactivities] = useLocalStorage("activities", []); // ActivityType[]
  const [lastFeed, setLastFeed] = useLocalStorage("lastFeed", null); // useState<ActivityType | null>(data.lastFeed);
  const [newActivity, setNewActivity] = useState(false);

  const saveNewFeed = (timestamp: number, activityType: string, mainSide: string) => {
    const nf = {
      timestamp: timestamp,
      activityType: activityType,
      mainSide: mainSide,
      id: Date.now(),
    };

    const newList = activities.slice();

    if (activities.length === 0) {
      // console.log("Activity list empty so adding to start");
      newList.push(nf);
    } else if (nf.timestamp > activities[0].timestamp) {
      // console.log("Adding newfeed to start because it's timestamp is bigger than the first one");
      newList.splice(0, 0, nf);
    } else {
      // console.log("trying to find best spot for the new feed");
      let added = false;
      for (let i = 0; i < activities.length; i++) {
        const activity = activities[i];
        if (timestamp > activity.timestamp) {
          // console.log("adding new feed to index:", i);
          added = true;
          newList.splice(i, 0, nf);
          break;
        }
      }
      if (!added) {
        // Add newFeed to end if it hasn't been added yet
        newList.push(nf);
      }
    }
    setactivities(newList);
    resetLastFeed(nf);
    toggleNewActivity();
  };

  const deleteActivity = (id: number) => {
    setactivities(activities.filter((a) => a.id !== id));
    console.log("deleting (ID)", id, "lastfeed:", lastFeed);
    if (lastFeed && lastFeed.id === id) {
      resetLastFeed();
    }
  };

  const resetLastFeed = (activity?: ActivityType) => {
    console.log("resetting last feed");
    if (activity && ((lastFeed && activity.timestamp > lastFeed.timestamp) || lastFeed == null)) {
      console.log("...with given value");
      setLastFeed(activity);
    } else if (activity === undefined) {
      let feed: ActivityType | null = null;
      for (const a of activities) {
        if (a.activityType === "Feed" && ((lastFeed && a.id !== lastFeed.id) || lastFeed == null)) {
          console.log("found the first feed! ID:", a.id);
          feed = a;
          break;
        }
      }
      console.log("now seetting last feed after foor loop");
      setLastFeed(feed);
    }
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
          <ActionInfo newFeed={toggleNewActivity} lastFeed={lastFeed} />
          <DailyFeed feeds={activities} deleteActivity={deleteActivity} />
        </>
      ) : (
        <NewActivityModal
          newFeed={saveNewFeed}
          cancel={toggleNewActivity}
          defaultMainSide={lastFeed ? otherSide[lastFeed.mainSide] : "left"}
        />
      )}
    </div>
  );
};

export default App;
