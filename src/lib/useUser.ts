"use client";
import { getUser } from "@/app/(tabs)/profile/[id]/[[...slug]]/actions";
import { User } from "@prisma/client";
import { useEffect, useState } from "react";

export default function useUser() {
  const [user, setUser] = useState<User>();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    getUser().then((user) => {
      setUser(user);
      setIsLoading(false);
    });
  }, []);

  return { user, isLoading };
}
