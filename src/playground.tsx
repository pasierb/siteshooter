"use client";

import { useState } from "react";
import { ScreenshotForm } from "./screenshot-form";
import { ImageIcon } from "@radix-ui/react-icons";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const Playground = () => {
  const [previewUrl, setPreviewUrl] = useState<URL | null>(null);
  const [apiUrl, setApiUrl] = useState<URL | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [imageSize, setImageSize] = useState<[number, number] | null>(null);

  const handlePreview = (promise: Promise<URL>) => {
    setIsLoading(true);
    promise.then(setPreviewUrl).finally(() => setIsLoading(false));
  };
  const handleSubmit = (apiUrl: URL) => {
    setApiUrl(apiUrl);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-4">
      <div className="min-w-[33%]">
        <ScreenshotForm onSubmit={handleSubmit} onPreview={handlePreview} />
      </div>
      <div className="grow">
        <Card>
          <CardHeader>
            <CardTitle>Preview</CardTitle>
            <CardDescription>
              {apiUrl !== null && (
                <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
                  {apiUrl.toString()}
                </code>
              )}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            {imageSize && (
              <div>
                <span>Image size:</span>
                <Badge variant="secondary">
                  {imageSize[0]} x {imageSize[1]}
                </Badge>
              </div>
            )}

            {isLoading && <ImageIcon className="animate-bounce w-8 h-8" />}
            {!isLoading && previewUrl !== null && (
              <img
                className="border-2 border-dashed"
                onLoad={(e) => {
                  setImageSize([
                    e.currentTarget.naturalWidth,
                    e.currentTarget.naturalHeight,
                  ]);
                }}
                src={previewUrl!.toString()}
                alt="Screenshot preview"
              />
            )}
          </CardContent>
        </Card>
      </div>

      <div></div>
    </div>
  );
};
