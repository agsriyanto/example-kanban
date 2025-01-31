import { Task } from "../../types";
import { Draggable } from 'react-beautiful-dnd';

type CardProps = {
  styles?: string;
  data: Task;
  openModal?: (type: 'NEW' | 'UPDATE' | "DETAIL" | null, task?: Task) => void;
  index?: number;
}

const Card = (props: CardProps) => {
  const { styles, data, openModal, index } = props;

  const teamColors: { [key in 'FRONTEND' | 'BACKEND' | 'DESIGN' | string]: string } = {
    DESIGN: "bg-red-300 text-white",
    BACKEND: "bg-yellow-300 text-white",
    FRONTEND: "bg-green-300 text-white",
  };

  return (
    <Draggable draggableId={String(data.id)} index={index ?? 0} key={data.id}>
      {(provided) => (
        <div
          className={`flex flex-col border p-4 mb-3 cursor-pointer ${styles}`}
          ref={provided.innerRef} 
          {...provided.draggableProps} 
          {...provided.dragHandleProps}
        >
          <p className="text-left font-bold cursor-pointer" onClick={() => openModal && openModal('DETAIL', data)}>{data.name}</p>
          <div className="flex gap-2 flex-wrap">
            {data.teams.map((team) => (
              <span
                key={team}
                className={`px-3 py-1 rounded-full text-xs font-medium ${teamColors[team] || "bg-gray-200 text-gray-800"}`}
              >
                {team}
              </span>
            ))}
          </div>
          <div className="flex gap-3 justify-between">
            <p className="m-0 min-h-4">ID {data.id}</p>
            <p className="m-0">{data.priority}</p>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default Card;