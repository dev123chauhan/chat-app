import toast from "react-hot-toast";

export const validateSignup = ({ fullName, email, password }) => {
  if (!fullName?.trim()) {
    toast.error("Full name is required");
    return false;
  }

  if (!email?.trim()) {
    toast.error("Email is required");
    return false;
  }

  const emailRegex = /\S+@\S+\.\S+/;
  if (!emailRegex.test(email)) {
    toast.error("Invalid email format");
    return false;
  }

  if (!password) {
    toast.error("Password is required");
    return false;
  }

  if (password.length < 6) {
    toast.error("Password must be at least 6 characters");
    return false;
  }

  return true;
};
