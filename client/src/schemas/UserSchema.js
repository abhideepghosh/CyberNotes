import * as yup from "yup";

export const nameSchema = yup.object().shape({
  name: yup.string().min(3).required("Please Enter Name"),
});
export const emailSchema = yup.object().shape({
  email: yup.string().email("Please enter a valid email").required("Required"),
});
export const passwordSchema = yup.object().shape({
  password: yup.string().min(8).required("Required"),
});

export const titleSchema = yup.object().shape({
  title: yup.string().min(1).required("Requried"),
});

