"use server";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export async function login(formData: FormData) {
  // In a real app, you'd validate the credentials against a database
  const email = formData.get("email");

  if (email) {
    // Set a session cookie
    cookies().set("auth_session", email.toString(), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // One week
      path: "/",
    });
    redirect("/dashboard");
  } else {
    redirect("/login?error=Invalid credentials");
  }
}

export async function logout() {
  // Clear the session cookie
  cookies().set("auth_session", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: -1, // Expire immediately
    path: "/",
  });
  redirect("/login");
}
