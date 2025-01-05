"use client"
import { TaskList } from '@/components/TaskList';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
interface TaskListProps {
  id: string;
}




export default async function Home(props:Promise<{params:{ id: string }}>) {


    const { params } = await props;
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

