const todoInput = document.querySelector(".todo-input");
const form = document.querySelector(".form-todo");
const list = document.querySelector(".todo-list")
const addButton = document.querySelector(".add-button")
const error = document.querySelector(".input-message")
const editButton = document.querySelector(".edit-button")
const clearBtn = document.querySelector(".clear-btn")
const count = document.querySelector(".count")

count.textContent = list.children.length
const buttonArray = {}

addButton.addEventListener("click", (e) => {
    e.preventDefault()

    if (!todoInput.value.trim() == "") {
        const listItem = document.createElement("li");
        listItem.classList.add("list-group-item")
        listItem.classList.add("d-flex")
        listItem.classList.add("justify-content-between")
        listItem.classList.add("align-items-center")
        const span = document.createElement("span")
        span.classList.add("taskName")
        span.textContent = todoInput.value
        const buttonDelete = document.createElement("button")
        const buttonDone = document.createElement("button")
        const buttonEdit = document.createElement("button")
        const div = document.createElement("div")
        div.classList.add("d-flex")
        div.classList.add("gap-1")
        // Done Button
        buttonDone.classList.add("btn")
        buttonDone.classList.add("btn-info")
        buttonDone.classList.add("text-white")
        buttonDone.classList.add("dones")
        buttonDone.classList.add("padding")
        buttonDone.innerHTML = `<i class="p-2 fa-solid fa-check"></i>`
        //Edit Button
        buttonEdit.classList.add("btn")
        buttonEdit.classList.add("btn-primary")
        buttonEdit.classList.add("edits")
        buttonEdit.classList.add("padding")
        buttonEdit.innerHTML = `<i class="p-2 fa-solid fa-pen-to-square"></i>`
        //Delete Button
        buttonDelete.classList.add("btn")
        buttonDelete.classList.add("btn-danger")
        buttonDelete.classList.add("deletes")
        buttonDelete.classList.add("padding")
        buttonDelete.innerHTML = `<i class="p-2 fa-solid fa-trash"></i>`
        div.append(buttonDelete, buttonDone, buttonEdit)
        listItem.append(span, div)
        list.append(listItem)
        todoInput.value = ""

        count.textContent = list.children.length

        // const buttonArray = {
        //     edits: buttonEdit,
        //     deletes: buttonDelete,
        //     dones: buttonDone
        // }

        // Delete to do

        buttonDelete.addEventListener("click", (e) => {
            e.target.parentElement.parentElement.parentElement.remove()
            count.textContent = list.children.length
            if (list.children.length == 0) {
                clearBtn.setAttribute("disabled", "")
            }
        })

        //Done to do

        buttonDone.addEventListener("click", (e) => {
            e.target.parentElement.parentElement.previousElementSibling.classList.toggle("done")
            if (e.target.parentElement.parentElement.previousElementSibling.classList == "done") {
                e.target.parentElement.nextElementSibling.setAttribute("disabled", "")
            }
            else {
                e.target.parentElement.nextElementSibling.removeAttribute("disabled")
            }
        })

        // Clear All
        if (list.children.length > 0) {
            clearBtn.removeAttribute("disabled")
        }
        clearBtn.addEventListener("click", () => {
            listItem.remove()
            count.textContent = list.children.length
            clearBtn.setAttribute("disabled", "")
        })

        const deletes = document.querySelectorAll(".deletes")
        const edits = document.querySelectorAll(".edits")
        const dones = document.querySelectorAll(".dones")
        // const taskName = document.querySelectorAll("taskName")

        function disabledButtons() {
            deletes.forEach((btns) => {
                btns.setAttribute("disabled", "")
            })
            edits.forEach((btns) => {
                btns.setAttribute("disabled", "")
            })
            dones.forEach((btns) => {
                btns.setAttribute("disabled", "")
            })
            addButton.setAttribute("disabled", "")
            clearBtn.setAttribute("disabled", "")
        }


        buttonEdit.addEventListener("click", (e) => {
            console.log(e);
            editButton.style.display = "inline"
            console.log(span);
            todoInput.value = e.target.parentElement.parentElement.previousElementSibling.textContent
            span.textContent = e.target.parentElement.parentElement.previousElementSibling.textContent

            editButton.addEventListener("click", (event) => {
                event.preventDefault()
                span.textContent = todoInput.value
                deletes.forEach((btn) => {
                    btn.removeAttribute("disabled")
                })
                edits.forEach((btns) => {
                    btns.removeAttribute("disabled")
                })
                dones.forEach((btns) => {
                    btns.removeAttribute("disabled")
                })
                addButton.removeAttribute("disabled")
                clearBtn.removeAttribute("disabled")
                editButton.style.display = "none"
                todoInput.value = ""
            })
        })
    } else {
        alert("Please write something...")
    }
})

//! Check Input valid
todoInput.addEventListener("keyup", (e) => {
    if (editButton.style.display == "inline") {
        if (e.target.value.length <= 3 && e.target.value.length >= 0) {
            todoInput.setAttribute("placeholder", "Edit task...")
            editButton.setAttribute("disabled", "")
            error.style.display = "inline"
        }
        else {
            editButton.removeAttribute("disabled")
            error.style.display = "none"
            todoInput.setAttribute("placeholder", "Enter new todo...")
        }
    } else if (editButton.style.display == "none") {
        if (e.target.value.length <= 3 && e.target.value.length > 0) {
            addButton.setAttribute("disabled", "")
            error.style.display = "inline"
        }
        else {
            addButton.removeAttribute("disabled")
            error.style.display = "none"
        }
    }
})
