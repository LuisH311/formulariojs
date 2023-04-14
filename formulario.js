function obtenerUsuarios() {
	return JSON.parse(localStorage.getItem("usuarios")) || [];
}

function guardarUsuarios(usuarios) {
	localStorage.setItem("usuarios", JSON.stringify(usuarios));
}

function agregarUsuario(usuario) {
	var tabla = document.querySelector("#tabla tbody");
	let fila = document.createElement("tr");
	fila.innerHTML = `<td>${usuario.nombre}</td>
					 <td>${usuario.apellido}</td>
					 <td>${usuario.cedula}</td>
					 <td>${usuario.email}</td>
					 <td>${usuario.telefono}</td>`;
	tabla.appendChild(fila);
}

document.addEventListener("Loaded", function() {
    let formulario = document.querySelector("#formulario");

    formulario.addEventListener("submit", function(event) {
        event.preventDefault();
        validarFormulario();
    });
});

function mostrarUsuarios() {
	let usuarios = obtenerUsuarios();
	let tabla = document.querySelector("#tabla tbody");
	tabla.innerHTML = "";
	usuarios.forEach(function(usuario) {
		agregarUsuario(usuario);
	});
}

function validarFormulario() {
	let formulario = document.querySelector("#formulario");
	let nombre = formulario.querySelector("#nombre");
	let apellido = formulario.querySelector("#apellido");
	let cedula = formulario.querySelector("#cedula");
	let email = formulario.querySelector("#email");
	let telefono = formulario.querySelector("#telefono");
	let mensajeError = "";

	if (nombre.value.trim() === "" || apellido.value.trim() === "" || cedula.value.trim() === "" || email.value.trim() === "" || telefono.value.trim() === "") {
		mensajeError = "Por favor llenar todos los campos.";
	}

	if (!(/^\d+$/.test(cedula.value))) {
		mensajeError = "El campo de cédula sólo debe contener números.";
	}

	var usuarios = obtenerUsuarios();
	if (usuarios.find(function(usuario) { return usuario.cedula === cedula.value })) {
		mensajeError = "Ya existe un usuario con esa cédula.";
	}

	if (mensajeError !== "") {
		let mensaje = document.createElement("div");
		mensaje.classList.add("error");
		mensaje.textContent = mensajeError;
		formulario.appendChild(mensaje);
		return false;
	}

	let usuario = {
		nombre: nombre.value,
		apellido: apellido.value,
		cedula: cedula.value,
		email: email.value,
		telefono: telefono.value
	};

	var usuarios = obtenerUsuarios();
	usuarios.push(usuario);
	guardarUsuarios(usuarios);
	agregarUsuario(usuario);

	formulario.reset();

	return false;
}

let botonListar = document.querySelector("#listar");
botonListar.addEventListener("click", mostrarUsuarios);

mostrarUsuarios();

let formulario = document.querySelector("#formulario");
formulario.addEventListener("submit", validarFormulario);