"use client";

import { useEffect, useState } from "react";
import { banglaDate } from "@/lib/bn";

export default function BanglaDate() {
  const [date, setDate] = useState("");

  useEffect(() => {
    const timeout = window.setTimeout(() => setDate(banglaDate()), 0);
    return () => window.clearTimeout(timeout);
  }, []);

  return date;
}
