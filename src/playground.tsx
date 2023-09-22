"use client";

import { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { ScreenshotForm } from "./screenshot-form";

export const Playground = () => {
  const [previewUrl, setPreviewUrl] = useState<URL | null>(null);
  const [apiUrl, setApiUrl] = useState<URL | null>(null);

  const handlePreview = (promise: Promise<URL>) => {
    promise.then(setPreviewUrl);
  };
  const handleSubmit = (apiUrl: URL) => {
    setApiUrl(apiUrl);
  };

  return (
    <div>
      <ScreenshotForm onSubmit={handleSubmit} onPreview={handlePreview} />

      {apiUrl !== null && (
        <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
          {apiUrl.toString()}
        </code>
      )}
      <div>
        {previewUrl ? (
          <img src={previewUrl.toString()} alt="Screenshot preview" />
        ) : (
          <Skeleton className="w-64 h-64" />
        )}
      </div>
    </div>
  );
};
