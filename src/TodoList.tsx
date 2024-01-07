import { useOptimistic } from "react";
import { v4 as uuid } from 'uuid'

type TodoItem = {
  id: string;
  name: string;
  pending?: boolean;
}

type TodoListProps = {
  items: TodoItem[];
  createItem: (item: string) => Promise<unknown>;
}
const TodoList = (props: TodoListProps) => {

  const { items, createItem } = props;
  const [optimisticTodos, addOptimisticTodoItem] = useOptimistic(
    items,
    (currentState, optimisticValue: string) => [
      ...currentState,
      { id: uuid(), name: optimisticValue+"[optimistic]", pending: true },
    ]
  )

  return (
    <div>
      {optimisticTodos.map((todo) => (
        <div key={todo.id}>{todo.name}{todo.pending && "(...loading)"}</div>
      ))}
      <form
        action={async (formData: FormData) => {
          const item = formData.get('item') as string;
          addOptimisticTodoItem(item)
          await createItem(item);
        }}
      >
        <input type="text" name="item" />
        <button type="submit">Add Item</button>
      </form>
    </div>
  )
}

export default TodoList