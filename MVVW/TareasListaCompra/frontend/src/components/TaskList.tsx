"use client";
import React, { useState } from 'react';
import { Task } from '../types/Task';
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent } from "@/components/ui/card"

interface TaskListProps {
  initialTasks: Task[];
}

export const TaskList: React.FC<TaskListProps> = ({ initialTasks }) => {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  const toggleTask = (id: number) => {
    setTasks(tasks.map(task => 
      task.id_tarea === id ? { ...task, realizado: !(task.completada == "true") } : task
    ));
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Lista de Tareas</h2>
      {tasks.map(task => (
        <Card key={task.id_tarea} className="mb-2">
          <CardContent className="flex items-center p-4">
            <Checkbox
              id={`task-${task.id_tarea}`}
              checked={task.completada == "true"? true : false}
              onCheckedChange={() => toggleTask(task.id_tarea)}
              className="mr-2"
            />
            <label
              htmlFor={`task-${task.id_tarea}`}
              className={`flex-grow ${task.completada == "true"? 'line-through text-gray-500' : ''}`}
            >
              {task.titulo}
            </label>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

