"use client";
import SceneView from "@/components/pages/scene-view/SceneView";

import React, { Suspense } from "react";

function page() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <SceneView />
      </Suspense>
    </div>
  );
}

export default page;
