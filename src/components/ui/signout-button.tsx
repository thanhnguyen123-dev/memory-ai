"use client";
import React from 'react';
import { signOut } from '@/app/actions/auth';
import { Button } from '@/components/ui/button';

const SignOutButton = () => {
  const handleSignOut = async () => {
    await signOut();
  }
  
  return (
    <Button onClick={handleSignOut} className="cursor-pointer">Sign Out</Button>
  );
}

export default SignOutButton;