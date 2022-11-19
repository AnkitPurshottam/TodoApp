import { useState } from "react";
import LoaderIcon from "../utils/LoaderIcon";

export default function TodoForm({
  form,
  handleFormInput,
  upsertTodo,
  closeForm,
}) {
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    await upsertTodo(e);
    setIsLoading(false);
  }

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-blue-50 rounded-lg mt-2">
      <input
        onChange={(e) => handleFormInput("title", e.target.value)}
        value={form.title || ""}
        placeholder="Title"
        type="text"
        className="w-full border border-blue-200 rounded py-1 px-2 text-lg focus:outline-none focus:border-blue-400"
        required
        autoFocus
      />
      <textarea
        onChange={(e) => handleFormInput("desc", e.target.value)}
        value={form.desc || ""}
        placeholder="Description"
        className="w-full border border-blue-200 rounded py-1 px-2 text-lg focus:outline-none focus:border-blue-400 mt-2"
        required
      />

      <p className="flex gap-4">
        <button
          type="submit"
          className="w-full bg-blue-500 text-white rounded mt-2 py-2 flex items-center justify-center"
        >
          {isLoading ? <LoaderIcon className="h-6 w-6 animate-spin" /> : "Save"}
        </button>
        <button
          onClick={form.editing ? () => closeForm(form) : closeForm}
          type="reset"
          className="w-full border border-blue-400 text-blue-500 rounded mt-2 py-2"
        >
          Close
        </button>
      </p>
    </form>
  );
}
