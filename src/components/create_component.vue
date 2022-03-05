<template>
  Crear
  <div class="container">
    <div class="card">
      <div class="card-header">Agregar cliente</div>
      <div class="card-body">
        <form v-on:submit.prevent="agregarCliente">
          <div class="form-group">
            <label for="nombre_cliente">Nombre:</label>
            <input
              type="text"
              required
              class="form-control"
              name="nombre_cliente"
              v-model="cliente.nombre_cliente"
              id="nombre_cliente"
              aria-describedby="helpId"
              placeholder="Nombre"
            />
            <small id="helpId" class="form-text text-muted"
              >Nombre del cliente</small
            >
          </div>
          <div class="form-group">
            <label for="apellido_paterno_cliente">Apellido paterno:</label>
            <input
              type="text"
              required
              class="form-control"
              name="apellido_paterno_cliente"
              v-model="cliente.apellido_paterno_cliente"
              id="apellido_paterno_cliente"
              aria-describedby="helpId"
              placeholder="Apellido paterno"
            />
            <small id="helpId" class="form-text text-muted"
              >Apellido paterno del cliente</small
            >
          </div>
          <div class="form-group">
            <label for="apellido_materno_cliente">Apellido materno:</label>
            <input
              type="text"
              required
              class="form-control"
              name="apellido_materno_cliente"
              v-model="cliente.apellido_materno_cliente"
              id="apellido_materno_cliente"
              aria-describedby="helpId"
              placeholder="Apellido materno"
            />
            <small id="helpId" class="form-text text-muted"
              >Apellido materno del cliente</small
            >
          </div>
          <div class="form-group">
            <label for="email">Correo</label>
            <input
              type="email"
              required
              name="correo"
              id="correo"
              v-model="cliente.correo"
              class="form-control"
              placeholder="Correo"
              aria-describedby="helpId"
            />
            <small id="helpId" class="text-muted">Correo del cliente</small>
          </div>
          <div class="form-group">
            <label for="edad">Edad</label>
            <input
              type="number"
              required
              name="edad"
              id="edad"
              v-model="cliente.edad"
              class="form-control"
              placeholder="Edad"
              aria-describedby="helpId"
            />
            <small id="helpId" class="text-muted">Edad</small>
          </div>
          <div class="btn-group" role="group" aria-label="">
            <button type="submit" class="btn btn-success">Agregar</button>
            <router-link :to="{name:'listar'}" class="btn btn-danger">Cancelar</router-link>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      cliente: {
        id_cliente: null,
        nombre_cliente: '',
        apellido_paterno_cliente: '',
        apellido_materno_cliente: '',
        correo: '',
        edad: '',
        latitud: null,
        longitud: null,
      },
    };
  },
  methods: {
    agregarCliente() {
      console.log(JSON.stringify(this.cliente));
      fetch('http://localhost:8081/clientes/add', {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(this.cliente),
      })
        .then((res) => res.json())
        .then((respuesta) => {
          if (respuesta.ok) {
            this.$swal({
              title: 'Success!',
              text: 'Cliente agregado',
              icon: 'success',
            });
            this.cliente = {
              id_cliente: null,
              nombre_cliente: '',
              apellido_paterno_cliente: '',
              apellido_materno_cliente: '',
              correo: '',
              edad: '',
              latitud: null,
              longitud: null,
            };
          }
        })
        .catch((err) => {
          console.log(err);
          this.$swal({
            title: 'Error!',
            text: 'No se pudo agregar al cliente',
            icon: 'error',
          });
        });
    },
  },
};
</script>
