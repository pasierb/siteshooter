"use client";

import { useState, useRef, useEffect } from "react";
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
import { messagesGenerator } from "@/lib/loadingPhrases";
import { cn } from "@/lib/utils";

function LoadingIndicator(props: { interval?: number; className?: string }) {
  const { interval = 2000, className = "" } = props;
  const nextMessageRef = useRef(messagesGenerator());
  const [message, setMessage] = useState<string>(() =>
    nextMessageRef.current()
  );

  useEffect(() => {
    const intervalId = setInterval(() => {
      const nextMessage = nextMessageRef.current();

      setMessage(nextMessage);
    }, interval);

    return () => clearInterval(intervalId);
  }, [interval]);

  return (
    <div className={cn("flex items-center justify-center gap-2", className)}>
      <ImageIcon className="animate-bounce w-8 h-8" />
      <span className="text-base">{message}</span>
    </div>
  );
}

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
      <div className="grow h-full">
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

            {isLoading && (
              <div className="border-2 border-dashed">
                <LoadingIndicator className="my-12 mx-auto" interval={3000} />
              </div>
            )}
            {!isLoading && previewUrl === null && (
              <div className="border-2 border-dashed">
                <ImageIcon className="w-8 h-8 my-12 mx-auto" />
              </div>
            )}
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
