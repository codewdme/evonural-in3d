"use client";
import { Suspense } from "react";
import PromptForm from "@/components/PromptForm";
import SceneViewer from "@/components/SceneViewer";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

function SceneView() {
  const params = useSearchParams();
  const img = params.get("img_url") || "";
  const style_id = params.get("styleId") || "";
  const [mainImg, setMainImg] = useState("");
  useEffect(() => {
    setMainImg(img);
  }, [img]);

  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <SceneViewer imageUrl={mainImg} />
      </Suspense>
      <PromptForm styleId={style_id} />
    </div>
  );
}

export default SceneView;
