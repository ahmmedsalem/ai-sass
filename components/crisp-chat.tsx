"use client";
import { useEffect } from "react";
import { Crisp } from "crisp-sdk-web";


export const CrispChat = () => {
    useEffect(() => {
        Crisp.configure("e41d137e-8651-4eb3-a504-70adffb5fca8");
    }, []);
  return null;
};

