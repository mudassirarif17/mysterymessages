import React from 'react';
import { Html, Button } from "@react-email/components";

interface VerificationEmailProps {
    username: string;
    otp: string;
}

export default function VerificationEmail({ username , otp}) {
  return (
    <div>
      <h1>Welcome, {username}!</h1>
      <p>Thanks for trying {otp}. We’re thrilled to have you on board.</p>
    </div>
  );
}