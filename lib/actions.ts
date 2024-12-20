"use server";

/**
 * Author: Matthew Hilliard
 * Email: mch2003@bu.edu
 * Description: This module provides server-side utility functions for managing user authentication and 
 * session state in a Next.js application. It handles setting, refreshing, and resetting authentication cookies, 
 * ensuring secure and seamless user session management. The module integrates with a backend API to refresh 
 * tokens and retrieve user-specific session data, optimizing authentication workflows.
 */

import { cookies } from "next/headers";

// Function to refresh the access token when it expires
export async function handleRefresh() {
  const refreshToken = await getRefreshToken();
  const cookieStore = await cookies();

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/token/refresh/`,
      {
        method: "POST",
        body: JSON.stringify({ refresh: refreshToken }),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      // Handle HTTP errors
      resetAuthCookies();
      return null;
    }

    const json = await response.json();

    if (json.access) {
      cookieStore.set("session_access_token", json.access, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60, // 60 minutes
        path: "/",
      });

      return json.access;
    } else {
      resetAuthCookies();
      return null;
    }
  } catch (error) {
    console.error("Error refreshing token:", error);
    resetAuthCookies();
    return null;
  }
}

// Function to set the auth cookies when the user logs in or signs up
export async function handleLogin(
  userId: string,
  accessToken: string,
  refreshToken: string
) {
  const cookieStore = await cookies();
  cookieStore.set("session_userid", userId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7, // 1 week
    path: "/",
  });

  cookieStore.set("session_access_token", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60, // 60 minutes
    path: "/",
  });

  cookieStore.set("session_refresh_token", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7, // 1 week
    path: "/",
  });
}

// Function to reset the auth cookies when the user logs out
export async function resetAuthCookies() {
  const cookieStore = await cookies();
  cookieStore.set("session_userid", "");
  cookieStore.set("session_access_token", "");
  cookieStore.set("session_refresh_token", "");
}

//
// Get data

// Function to get the user ID from the session cookie
export async function getUserId() {
  const cookieStore = await cookies();
  const userId = cookieStore.get("session_userid")?.value;
  return userId ?? null;
}

// Function to get the access token from the session cookie
export async function getAccessToken() {
  const cookieStore = await cookies();
  let accessToken = cookieStore.get("session_access_token")?.value;

  if (!accessToken) {
    accessToken = await handleRefresh();
  }
  return accessToken;
}

// Function to get the refresh token from the session cookie
export async function getRefreshToken() {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get("session_refresh_token")?.value;
  return refreshToken;
}
