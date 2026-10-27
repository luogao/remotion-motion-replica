import React from "react";
import { Composition } from "remotion";
import { MotionFaceStudy } from "./MotionFaceStudy";

export const Root: React.FC = () => (
  <Composition
    id="MotionFaceStudy"
    component={MotionFaceStudy}
    width={1080}
    height={1440}
    fps={30}
    durationInFrames={990}
  />
);
