"use client";

import { useState, PropsWithChildren } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Button } from "@/components/ui/button";
import { ClipboardCopyIcon, CheckIcon } from "@radix-ui/react-icons";

interface CopyButtonProps {
  textToCopy: string;
}

export function CopyButton(props: PropsWithChildren<CopyButtonProps>) {
  const { textToCopy } = props;
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = (text: string, result: boolean) => {
    setIsCopied(result);
  };

  return (
    <CopyToClipboard text={textToCopy} onCopy={handleCopy}>
      <Button variant="ghost" size="sm" className="flex gap-2">
        {isCopied ? (
          <CheckIcon className="w-4 h-4" />
        ) : (
          <ClipboardCopyIcon className="w-4 h-4" />
        )}
        <span className="text-sm">Copy</span>
      </Button>
    </CopyToClipboard>
  );
}
