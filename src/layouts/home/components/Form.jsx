import { Button } from "@/components/ui/button";
import { sendContactEmail } from "@/lib/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
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
    <form onSubmit={handleSubmit(submitForm)} className="space-y-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label
            htmlFor="fullname"
            className="block text-sm font-medium text-gray-100"
          >
            Full Name
          </label>
          <input
            type="text"
            id="fullname"
            {...register("fullname")}
            className="w-full px-4 py-2 mt-1 text-gray-100 placeholder-gray-400 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
            placeholder="John Doe"
          />
          {errors.fullname && (
            <p className="mt-1 text-sm text-red-400">
              {errors.fullname.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-100"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            {...register("email")}
            className="w-full px-4 py-2 mt-1 text-gray-100 placeholder-gray-400 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
            placeholder="john@example.com"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-400">{errors.email.message}</p>
          )}
        </div>
      </div>

      <div>
        <label
          htmlFor="phone"
          className="block text-sm font-medium text-gray-100"
        >
          Phone Number
        </label>
        <input
          type="text"
          id="phone"
          {...register("phone")}
          className="w-full px-4 py-2 mt-1 text-gray-100 placeholder-gray-400 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
          placeholder="9876543210"
        />
        {errors.phone && (
          <p className="mt-1 text-sm text-red-400">{errors.phone.message}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="message"
          className="block text-sm font-medium text-gray-100"
        >
          Message
        </label>
        <textarea
          id="message"
          rows="4"
          {...register("message")}
          className="w-full px-4 py-2 mt-1 text-gray-100 placeholder-gray-400 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent resize-none"
          placeholder="Your message here..."
        ></textarea>
        {errors.message && (
          <p className="mt-1 text-sm text-red-400">{errors.message.message}</p>
        )}
      </div>

      <Button
        type="submit"
        disabled={isPending}
        className="w-full py-3 font-medium text-white transition-all duration-300 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-md hover:from-cyan-600 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-gray-900"
      >
        {isPending ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Sending...
          </>
        ) : (
          "Send Message"
        )}
      </Button>

      {isSuccess && (
        <p className="text-center text-green-400">
          Message sent successfully! I'll get back to you soon.
        </p>
      )}

      {isError && (
        <p className="text-center text-red-400">
          {error?.message || "Failed to send message. Please try again."}
        </p>
      )}
    </form>
  );
};

export default Form;
