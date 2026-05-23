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
  message: z
    .string()
    .min(20, "Tell us a little more — at least 20 characters."),
});

type FormValues = z.infer<typeof schema>;

const subjects = [
  "Constituent service",
  "State agency assistance",
  "Scholarship inquiry",
  "Press inquiry",
  "Legislative question",
  "Other",
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
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, zip: "", topic: data.subject }),
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
          The office reviews constituent messages within a few business days.
          For urgent matters, please call our Annapolis office directly.
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
          the office.
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
