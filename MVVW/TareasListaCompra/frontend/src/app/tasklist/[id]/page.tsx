"use client"
import { TaskList } from '@/components/TaskList';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { use } from 'react';
interface TaskListProps {
  params: {
    id:string
  }
}



export default function Home(props:TaskListProps){

    const { params } = props;
    const queryClient = new QueryClient();
    const tasks = [];
    
  return (
    <div className="">
      <QueryClientProvider client={queryClient}>
        <TaskList id={params.id} initialTasks={tasks} />

      </QueryClientProvider>
    </div>
  );
}

