import { Button } from "@/components/ui/button";
import { sendContactEmail } from "@/lib/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";

// Define schema using Zod
const formSchema = z.object({
  fullname: z
    .string()
    .min(3, { message: "Fullname must be at least 3 characters" })
    .max(50, { message: "Fullname must be less than 50 characters" })
    .nonempty({ message: "Please enter valid fullname" }),
  email: z
    .string()
    .email({ message: "Please enter a valid email" })
    .nonempty({ message: "Email is required" }),
  phone: z
    .string()
    .regex(/^[0-9]{6,14}$/, { message: "Please enter valid phone number" })
    .nonempty({ message: "Phone number is required" }),
  message: z
    .string()
    .min(5, { message: "Please enter some message to get connected" })
    .max(10000, { message: "Message is too long" })
    .nonempty({ message: "Message is required" }),
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
            className="block text-[10px] font-semibold uppercase tracking-wider text-gray-400 mb-1"
          >
            Full Name
          </label>
          <input
            type="text"
            id="fullname"
            {...register("fullname")}
            className="w-full px-3 py-2 text-white placeholder-gray-500 bg-black/40 border border-white/10 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
            placeholder="John Doe"
          />
          {errors.fullname && (
            <p className="mt-1 text-[10px] text-red-400">
              {errors.fullname.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-[10px] font-semibold uppercase tracking-wider text-gray-400 mb-1"
          >
            Email Address
          </label>
          <input
            type="email"
            id="email"
            {...register("email")}
            className="w-full px-3 py-2 text-white placeholder-gray-500 bg-black/40 border border-white/10 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
            placeholder="john@example.com"
          />
          {errors.email && (
            <p className="mt-1 text-[10px] text-red-400">{errors.email.message}</p>
          )}
        </div>
      </div>

      <div>
        <label
          htmlFor="phone"
          className="block text-[10px] font-semibold uppercase tracking-wider text-gray-400 mb-1"
        >
          Phone Number
        </label>
        <input
          type="text"
          id="phone"
          {...register("phone")}
          className="w-full px-3 py-2 text-white placeholder-gray-500 bg-black/40 border border-white/10 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
          placeholder="9876543210"
        />
        {errors.phone && (
          <p className="mt-1 text-[10px] text-red-400">{errors.phone.message}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="message"
          className="block text-[10px] font-semibold uppercase tracking-wider text-gray-400 mb-1"
        >
          Your Message
        </label>
        <textarea
          id="message"
          rows="4"
          {...register("message")}
          className="w-full px-3 py-2 text-white placeholder-gray-500 bg-black/40 border border-white/10 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all resize-none"
          placeholder="Describe your project, ideas, or questions..."
        ></textarea>
        <div className="flex justify-between items-center mt-1">
          {errors.message ? (
            <p className="text-[10px] text-red-400">{errors.message.message}</p>
          ) : (
            <span />
          )}
          <span className={`text-[10px] tabular-nums ${
            messageValue.length > 9000 ? "text-red-400" : "text-gray-500"
          }`}>
            {messageValue.length} / 10,000
          </span>
        </div>
      </div>

      <Button
        type="submit"
        disabled={isPending}
        className="w-full py-2.5 font-bold text-white transition-all duration-300 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-lg hover:from-blue-500 hover:to-cyan-400 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-md shadow-blue-500/10 cursor-pointer"
      >
        {isPending ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Sending Message...
          </>
        ) : (
          "Send Message"
        )}
      </Button>

      {isSuccess && (
        <p className="text-center text-[10px] text-green-400">
          Message sent successfully! I'll get back to you soon.
        </p>
      )}

      {isError && (
        <p className="text-center text-[10px] text-red-400">
          {error?.message || "Failed to send message. Please try again."}
        </p>
      )}
    </form>
  );
};

export default Form;
