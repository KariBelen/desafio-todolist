const defaultTodo = [
  {
    id: 1,
    tarea: "Hacer mercado",
    completado: true,
  },
  {
    id: 2,
    tarea: "Estudiar para la prueba",
    completado: true,
  },
  {
    id: 3,
    tarea: "Hacer comida para la bendi",
    completado: false,
  },
  {
    id: 4,
    tarea: "Comprar compulsivamente",
    completado: true,
  },
];

let id = 5;
let todoRealizado = "";
let checkboxList = "";
const total = document.querySelector("#total");
const realizado = document.querySelector("#realizado");

const table = document.querySelector("#table");

const button = document.querySelector("#buttonAdd");

const borrarTodo = function (idTodo) {
  const index = defaultTodo.findIndex((ele) => ele.id == idTodo);
  defaultTodo.splice(index, 1);
  render();
};

const updateCheckbox = function () {
  checkboxList.forEach((checkbox) => {
    checkbox.addEventListener("change", function () {
      defaultTodo.forEach((todo) => {
        if (todo.id == this.value) {
          todo.completado = this.checked;
        }
      });
      todoRealizado = defaultTodo.filter((todo) => todo.completado === true);
      realizado.innerHTML = todoRealizado.length;
    });
  });
};

const render = function () {
  //Limpiamos tabla antes de renderizar.
  table.innerHTML = "";
  let template = "";

  total.innerHTML = defaultTodo.length;
  todoRealizado = defaultTodo.filter((todo) => todo.completado === true);
  realizado.innerHTML = todoRealizado.length;

  for (const todo of defaultTodo) {
    let check = "";
    if (todo.completado === true) {
      check = "checked";
    }

    template = `
          <tr>
              <td>${todo.id}</td> 
              <td>${todo.tarea}</td>
              <td><input class="form-check-input" value='${todo.id}' type="checkbox" name="checkboxTodo" ${check}></td>
              <td><i onclick="borrarTodo(${todo.id})" class="fa-solid fa-rectangle-xmark"></i></td>
          </tr>`;
    table.innerHTML += template;
  }

  checkboxList = document.querySelectorAll("input[name=checkboxTodo]");
  updateCheckbox();
};

render();

//funcion actualizar realizado.

button.addEventListener("click", function () {
  //obtenemos la informacion del campo de texto.
  const texto = document.querySelector("#texto");

  if (texto.value !== "") {
    const todo = {
      id: id,
      tarea: texto.value,
      completado: false,
    };
    defaultTodo.push(todo);

    render();
    //limpiamos el campo de texto despues de apretar el boton.
    texto.value = "";
    id++;
  }
});
