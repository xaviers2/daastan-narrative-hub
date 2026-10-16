import { useState, type ReactNode } from "react";
import { z } from "zod";
import { X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const schema = z.object({
  name: z.string().trim().min(1, "Please enter your name").max(100),
  email: z.string().trim().email("Please enter a valid email").max(255),
  phone: z.string().trim().regex(/^[+\d\s-]{7,20}$/, "Please enter a valid phone number"),
  message: z.string().trim().min(1, "Tell us what you need").max(1000),
});

export function BookingDialog({ children, className }: { children: ReactNode; className?: string }) {
  const [open, setOpen] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const parsed = schema.safeParse(Object.fromEntries(new FormData(e.currentTarget)));
    if (!parsed.success) {
      setErrors(Object.fromEntries(parsed.error.issues.map((i) => [i.path[0], i.message])));
      return;
    }
    setErrors({});
    setStatus("sending");
    const { error } = await supabase.from("bookings").insert(parsed.data);
    setStatus(error ? "error" : "done");
  }

  const field = "w-full rounded-lg border border-input bg-background px-4 py-3 text-sm outline-none focus:border-primary";

  return (
    <>
      <button type="button" onClick={() => { setOpen(true); setStatus("idle"); }} className={className}>{children}</button>
      {open && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-foreground/50 p-4 backdrop-blur-sm" onClick={() => setOpen(false)}>
          <div className="relative w-full max-w-lg rounded-2xl bg-card p-8 text-card-foreground shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <button aria-label="Close" onClick={() => setOpen(false)} className="absolute right-4 top-4 text-muted-foreground hover:text-primary"><X className="h-5 w-5" /></button>
            {status === "done" ? (
              <div className="py-8 text-center">
                <h3 className="text-4xl">Thank you!</h3>
                <p className="mt-3 text-muted-foreground">We've received your details and will reach out soon.</p>
              </div>
            ) : (
              <form onSubmit={submit} className="space-y-4" noValidate>
                <h3 className="text-4xl">Book a Discovery Call</h3>
                <p className="text-sm text-muted-foreground">Share a few details and we'll get in touch.</p>
                {([
                  ["name", "Your name", "text"],
                  ["email", "Email", "email"],
                  ["phone", "Phone number", "tel"],
                ] as const).map(([n, p, t]) => (
                  <div key={n}>
                    <input name={n} type={t} placeholder={p} className={field} />
                    {errors[n] && <p className="mt-1 text-xs text-destructive">{errors[n]}</p>}
                  </div>
                ))}
                <div>
                  <textarea name="message" rows={4} placeholder="What would you like to work on with us?" className={field} />
                  {errors["message"] && <p className="mt-1 text-xs text-destructive">{errors["message"]}</p>}
                </div>
                {status === "error" && <p className="text-sm text-destructive">Something went wrong. Please try again.</p>}
                <button disabled={status === "sending"} className="w-full rounded-full bg-primary py-3.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-60">
                  {status === "sending" ? "Sending…" : "Submit"}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
