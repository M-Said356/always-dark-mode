import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Send } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { LottieIcon } from "@/components/ui/LottieIcon";
import { LottieAside } from "@/components/ui/LottieAside";
import { useI18n } from "@/lib/i18n";
import { prefetchLottie } from "@/lib/lottie-cache";

const schema = z.object({
  name: z.string().min(2, "Please enter your name"),
  email: z.string().email("Please enter a valid email"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type FormValues = z.infer<typeof schema>;

export function Contact({ showHeading = true }: { showHeading?: boolean } = {}) {
  const { tr } = useI18n();
  const [sent, setSent] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const onSubmit = async (values: FormValues) => {
    const subject = encodeURIComponent(`Portfolio enquiry from ${values.name}`);
    const body = encodeURIComponent(
      `${values.message}\n\nFrom: ${values.name}\nEmail: ${values.email}`,
    );
    window.location.href = `mailto:m.ssaid356@gmail.com?subject=${subject}&body=${body}`;
    setSent(true);
    toast.success(tr("contact.success"));
  };

  const fieldClass =
    "w-full rounded-xl border border-border bg-foreground/10 px-4 py-3 text-foreground outline-none transition-colors placeholder:text-foreground/50 focus:border-primary/60 focus:bg-foreground/15";

  return (
    <section id="contact" className="section-shell section-y-lg scroll-mt-24">
      <div className="container-narrow">
        {showHeading && <SectionHeading title={tr("contact.title")} />}
        <Reveal>
          <p className="mb-10 text-center text-foreground/70">{tr("contact.subtitle")}</p>
        </Reveal>

        <LottieAside src="/lottie/contact-side.lottie">
          <Reveal>
            <form
              onSubmit={handleSubmit(onSubmit)}
              // Warm the success animation as soon as the user starts typing, so
              // it is already cached when the form flips to the sent state.
              onFocusCapture={() => prefetchLottie("/lottie/contact-success.lottie")}
              className="surface-card space-y-5 p-6 sm:p-8"
            >
              <div>
                <label
                  htmlFor="contact-name"
                  className="mb-2 block type-body-strong text-card-foreground"
                >
                  {tr("contact.name")}
                </label>
                <input
                  id="contact-name"
                  autoComplete="name"
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? "contact-name-error" : undefined}
                  {...register("name")}
                  className={fieldClass}
                  placeholder="Jane Doe"
                />
                {errors.name && (
                  <p
                    id="contact-name-error"
                    role="alert"
                    className="mt-1.5 type-body text-destructive"
                  >
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="contact-email"
                  className="mb-2 block type-body-strong text-card-foreground"
                >
                  {tr("contact.email")}
                </label>
                <input
                  id="contact-email"
                  type="email"
                  autoComplete="email"
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? "contact-email-error" : undefined}
                  {...register("email")}
                  className={fieldClass}
                  placeholder="jane@company.com"
                />
                {errors.email && (
                  <p
                    id="contact-email-error"
                    role="alert"
                    className="mt-1.5 type-body text-destructive"
                  >
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="contact-message"
                  className="mb-2 block type-body-strong text-card-foreground"
                >
                  {tr("contact.message")}
                </label>
                <textarea
                  id="contact-message"
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={errors.message ? "contact-message-error" : undefined}
                  {...register("message")}
                  rows={5}
                  className={`${fieldClass} resize-none`}
                  placeholder="Tell me about your marketplace..."
                />
                {errors.message && (
                  <p
                    id="contact-message-error"
                    role="alert"
                    className="mt-1.5 type-body text-destructive"
                  >
                    {errors.message.message}
                  </p>
                )}
              </div>

              {sent && (
                <div className="flex justify-center">
                  <LottieIcon
                    src="/lottie/contact-success.lottie"
                    className="size-24"
                    playOnce
                    loop={false}
                  />
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="group btn-accent type-label w-full"
              >
                {tr("contact.send")}
                <Send className="size-4 transition-transform group-hover:translate-x-0.5" />
              </button>
            </form>
          </Reveal>
        </LottieAside>
      </div>
    </section>
  );
}
