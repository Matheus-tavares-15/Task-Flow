export class MenuClass {
    menutemplate;
    divMenu;
    element;
    taskInstance;
    constructor(taskInstance) {
        this.taskInstance = taskInstance;
        this.menutemplate = document.getElementById("nav-side-bar");
        this.divMenu = document.getElementById("menu");
        const importedNode = document.importNode(this.menutemplate.content, true);
        this.element = importedNode.querySelector('.nav-side-bar') || importedNode.firstElementChild;
        this.attach();
    }
    attach() {
        this.menuFunctions();
        this.divMenu.insertAdjacentElement("beforeend", this.element);
    }
    menuFunctions() {
        const newTask = this.element.querySelector("#newTask");
        newTask?.addEventListener("click", (event) => {
            event.preventDefault();
            this.taskInstance.addNewTask();
        });
    }
}
//# sourceMappingURL=menu.js.map