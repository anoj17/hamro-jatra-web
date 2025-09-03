import React from "react";
import { Button } from "./ui/button";
import { FaGoogle } from "react-icons/fa6";
import { GoogleAuth } from "@/lib/actions/auth";

const SocialMediaAuth = () => {
  return (
    <Button
      type="button"
      variant="outline"
      className="w-full border-border cursor-pointer py-2.5 hover:text-black hover:bg-white/90"
      onClick={() => GoogleAuth()}
    >
      <FaGoogle className="mr-2 h-4 w-4 text-black" />
      Continue with Google
    </Button>
  );
};

export default SocialMediaAuth;
