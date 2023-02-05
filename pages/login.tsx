import styles from "@/styles/login.module.css";
import { useRouter } from "next/router";
import { useAuth } from "@/context/Auth";
import Link from "next/link";
import useInput from "@/hooks/useInput";
import useSignIn from "@/hooks/useSign";
import { useCallback } from "react";
export default function login() {
  const { formData, handleChange } = useInput();
  const { currentUser } = useAuth();
  const Router = useRouter();
  const { signIn } = useSignIn();
  const handleForm = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      try {
        await signIn(formData.email, formData.password);
        Router.push("/");
      } catch (error) {
        console.log(error);
      }
    },
    [Router, formData.email, formData.password, signIn]
  );

  if (currentUser) {
    Router.push("/");
    return <></>;
  } else {
    return (
      <div className={styles.login__section}>
        <form onSubmit={handleForm}>
          <div className={styles.login__container}>
            <h1>Login</h1>
            <input
              value={formData.email}
              onChange={handleChange}
              name="email"
              type="email"
              placeholder="Email"
            />
            <input
              name="password"
              value={formData.password}
              onChange={handleChange}
              type="password"
              placeholder="Password"
            />
            <button type="submit">Login</button>
            {/* dont have an account go to signup */}
            <p>
              Don't have an account?
              <Link href="/signup">Sign Up</Link>
            </p>
          </div>
        </form>
      </div>
    );
  }
}
