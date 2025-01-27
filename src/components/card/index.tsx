import { Task } from "../../types";

type CardProps = {
  styles?: string;
  data: Task;
  openModal?: (type: 'NEW' | 'UPDATE' | "DETAIL" | null, task?: Task) => void;
}

const Card = (props: CardProps) => {
  const { styles, data, openModal } = props;

  const teamColors: { [key in 'FRONTEND' | 'BACKEND' | 'DESIGN' | string]: string } = {
    DESIGN: "bg-red-300 text-white",
    BACKEND: "bg-yellow-300 text-white",
    FRONTEND: "bg-green-300 text-white",
  };

  return (
    <div className={`border border-solid border-slate-300 w-full shadow border-l-2 p-3 flex flex-col gap-2 ${styles}`}>
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
  );
};

export default Card;