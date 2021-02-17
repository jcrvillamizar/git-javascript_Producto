
class Producto {
    constructor(nombre, precio, año) {
        this.nombre = nombre;
        this.precio = precio;
        this.año = año;
    }
}

//Crear producto
class UI {
    addProduct(producto) {
        const productList = document.getElementById('product-list');
        const element = document.createElement('div');
        element.innerHTML = `
            <div class="card text-center mb-4">
                <div class="card-body">
                    <strong>Nombre de Producto</strong>: ${producto.nombre}
                    <strong>Precio de Producto</strong>: ${producto.precio}
                    <strong>Año de Producto</strong>: ${producto.año}
                    <a href='#' class='btn btn-danger' name='delete'>Borrar</a>
                </div>
            </div>
        `;
        productList.appendChild(element);
    }

    //Resetear formulario (Campos en blanco)
    resetFormulario() {
        document.getElementById('product-form').reset();
    }

    //Eliminar producto
    deleteProduct(element) {
        if (element.name === 'delete') {
            element.parentElement.parentElement.parentElement.remove();
            this.showMessage('Producto borrado', 'info');
        }
    }
    //Mensaje informativo
    showMessage(message, cssClass) {
        const div = document.createElement('div');
        div.className = `alert alert-${cssClass}`; //+ cssClass;
        div.appendChild(document.createTextNode(message));
        //Mostrar mensaje en el DOM
        const container = document.querySelector('.container');
        const app = document.querySelector('#App');
        container.insertBefore(div, app);
        setTimeout(function () {
            document.querySelector('.alert').remove();
        }, 2000);
    }
}

// Eventos del DOM
document.getElementById('product-form').addEventListener('submit', function (e) {
    const nombre = document.getElementById('nombre').value;
    const precio = document.getElementById('precio').value;
    const año = document.getElementById('año').value;

    const producto = new Producto(nombre, precio, año);

    const interfaz = new UI();
    if (nombre === '' || precio === '' || año === '') {
        return interfaz.showMessage('Complete los campos', 'danger');
    }
    interfaz.addProduct(producto);
    interfaz.resetFormulario();
    interfaz.showMessage('Producto agregado', 'success')
    e.preventDefault();
});

document.getElementById('product-list').addEventListener('click', function (e) {
    const ui = new UI();
    ui.deleteProduct(e.target)
});

