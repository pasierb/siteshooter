"use client";

import { useForm, useFieldArray } from "react-hook-form";
import { useAuthKeys } from "@/lib/useAuthKey";
import { useSession } from "@/lib/useSession";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Cross2Icon, PlusIcon, CameraIcon } from "@radix-ui/react-icons";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScreenshotSizePreset, screenshotSizePresets } from "@/lib/sizePresets";

export const formSchema = z.object({
  url: z.string().min(11),
  removeEl: z.array(z.object({ id: z.number(), value: z.string() })),
  preset: z.string().optional(),
  scrollIntoView: z.string().optional(),
  invalidateCache: z.boolean().optional(),
});

interface ScreenshotFormProps {
  onPreview: (value: Promise<URL>) => void;
  onSubmit: (apiUrl: URL) => void;
  initialValues?: z.infer<typeof formSchema>;
}

export function ScreenshotForm(props: ScreenshotFormProps) {
  const { initialValues } = props;
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      url: initialValues?.url ?? "",
      preset: initialValues?.preset ?? ScreenshotSizePreset.browserWindow,
      removeEl: [],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "removeEl",
  });
  const authKeys = useAuthKeys();
  const { session } = useSession();

  function onSubmit(values: z.infer<typeof formSchema>) {
    const url = new URL("/api/shot", window.location.origin);

    url.searchParams.append("url", values.url);
    values.removeEl
      .map((el) => el.value.trim())
      .filter((value) => value.length > 0)
      .forEach((value) => {
        url.searchParams.append("removeEl", encodeURIComponent(value));
      });
    if (values.scrollIntoView && values.scrollIntoView.length > 0) {
      url.searchParams.append("scrollIntoView", values.scrollIntoView);
    }
    if (values.preset) {
      url.searchParams.append("preset", values.preset);
    }
    if (values.invalidateCache) {
      url.searchParams.append("invalidateCache", "1");
      form.setValue("invalidateCache", false);
    }

    // Use preview API key if previewing for not logged in users.
    url.searchParams.set(
      "key",
      authKeys[0]?.key ?? process.env.NEXT_PUBLIC_PREVIEW_API_KEY!
    );
    props.onPreview(fetch(url.toString()).then((res) => new URL(res.url)));

    if (!session) {
      url.searchParams.set("key", "YOUR_API_KEY");
    }
    // TODO: Use the first API key for now.
    // Remove `invalidateCache` param to prevent accidental cache invalidation.
    url.searchParams.delete("invalidateCache");
    props.onSubmit(new URL(url.toString()));
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Playground</CardTitle>
          </CardHeader>
          <CardContent>
            <FormField
              control={form.control}
              name="url"
              render={({ field }) => (
                <FormItem className="my-8">
                  <FormLabel>URL</FormLabel>
                  <FormControl>
                    <Input
                      required
                      placeholder="https://..."
                      type="url"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    URL of the page you want to screenshot.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="preset"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Size preset</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a verified email to display" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Object.keys(ScreenshotSizePreset).map((key) => (
                        <SelectItem key={key} value={key}>
                          {key} (
                          {
                            screenshotSizePresets[key as ScreenshotSizePreset]
                              .width
                          }
                          x
                          {
                            screenshotSizePresets[key as ScreenshotSizePreset]
                              .height
                          }
                          )
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription></FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="scrollIntoView"
              render={({ field }) => (
                <FormItem className="my-8">
                  <FormLabel>Scroll into view (optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. main" {...field} />
                  </FormControl>
                  <FormDescription>
                    CSS Selector of the element you want to scroll into view.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <fieldset>
              <FormLabel>Remove element (optional)</FormLabel>
              <FormDescription>
                CSS Selector of the element you want to remove
              </FormDescription>

              {fields.map((field, i) => (
                <div className="py-2" key={field.id}>
                  <FormField
                    control={form.control}
                    name="removeEl"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex gap-2">
                          <FormControl>
                            <Input
                              placeholder="e.g. .cookie-banner"
                              {...form.register(`removeEl.${i}.value`)}
                            />
                          </FormControl>
                          <Button
                            variant="ghost"
                            type="button"
                            onClick={() => remove(i)}
                          >
                            <Cross2Icon />
                          </Button>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              ))}

              <Button
                variant="outline"
                role="button"
                onClick={() => append({ id: 1, value: "" })}
              >
                <PlusIcon />
              </Button>
            </fieldset>

            <FormField
              control={form.control}
              name="invalidateCache"
              render={({ field }) => (
                <FormItem className="my-8 flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Invalidate cache</FormLabel>
                    <FormDescription>
                      Force a fresh screenshot by invalidating the cache.
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <Button type="submit" className="flex gap-2">
              <CameraIcon />
              Preview
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}
