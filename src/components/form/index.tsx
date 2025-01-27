import { Task } from "../../types";

interface FormProps {
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  form: Task;
  setForm: React.Dispatch<React.SetStateAction<Task>>;
}

const Form = (props: FormProps) => {
  const { handleSubmit, form, setForm } = props;

  const availableTeams = ["DESIGN", "BACKEND", "FRONTEND"];
  const availablePriorities = ["LOW", "MEDIUM", "HIGH"];

  const handleTeamsChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOptions = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setForm({ ...form, teams: selectedOptions });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 bg-white p-6 rounded-lg shadow-md max-w-md mx-auto">
      <div>
        <label htmlFor="name" className="block text-left text-sm font-medium text-gray-700 mb-1">
          Name
        </label>
        <input
          id="name"
          type="text"
          placeholder="Enter task name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <div>
        <label htmlFor="description" className="block text-left text-sm font-medium text-gray-700 mb-1">
          Description
        </label>
        <textarea
          id="description"
          placeholder="Enter task description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          required
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          rows={3}
        />
      </div>

      <div>
        <label htmlFor="teams" className="block text-left text-sm font-medium text-gray-700 mb-1">
          Teams
        </label>
        <select
          id="teams"
          multiple
          value={form.teams}
          onChange={handleTeamsChange}
          required
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          {availableTeams.map((team) => (
            <option key={team} value={team}>
              {team}
            </option>
          ))}
        </select>
        <small className="text-gray-500 text-sm">
          Hold <kbd>Ctrl</kbd> (or <kbd>Cmd</kbd>) to select multiple teams.
        </small>
      </div>

      <div>
        <label htmlFor="priority" className="block text-left text-sm font-medium text-gray-700 mb-1">
          Priority
        </label>
        <select
          id="priority"
          value={form.priority}
          onChange={(e) => setForm({ ...form, priority: e.target.value })}
          required
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          {availablePriorities.map((priority) => (
            <option key={priority} value={priority}>
              {priority}
            </option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg font-semibold hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        Add Task
      </button>
    </form>
  )
};

export default Form;