import * as yup from "yup";
export const projectFormObject = [
  {
    label: "Title",
    name: "name",
    placeholder: "Enter title",
    type: "text",
    lg: "md:col-span-6",
  },
  {
    label: "Project Link",
    name: "projecturl",
    placeholder: "Enter project link",
    type: "text",
    lg: "md:col-span-6",
  },
  {
    label: "Description",
    name: "description",
    placeholder: "Enter Description",
    type: "text",
    multiline: "true",
  },
  {
    label: "Detailed Description",
    name: "detailedDescription",
    placeholder: "Enter Detailed Description",
    type: "text",
    multiline: "true",
  },
  {
    label: "Github Link",
    name: "gitsource",
    placeholder: "Enter Source code link",
    type: "text",
    lg: "md:col-span-6",
  },
];

export const yupSchema = yup.object({
  name: yup.string().required("**Please enter title"),
  description: yup
    .string()
    .min(3, "**Description shouldn't be less than 3 characters")
    .required("**Please enter description"),
});

export const technologiesOption = [
  "css",
  "html",
  "tailwind",
  "javascript",
  "node.js",
  "mongoose",
  "express.js",
  "react",
  "next.js",
  "mui",
  "chakra ui",
];
export const skillsOption = ["Frontend", "Backend", "Devops", "Database"];