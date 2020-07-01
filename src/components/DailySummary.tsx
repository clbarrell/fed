import React from "react";
import { ActivityType } from "./Activity";
import { format } from "date-fns";
import { destructMS } from "../lib/times";

const arrAvg = (arr) => arr.reduce((a, b) => a + b, 0) / arr.length;

export type DailySummaryProps = { activities: ActivityType[] };
export const DailySummary: React.FC<DailySummaryProps> = ({ activities }) => {
  const day = new Date(activities[0].timestamp);
  const feedCount = activities.filter((a) => a.activityType === "Feed").length;
  const feedString = activities.length > 1 ? "feeds" : "feed";
  let avgFeedGap;
  if (activities.length > 1) {
    const numArr = activities.slice(1).map((item, index) => Math.abs(item.timestamp - activities[index].timestamp));
    const msAvg = arrAvg(numArr);
    avgFeedGap = destructMS(msAvg);
  }
  return (
    <div className="text-indigo-600 text-center">
      <span className="font-semibold">{format(day, "cccc do")} </span>
      <span>
        ・ {feedCount} {feedString}
      </span>
      {activities.length > 1 && <p className="text-indigo-500 text-sm">Average gap between feeds: {avgFeedGap.h}h {avgFeedGap.m}m</p>}
    </div>
  );
};

export default DailySummary;
