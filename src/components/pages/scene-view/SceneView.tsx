"use client";
import PromptForm from "@/components/PromptForm";
import SceneViewer from "@/components/SceneViewer";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

function SceneView() {
  const params = useSearchParams();
  const img = params.get("img_url") || "";
  const [mainImg, setMainImg] = useState("");
  useEffect(() => {
    setMainImg(img);
  }, [img]);

  return (
    <div>
      <SceneViewer imageUrl={mainImg} />
      <PromptForm />
    </div>
  );
}

export default SceneView;
