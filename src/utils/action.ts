"use server";

import { createClient } from "@/utils/supabase/server";
import type { Provider } from "@supabase/supabase-js";
import { redirect } from "next/navigation";

const signInWith = async (provider: Provider) => {
  const supabase = await createClient();
  const origin = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : process.env.SITE_URL;

  const authCallbackUrl = `${origin}/auth/callback`;

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: authCallbackUrl,
      scopes: "https://www.googleapis.com/auth/gmail.readonly",
      queryParams: {
        access_type: "offline",
        prompt: "consent",
      },
    },
  });

  if (error) {
    throw new Error(error.message);
  }

  redirect(data.url);
}

const signInWithGoogle = async () => {
  await signInWith("google");
}

const signInWithGithub = async () => {
  await signInWith("github");
}

const signOut = async () => {
  const supabase = await createClient();
  await supabase.auth.signOut();
  return { success: true };
}

export { signInWithGoogle, signInWithGithub, signOut };