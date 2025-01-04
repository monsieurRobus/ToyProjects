"use client"

import { useState } from "react"
import { Plus, Home } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { usePathname, useRouter } from "next/navigation"
import Link from "next/link"

type Props = {
  location?: string;
  icon?: React.ReactNode;
}

export function FloatingGenericActionButton({
  location = "/tasklist",
}: Props) {
  const router = useRouter();
  const pathname = usePathname();

  console.log(pathname);
  return (
    <div className="fixed bottom-20 right-4 z-50">
        <Link href={location}>
          <Button
            size="icon"
            className="h-14 w-14 rounded-full shadow-lg"
            
          >
            <Home className="h-6 w-6" />
          </Button>
        </Link>
        
    </div>
  )
}

