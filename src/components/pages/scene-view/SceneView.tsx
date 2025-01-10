"use client";
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
      <SceneViewer imageUrl={mainImg} />
      <PromptForm styleId={style_id} />
    </div>
  );
}

export default SceneView;
