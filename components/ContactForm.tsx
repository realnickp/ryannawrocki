"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { cn } from "@/lib/cn";

const schema = z.object({
  name: z.string().min(2, "Please enter your name."),
  email: z.string().email("Please enter a valid email."),
  phone: z.string().optional().or(z.literal("")),
  subject: z.string().min(2, "Please choose a subject."),
  interests: z.array(z.string()).optional(),
  message: z
    .string()
    .min(20, "Tell us a little more — at least 20 characters."),
});

type FormValues = z.infer<typeof schema>;

const subjects = [
  "Volunteer",
  "Order a yard sign",
  "Host a large sign",
  "Invite Ryan to an event",
  "Ask a question",
  "Media inquiry",
  "Contribution question",
  "Other",
];

const helpOptions = [
  "Display a yard sign",
  "Walk in a parade",
  "Assist at events",
  "Stuff envelopes",
  "Knock on doors",
  "Make phone calls",
];

export function ContactForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormValues>({ resolver: zodResolver(schema) });
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const onSubmit = async (data: FormValues) => {
    try {
      const ways = data.interests?.length
        ? `\n\nWays I'd like to help: ${data.interests.join(", ")}`
        : "";
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          message: `${data.message}${ways}`,
          topic: data.subject,
        }),
      });
      if (!res.ok) throw new Error("Bad response");
      setStatus("success");
      reset();
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="rounded-xl border border-brand-hairline bg-brand-paper2 p-8">
        <p className="eyebrow">Message Received</p>
        <p className="mt-4 font-display text-xl font-bold text-brand-navy">
          We&rsquo;ll be in touch.
        </p>
        <p className="mt-4 text-[15px] leading-relaxed text-brand-slate">
          The campaign team reviews messages within a few business days. For
          urgent matters, please call the campaign directly.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
      <Field label="Name" error={errors.name?.message}>
        <input
          type="text"
          autoComplete="name"
          {...register("name")}
          className={cn("form-input", errors.name && "form-input--error")}
        />
      </Field>
      <div className="grid gap-6 md:grid-cols-2">
        <Field label="Email" error={errors.email?.message}>
          <input
            type="email"
            autoComplete="email"
            {...register("email")}
            className={cn("form-input", errors.email && "form-input--error")}
          />
        </Field>
        <Field label="Phone (optional)" error={errors.phone?.message}>
          <input
            type="tel"
            autoComplete="tel"
            {...register("phone")}
            className={cn("form-input", errors.phone && "form-input--error")}
          />
        </Field>
      </div>
      <Field label="Subject" error={errors.subject?.message}>
        <select
          {...register("subject")}
          className={cn("form-select", errors.subject && "form-input--error")}
          defaultValue=""
        >
          <option value="" disabled>
            Choose one…
          </option>
          {subjects.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </Field>
      <fieldset>
        <span className="form-label">How would you like to help? (optional)</span>
        <div className="mt-2 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
          {helpOptions.map((opt) => (
            <label
              key={opt}
              className="flex cursor-pointer items-center gap-2.5 rounded-lg border border-brand-hairline bg-white px-3.5 py-2.5 text-[14px] text-brand-navy transition hover:border-brand-navy/40"
            >
              <input
                type="checkbox"
                value={opt}
                {...register("interests")}
                className="h-4 w-4 flex-shrink-0 accent-brand-maroon"
              />
              {opt}
            </label>
          ))}
        </div>
      </fieldset>

      <Field label="Message" error={errors.message?.message}>
        <textarea
          rows={7}
          {...register("message")}
          className={cn(
            "form-textarea",
            errors.message && "form-textarea--error",
          )}
        />
      </Field>

      {status === "error" ? (
        <p className="form-error">
          Something went wrong sending your message. Please try again or call
          the campaign.
        </p>
      ) : null}

      <button type="submit" disabled={isSubmitting} className="btn-maroon">
        {isSubmitting ? "Sending…" : "Send Message"}
      </button>
    </form>
  );
}

function Field({
  label,
  children,
  error,
}: {
  label: string;
  children: React.ReactNode;
  error?: string;
}) {
  return (
    <label className="block">
      <span className="form-label">{label}</span>
      {children}
      {error ? <span className="form-error">{error}</span> : null}
    </label>
  );
}
