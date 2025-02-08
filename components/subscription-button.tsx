"use client";

import { Zap } from "lucide-react";
import { Button } from "./ui/button";
import axios from "axios";
import { useState } from "react";

type Props = {
  isPro: boolean;
};

const SubscriptionButton = ({ isPro }: Props) => {
    const [loading, setLoading] = useState(false);
  const onClick = async () => {
    try {
        setLoading(true);
        const response = await axios.get("/api/stripe");
        window.location.href = response.data.sessionId;
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Button disabled={loading} variant={isPro ? "default" : "premium"} onClick={onClick}>
      {isPro ? "Manage Subscription" : "Upgrade"}{" "}
      {!isPro && <Zap className="w-4 h-4 ml-2 fill-white" />}
    </Button>
  );
};

export default SubscriptionButton;
