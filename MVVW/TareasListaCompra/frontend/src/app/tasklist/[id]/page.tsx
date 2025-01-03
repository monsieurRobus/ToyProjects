import { TaskList } from '@/components/TaskList';
import { Task } from '@/types/Task';



interface TaskListProps {
  id: string;
}


export default async function Home({params}: { params: { id: string }}) {
    console.log(params.id)
    const tasks = await fetch(`http://localhost:3001/tasklist/${params.id}`).then((res) => res.json())

  return (
    <div className="container mx-auto p-4">
      <TaskList initialTasks={tasks} />
    </div>
  );
}

