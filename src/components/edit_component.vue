<template>
  <div>
    Edición
    <div class="container">
      <div class="card">
        <div class="card-header">Editar cliente</div>
        <div class="card-body">
          <form v-on:submit.prevent="editarCliente">
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
              <button type="submit" class="btn btn-success">Editar</button>
              <router-link :to="{ name: 'listar' }" class="btn btn-danger"
                >Cancelar</router-link
              >
            </div>
          </form>
        </div>
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
  created: function () {
    this.consultarEmpleado();
  },
  methods: {
    consultarEmpleado() {
      fetch(
        `${process.env.VUE_APP_BASE_URL}/clientes/get?id_cliente=${this.$route.params.id_cliente}`
      )
        .then((res) => res.json())
        .then((data) => {
          if (data.ok) {
            this.cliente.id_cliente = data.clientes[0].id_cliente;
            this.cliente.nombre_cliente = data.clientes[0].nombre_cliente;
            this.cliente.apellido_paterno_cliente =
              data.clientes[0].apellido_paterno_cliente;
            this.cliente.apellido_materno_cliente =
              data.clientes[0].apellido_materno_cliente;
            this.cliente.correo = data.clientes[0].correo;
            this.cliente.edad = data.clientes[0].edad;
          }
        })
        .catch((err) => {
          console.log(err);
          this.$swal({
            title: 'Error!',
            text: 'Usuario no encontrado',
            icon: 'error',
            timer: 5000,
          }).then(() => {
            this.$router.push({name:"listar"});
          });
        });
    },
    editarCliente() {
      fetch(`${process.env.VUE_APP_BASE_URL}/clientes/edit`, {
        method: 'POST',
        mode: 'cors',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(this.cliente),
      })
      .then(res=>res.json())
      .then((resultado) => {
        if(resultado.ok){
          this.$swal({
            title: 'Succeso!',
            text: 'Usuario actualizado',
            icon: 'success',
            timer: 5000,
          }).then(() => {
            this.$router.push({name:"listar"});
          });
        }
      })
    },
  },
  components: {},
};
</script>
