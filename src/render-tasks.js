import Task from "./task";
import TaskEdit from "./task-edit";

export default (tasks, container) => {
  container.innerHTML = ``;
  tasks
    .filter((it) => !it.isDeleted)
    .forEach((element, index) => {
      const task = new Task(element);
      const taskEdit = new TaskEdit(element);
      task.index = index;
      taskEdit.index = index;

      task.onEdit = () => {
        taskEdit.render();
        container.replaceChild(taskEdit.element, task.element);
        task.unrender();
      };

      taskEdit.onSubmit = (newObject) => {
        Object.assign(element, newObject);
        task.update(element);
        task.render();
        container.replaceChild(task.element, taskEdit.element);
        taskEdit.unrender();
      };

      taskEdit.onDelete = () => {
        container.removeChild(taskEdit.element);
        element.isDeleted = true;
        taskEdit.unrender();
      };

      container.appendChild(task.render());
    });
};
