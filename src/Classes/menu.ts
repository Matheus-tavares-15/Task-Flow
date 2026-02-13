import { TaskClass } from "./task.js"

export class MenuClass {

    menutemplate: HTMLTemplateElement
    divMenu: HTMLDivElement
    element: HTMLElement
    taskInstance: TaskClass

    constructor(taskInstance: TaskClass){
        this.taskInstance = taskInstance
        
        this.menutemplate = document.getElementById("nav-side-bar") as HTMLTemplateElement
        this.divMenu = document.getElementById("menu") as HTMLDivElement

        const importedNode = document.importNode(this.menutemplate.content , true)

        this.element = importedNode.querySelector('.nav-side-bar') as HTMLElement || importedNode.firstElementChild as HTMLElement

        this.attach()
    }

    private attach() {
        this.menuFunctions()
        this.divMenu.insertAdjacentElement("beforeend", this.element);
    }

    public menuFunctions (){
         const newTask = this.element.querySelector("#newTask")

         newTask?.addEventListener("click", (event)=> {
            event.preventDefault()

            this.taskInstance.addNewTask()
         })
    }
}