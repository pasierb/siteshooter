"use client";

import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Cross2Icon, PlusIcon, CameraIcon } from "@radix-ui/react-icons";

const formSchema = z.object({
  url: z.string().min(11),
  removeEl: z.array(z.object({ id: z.number(), value: z.string() })),
  scrollIntoView: z.string().optional(),
});

interface ScreenshotFormProps {
  onPreview: (value: Promise<URL>) => void;
  onSubmit: (apiUrl: URL) => void;
}

export function ScreenshotForm(props: ScreenshotFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      url: "",
      removeEl: [],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "removeEl",
  });

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

    props.onSubmit(url);
    props.onPreview(fetch(url.toString()).then((res) => new URL(res.url)));
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>URL</FormLabel>
              <FormControl>
                <Input required placeholder="https://..." {...field} />
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
          name="scrollIntoView"
          render={({ field }) => (
            <FormItem>
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
                          placeholder=""
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

        <Button type="submit" className="flex gap-2">
          <CameraIcon />
          Preview
        </Button>
      </form>
    </Form>
  );
}
