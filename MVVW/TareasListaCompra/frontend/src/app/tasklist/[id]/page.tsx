import { TaskList } from '@/components/TaskList';

interface TaskListProps {
  id: string;
}




export default async function Home(props:Promise<{params:{ id: string }}>) {

  
    const { params } = await props
    const tasks = [];
    
  return (
    <div className="">

      <TaskList initialTasks={tasks} />
    </div>
  );
}

