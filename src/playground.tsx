"use client";

import { useState } from "react";
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

      {apiUrl !== null && <code>{apiUrl.toString()}</code>}

      {previewUrl && <img src={previewUrl.toString()} alt="Screenshot preview" />}
    </div>
  );
};
