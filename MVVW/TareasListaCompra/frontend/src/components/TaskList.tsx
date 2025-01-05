"use client";
import React, { useEffect, useState } from 'react';
import { Task } from '../types/Task';
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent } from "@/components/ui/card"
import { ActionButton } from './action-button';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { createTask } from '@/services/listServices';
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
  
} from '@tanstack/react-query'


interface TaskListProps {
  initialTasks: Task[]|null[];
  id?: string;
}

export const TaskList: React.FC<TaskListProps> = ({ initialTasks, id='1' }) => {
  
  const {data, isLoading, error, refetch} = useQuery({
    queryKey:['tasks'],
    queryFn: async () => {
      const response = await fetch('http://localhost:3001/tasklist/1')
      return response.json()
    },
    initialData: initialTasks
  });
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState<Task>();

  const mutation = useMutation({
    mutationFn: async () => {
      return createTask(id,newTask);
    }
  });
  useEffect(() => {
    setTasks(data);
  },[data]);

  const toggleTask = (id: number) => {
    console.log(tasks)
    setTasks(tasks.map(task => 
      task.id_tarea === id ? { ...task, completada: task.completada == "true" ? "false":"true" } : task
    ));
  };

  const addTask = (task: Task) => {

    mutation.mutate(newTask);

  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {

    setNewTask({
      titulo: e.target.value,
      descripcion: '',
    });

  }

  return (
    
    <div className="flex flex-col p-4">
      <div className={'flex flex-row gap-2'}>
        <h2 className="text-2xl font-bold mb-4">Lista de Tareas</h2>
        <ActionButton />
      </div>
      <div className={'flex flex-row py-4 gap-2 mb-2'}>
        <Input onChange={handleChange} placeholder={'Añada tarea'}/>
        <Button onClick={addTask}>Añadir</Button>
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
  );
};

