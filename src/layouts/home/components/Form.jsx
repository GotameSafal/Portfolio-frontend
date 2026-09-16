import { Button } from "@/components/ui/button";
import { sendContactEmail } from "@/lib/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Loader2, Send, CheckCircle2, AlertCircle } from "lucide-react";
import { useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";

// Form validation schema
const formSchema = z.object({
  fullname: z
    .string()
    .min(3, { message: "Full name must be at least 3 characters" })
    .max(50, { message: "Full name must be less than 50 characters" }),
  email: z
    .string()
    .email({ message: "Please enter a valid email address" }),
  phone: z
    .string()
    .regex(/^[+0-9\s-]{7,16}$/, { message: "Please enter a valid phone number" }),
  message: z
    .string()
    .min(10, { message: "Message must be at least 10 characters" })
    .max(10000, { message: "Message exceeds maximum character limit" }),
});

const Form = () => {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitSuccessful },
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullname: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  const messageValue = useWatch({ control, name: "message", defaultValue: "" });

  const { mutate, isPending, isSuccess, isError, error } = useMutation({
    mutationFn: sendContactEmail,
    onSuccess: () => {
      toast.success("Message sent successfully! I'll get back to you soon.");
      reset();
    },
    onError: (err) => {
      toast.error(err.message || "Failed to send message. Please try again.");
    },
  });

  const submitForm = (data) => {
    mutate(data);
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  return (
    <form onSubmit={handleSubmit(submitForm)} className="space-y-4 font-sans text-xs">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label
            htmlFor="fullname"
            className="block text-[11px] font-semibold uppercase tracking-wider text-neutral-400 mb-1.5"
          >
            Full Name <span className="text-blue-400">*</span>
          </label>
          <input
            type="text"
            id="fullname"
            {...register("fullname")}
            className="w-full px-3.5 py-2.5 text-xs text-white placeholder-neutral-500 bg-neutral-950/60 border border-neutral-800 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30 transition-all"
            placeholder="e.g. Alex Morgan"
          />
          {errors.fullname && (
            <p className="mt-1.5 text-[11px] text-red-400 flex items-center gap-1">
              <AlertCircle size={12} />
              {errors.fullname.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-[11px] font-semibold uppercase tracking-wider text-neutral-400 mb-1.5"
          >
            Email Address <span className="text-blue-400">*</span>
          </label>
          <input
            type="email"
            id="email"
            {...register("email")}
            className="w-full px-3.5 py-2.5 text-xs text-white placeholder-neutral-500 bg-neutral-950/60 border border-neutral-800 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30 transition-all"
            placeholder="alex@company.com"
          />
          {errors.email && (
            <p className="mt-1.5 text-[11px] text-red-400 flex items-center gap-1">
              <AlertCircle size={12} />
              {errors.email.message}
            </p>
          )}
        </div>
      </div>

      <div>
        <label
          htmlFor="phone"
          className="block text-[11px] font-semibold uppercase tracking-wider text-neutral-400 mb-1.5"
        >
          Phone Number <span className="text-neutral-500 font-normal normal-case">(optional / WhatsApp)</span>
        </label>
        <input
          type="text"
          id="phone"
          {...register("phone")}
          className="w-full px-3.5 py-2.5 text-xs text-white placeholder-neutral-500 bg-neutral-950/60 border border-neutral-800 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30 transition-all font-mono"
          placeholder="+1 555 123 4567"
        />
        {errors.phone && (
          <p className="mt-1.5 text-[11px] text-red-400 flex items-center gap-1">
            <AlertCircle size={12} />
            {errors.phone.message}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="message"
          className="block text-[11px] font-semibold uppercase tracking-wider text-neutral-400 mb-1.5"
        >
          Your Message <span className="text-blue-400">*</span>
        </label>
        <textarea
          id="message"
          rows="5"
          {...register("message")}
          className="w-full px-3.5 py-2.5 text-xs text-white placeholder-neutral-500 bg-neutral-950/60 border border-neutral-800 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30 transition-all resize-none leading-relaxed"
          placeholder="Describe your project, team requirements, timeline, or inquiries..."
        ></textarea>
        <div className="flex justify-between items-center mt-1.5">
          {errors.message ? (
            <p className="text-[11px] text-red-400 flex items-center gap-1">
              <AlertCircle size={12} />
              {errors.message.message}
            </p>
          ) : (
            <span />
          )}
          <span
            className={`text-[10px] font-mono tabular-nums ${
              messageValue.length > 9000 ? "text-red-400" : "text-neutral-500"
            }`}
          >
            {messageValue.length.toLocaleString()} / 10,000
          </span>
        </div>
      </div>

      <Button
        type="submit"
        disabled={isPending}
        className="w-full py-3 font-semibold text-white transition-all duration-300 bg-blue-600 hover:bg-blue-500 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 shadow-lg shadow-blue-600/20 cursor-pointer flex items-center justify-center gap-2"
      >
        {isPending ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Sending Message...</span>
          </>
        ) : (
          <>
            <Send size={14} />
            <span>Send Message</span>
          </>
        )}
      </Button>

      {isSuccess && (
        <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center gap-2 text-emerald-400 text-xs">
          <CheckCircle2 size={16} />
          <span>Message sent successfully! I'll get back to you soon.</span>
        </div>
      )}

      {isError && (
        <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center gap-2 text-rose-400 text-xs">
          <AlertCircle size={16} />
          <span>{error?.message || "Failed to send message. Please try again."}</span>
        </div>
      )}
    </form>
  );
};

export default Form;
