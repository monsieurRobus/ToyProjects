"use client";
import React, { useState } from 'react';
import { Task } from '../types/Task';
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent } from "@/components/ui/card"
import { ActionButton } from './action-button';
import { Button } from './ui/button';
import { Input } from './ui/input';
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'


interface TaskListProps {
  initialTasks: Task[]|null[];
}

export const TaskList: React.FC<TaskListProps> = ({ initialTasks }) => {
  const queryClient = new QueryClient()
  const {data, isLoading, error, refetch} = useQuery({
    queryKey:['tasks'],
    queryFn: async () => {
      const response = await fetch('http://localhost:3001/tasklist/1')
      return response.json()
    },
    initialData: initialTasks
  });
  const [tasks, setTasks] = useState<Task[]>(data);

  const toggleTask = (id: number) => {
    setTasks(tasks.map(task => 
      task.id_tarea === id ? { ...task, realizado: !(task.completada == "true") } : task
    ));
  };

  return (
    <QueryClientProvider client={queryClient}>
    <div className="flex flex-col p-4">
      <div className={'flex flex-row gap-2'}>
        <h2 className="text-2xl font-bold mb-4">Lista de Tareas</h2>
        <ActionButton />
      </div>
      <div className={'flex flex-row py-4 gap-2 mb-2'}>
        <Input placeholder={'Añada tarea'}/>
        <Button>Añadir</Button>
      </div>
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
    </QueryClientProvider>
  );
};

