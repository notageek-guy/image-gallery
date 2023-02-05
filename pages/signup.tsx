import React, { useEffect } from "react";
import { useAuth } from "@/context/Auth";
import styles from "@/styles/login.module.css";
import Link from "next/link";
import useInput from "@/hooks/useInput";
import useSignIn from "@/hooks/useSign";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/router";
export default function signup() {
  const Router = useRouter();
  const { currentUser } = useAuth();
  const notify = () => toast.success("Account created successfully");
  const { formData, handleChange } = useInput();
  const { signUp } = useSignIn();
  const handleForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await signUp(formData.email, formData.password);
      notify();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.login__section}>
      <form onSubmit={handleForm}>
        <div className={styles.login__container}>
          <h1>Sign Up</h1>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
          />
          <input
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
          />
          <button type="submit">Create Account</button>
          <p>
            Already have an account?
            <Link href="/signin">Sign in</Link>
          </p>
        </div>
      </form>
    </div>
  );
}
