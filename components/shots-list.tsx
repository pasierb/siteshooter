"use client";

import type { Database } from "@/types/supabase";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent } from "@/components/ui/dialog";

type Shot = Database["public"]["Tables"]["shots"]["Row"];

function shotDimmensions(shot: Shot) {
  const config = shot.config as any;
  return `${config.width} x ${config.height}`;
}

export function ShotsList() {
  const [shots, setShots] = useState<Shot[]>([]);
  const [selectedShot, setSelectedShot] = useState<Shot | null>(null);
  const [open, setOpen] = useState(false);

  const handleSelectedShot = (shot: Shot) => {
    setSelectedShot(shot);
    setOpen(true);
  };

  useEffect(() => {
    supabase
      .from("shots")
      .select("*")
      .order("updated_at", { ascending: false })
      .limit(50)
      .then(({ data }) => setShots(data as unknown as Shot[]));
  }, [setShots]);

  return (
    <>
      <ul
        role="list"
        className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8"
      >
        {shots.map((shot) => (
          <li key={shot.id} className="relative">
            <div className="group aspect-h-7 aspect-w-10 block w-full overflow-hidden rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 focus-within:ring-offset-gray-100">
              <div className="h-40">
                <div
                  role="button"
                  onClick={() => handleSelectedShot(shot)}
                  style={{ backgroundImage: `url(${shot.image_url})` }}
                  className="h-full w-full bg-contain bg-center bg-no-repeat"
                ></div>
              </div>
            </div>
            <div>
              <Badge variant="secondary">{shotDimmensions(shot)}</Badge>
            </div>
          </li>
        ))}
      </ul>

      <Dialog onOpenChange={setOpen} open={open}>
        <DialogContent className="max-h-full max-w-full overflow-y-auto">
          <img src={selectedShot?.image_url} alt="Preview" />
        </DialogContent>
      </Dialog>
    </>
  );
}
