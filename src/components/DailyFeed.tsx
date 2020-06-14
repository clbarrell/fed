import React from "react";
import Activity from "./Activity";

export type DailyFeedProps = {
  feeds: { timestamp: number; activityType: string; mainSide?: string; sinceLastFeed?: number }[];
};
export const DailyFeed: React.FC<DailyFeedProps> = ({ feeds }: DailyFeedProps) => {
  if (feeds.length > 1) {
    for (let i = 1; i < feeds.length; i++) {
      const msSince = feeds[i - 1].timestamp - feeds[i].timestamp;
      feeds[i - 1].sinceLastFeed = msSince;
    }
  }

  const activities = feeds.map((f) => (
    <Activity
      timestamp={f.timestamp}
      mainSide={f.mainSide}
      activityType={f.activityType}
      key={f.timestamp}
      sinceLastFeed={f.sinceLastFeed}
    />
  ));

  return <div className="mt-8 max-w-lg mx-auto">{activities}</div>;
};

export default DailyFeed;
