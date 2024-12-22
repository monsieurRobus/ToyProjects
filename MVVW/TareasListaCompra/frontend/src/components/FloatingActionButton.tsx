"use client"

import { useState } from "react"
import { Plus, ListPlus, CheckSquare } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function FloatingActionButton() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const handleCreateTask = () => {
    // Implementar la lógica para crear una tarea
    console.log("Crear tarea")
    router.push("/task")
    setIsOpen(false)
  }

  const handleCreateList = () => {
    // Implementar la lógica para crear una lista
    console.log("Crear lista")
    router.push("/tasklist/new")

    setIsOpen(false)
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger asChild>
          <Button
            size="icon"
            className="h-14 w-14 rounded-full shadow-lg"
          >
            <Plus className="h-6 w-6" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuItem onClick={handleCreateTask}>
            <CheckSquare className="mr-2 h-4 w-4" />
            <span>Crear Tarea</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleCreateList}>
            <ListPlus className="mr-2 h-4 w-4" />
            <span>Crear Lista</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

