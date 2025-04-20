"use client";

import React from 'react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
const TryoutButton = () => {
  const router = useRouter();
  return (
    <Button onClick={() => router.push('/login')} className="cursor-pointer">Try out</Button>
  )
}

export default TryoutButton;