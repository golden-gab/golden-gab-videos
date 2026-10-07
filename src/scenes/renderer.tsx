import React from "react";

import { resolveSceneComponent, type SceneRendererProps } from "./registry";

export const SceneRenderer: React.FC<SceneRendererProps> = ({
  scene,
  tone,
  style,
  className,
}) => {
  const SceneComponent = resolveSceneComponent(scene);

  return (
    <SceneComponent
      scene={scene}
      tone={tone}
      style={style}
      className={className}
    />
  );
};
