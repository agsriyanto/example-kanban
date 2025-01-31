import Card from "../card";
import { Task } from "../../types";
import { Droppable } from 'react-beautiful-dnd';

type BoardProps = {
  title: string;
  styles?: string;
  tasks?: Task[];
  openModal?: (type: 'NEW' | 'UPDATE' | "DETAIL" | null) => void;
  index?: number;
};

const Board = (props: BoardProps) => {
  const { title, styles, tasks, openModal, index } = props;

  const borderLeftColors: Record<string, string> = {
    "TO DO": "border-l-[#65CBE9] border-l-4",
    "DOING": "border-l-[#ffd255] border-l-4",
    "DONE": "border-l-[#4bed5f] border-l-4",
  };

  const getBorderLeftColor = (status: string): string => borderLeftColors[status] || "border-l-gray-300 border-l-4";


  return (
    <div className={`flex flex-col border border-solid border-slate-300 shadow rounded-t-lg w-full`}>
      <div className={`border-b border-solid border-slate-300 p-3 ${styles} rounded-t-lg`}>
        <p className="text-base">{title}</p>
      </div>
      <Droppable key={index} droppableId={`${title}`}>
        {(provided) => (
          <div
            className="flex-1 flex flex-col gap-3 px-5 py-4"
            ref={provided.innerRef} 
            {...provided.droppableProps}
          >
            {tasks?.map((task, i) => (
              <Card
                key={task.id}
                styles={getBorderLeftColor(task.status || '')}
                data={task}
                openModal={openModal}
                index={i}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  )
};

export default Board;