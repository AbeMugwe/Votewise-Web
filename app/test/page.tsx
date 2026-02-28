"use client";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

export default function TestPage() {
  const modules = useQuery(api.admin.getModules);
  console.log("modules:", modules);
  return <div>{modules ? `Found ${modules.length} modules` : "Loading..."}</div>;
}