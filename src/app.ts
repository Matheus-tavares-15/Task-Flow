import { MenuClass } from "./Classes/menu.js";
import { TaskClass } from "./Classes/task.js";



const taskService = new TaskClass();

new MenuClass(taskService)