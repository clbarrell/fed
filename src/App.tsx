import React, { useState } from "react";
import Header from "./components/header";
import ActionInfo from "./components/ActionInfo";
import "./assets/main.css";
import DailyFeed from "./components/DailyFeed";
import data from "./testData.json";
import NewActivity from "./components/NewActivity";
import { ActivityType, days } from "./components/Activity";
import useLocalStorage from "./lib/useLocalStorage";
import SnackbarToast from "./components/SnackbarToast";
import * as serviceWorker from "./serviceWorker";

export const App: React.FC = () => {
  const babyName = data.babyName;
  const [activities, setactivities] = useLocalStorage("activities", []); // ActivityType[]
  const [lastFeed, setLastFeed] = useLocalStorage("lastFeed", null); // useState<ActivityType | null>(data.lastFeed);
  const [newActivity, setNewActivity] = useState(false);
  const [snackbarStatus, setSnackbarStatus] = useState<{
    open: boolean;
    message: string;
    messageType: "success" | "info" | "";
  }>({ open: false, message: "", messageType: "" });

  const onSWSuccess = () => {
    setSnackbarStatus({
      open: true,
      message: "This app is now available offline and can be installed.",
      messageType: "info",
    });
  };

  const onSWUpdate = () => {
    setSnackbarStatus({ open: true, message: "A new version of Fed is available and will be used when all tabs for this page are closed..", messageType: "info" });
  };

  // If you want your app to work offline and load faster, you can change
  // unregister() to register() below. Note this comes with some pitfalls.
  // Learn more about service workers: https://bit.ly/CRA-PWA
  serviceWorker.register({ onSuccess: onSWSuccess, onUpdate: onSWUpdate });

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
    setSnackbarStatus({ open: true, message: "New feed added", messageType: "success" });
  };

  const deleteActivity = (id: number) => {
    const deletedFeed = activities.filter((a: ActivityType) => a.id === id)[0].timestamp;
    const delFeedDate = new Date(deletedFeed);
    setactivities(activities.filter((a: ActivityType) => a.id !== id));
    console.log("deleting (ID)", id, "lastfeed:", lastFeed);
    if (lastFeed && lastFeed.id === id) {
      resetLastFeed();
    }
    setSnackbarStatus({
      open: true,
      message: `Feed deleted from ${days[delFeedDate.getDay()]} @ ${delFeedDate.toLocaleTimeString().substr(0, 5)}`,
      messageType: "success",
    });
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

  const handleClose = (event, reason) => {
    if (event) {
      event.preventDefault();
    }
    if (reason === "clickaway" && snackbarStatus.messageType === "info") {
      return;
    }
    setSnackbarStatus({ ...snackbarStatus, open: false });
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
        <NewActivity
          newFeed={saveNewFeed}
          cancel={toggleNewActivity}
          defaultMainSide={lastFeed ? otherSide[lastFeed.mainSide] : "left"}
        />
      )}
      <SnackbarToast
        isOpen={snackbarStatus.open}
        handleClose={handleClose}
        closeSnackbar={() => setSnackbarStatus({ ...snackbarStatus, open: false })}
        message={snackbarStatus.message}
        messageType={snackbarStatus.messageType}
      />
    </div>
  );
};

export default App;
