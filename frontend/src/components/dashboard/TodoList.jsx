import TodoListItem from "./TodoListItem";

export default function TodoList({ todos, editTodo, deleteTodo, searchEmpty }) {
  return (
    <div
      className="mt-4 flex flex-col divide-y divide-gray-300 border border-gray-300 rounded-lg px-4 overflow-y-scroll"
      style={{
        maxHeight: "80vh",
      }}
    >
      {todos.length ? (
        todos.map((todo, index) => (
          <TodoListItem
            todo={todo}
            editTodo={editTodo}
            deleteTodo={deleteTodo}
            index={index}
            key={index}
          />
        ))
      ) : (
        <p className="m-16 text-4xl text-gray-500">
          {searchEmpty
            ? "Nothing matches with your search"
            : "Your todo list is empty!"}
        </p>
      )}
    </div>
  );
}
