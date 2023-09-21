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

const formSchema = z.object({
  url: z.string().min(11),
  removeEl: z.array(z.object({ id: z.number(), value: z.string() })),
});

interface ScreenshotFormProps {
  onPreview: (value: Promise<URL>) => void;
  onSubmit: (apiUrl: URL) => void;
}

export function ScreenshotForm(props: ScreenshotFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      url: "https://",
      removeEl: [],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "removeEl",
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const url = new URL("/api/v1/screenshot", window.location.origin);

    url.searchParams.append("url", values.url);
    values.removeEl
      .map((el) => el.value.trim())
      .filter((value) => value.length > 0)
      .forEach((value) => {
        url.searchParams.append("removeEl", encodeURIComponent(value));
      });

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
                <Input placeholder="https://" {...field} />
              </FormControl>
              <FormDescription>
                URL of the page you want to screenshot.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <fieldset>
          <FormLabel>Remove element</FormLabel>
          <FormDescription>
            CSS Selector of the element you want to remove
          </FormDescription>

          {fields.map((field, i) => (
            <FormField
              key={field.id}
              control={form.control}
              name="removeEl"
              render={({ field }) => (
                <FormItem>
                  <div className="flex">
                    <FormControl>
                      <Input
                        placeholder=""
                        {...form.register(`removeEl.${i}.value`)}
                      />
                    </FormControl>
                    <Button type="button" onClick={() => remove(i)}>
                      Remove
                    </Button>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}

          <Button type="button" onClick={() => append({ id: 1, value: "" })}>
            Add
          </Button>
        </fieldset>

        <Button type="submit">Preview</Button>
      </form>
    </Form>
  );
}
