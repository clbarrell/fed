import React from "react";
import Activity, { ActivityType } from "./Activity";
import { ReactComponent as Blob } from "../assets/blob.svg";
import styled from "styled-components";
import { isSameDay } from "date-fns";
import DailySummary from "./DailySummary";

const SvgWrapper = styled.div`
  height: 400px;
`;

export type DailyFeedProps = {
  feeds: ActivityType[];
  deleteActivity: (id: number) => void;
};

export const DailyFeed: React.FC<DailyFeedProps> = ({ feeds, deleteActivity }: DailyFeedProps) => {
  const activityList: any[] = [];

  if (feeds.length > 1) {
    // today
    const d = new Date(feeds[0].timestamp);
    activityList.push(<DailySummary activities={feeds.filter((f) => isSameDay(new Date(f.timestamp), d))} />);

    for (let i = 1; i < feeds.length; i++) {
      const msSince = feeds[i - 1].timestamp - feeds[i].timestamp;
      activityList.push(
        <Activity
          timestamp={feeds[i - 1].timestamp}
          mainSide={feeds[i - 1].mainSide}
          activityType={feeds[i - 1].activityType}
          key={feeds[i - 1].id}
          id={feeds[i - 1].id}
          sinceLastFeed={msSince}
          deleteActivity={deleteActivity}
        />
      );
      if (!isSameDay(new Date(feeds[i - 1].timestamp), new Date(feeds[i].timestamp))) {
        // add summary
        const d = new Date(feeds[i].timestamp);
        activityList.push(<DailySummary activities={feeds.filter((f) => isSameDay(new Date(f.timestamp), d))} />);
      }
    }
  }

  if (feeds.length > 0) {
    activityList.push(
      <Activity
        timestamp={feeds[feeds.length - 1].timestamp}
        mainSide={feeds[feeds.length - 1].mainSide}
        activityType={feeds[feeds.length - 1].activityType}
        key={feeds[feeds.length - 1].timestamp}
        id={feeds[feeds.length - 1].id}
        sinceLastFeed={undefined}
        deleteActivity={deleteActivity}
      />
    );
  }

  const emptyStateBlob = (
    <SvgWrapper className="mt-8 max-w-lg mx-auto relative flex items-center">
      <Blob />
      <div className="text-center max-w-xs mx-auto relative font-semibold text-xl text-white">
        <p>Record your feeds and easily see which boob is next</p>
        <p className="my-2">You have enough on your mind already, this doesn't need to be another.</p>
      </div>
    </SvgWrapper>
  );

  return <>{activityList.length > 0 ? <div className="mt-8 max-w-lg mx-auto">{activityList}</div> : emptyStateBlob}</>;
};

export default DailyFeed;
