<template>
  <div class="container">
    Listar
    <div class="card">
      <div class="card-header">Clientes</div>
      <div class="card-body">
        <table class="table">
          <thead>
            <tr>
              <th>Id_cliente</th>
              <th>Nombre completo</th>
              <th>Correo</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="cliente in clientes" :key="cliente.id_cliente">
              <td>{{ cliente.id_cliente }}</td>
              <td>{{ `${cliente.nombre_cliente} ${cliente.apellido_paterno_cliente} ${cliente.apellido_materno_cliente}` }}</td>
              <td>{{ cliente.correo }}</td>
              <td>
                <div class="btn-group" role="group" aria-label="">
                  <router-link 
                    :to="{name:'editar', params:{id_cliente: cliente.id_cliente}}"
                    class="btn btn-warning">
                    Editar
                  </router-link>
                  <button
                    type="button"
                    v-on:click="borrarCliente(cliente.id_cliente)"
                    class="btn btn-danger"
                  >
                    Eliminar
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      clientes: [],
    };
  },
  created: function () {
    this.consultarEmpleados();
  },
  methods: {
    // localhost:8081
    consultarEmpleados() {
      fetch(`${process.env.VUE_APP_BASE_URL}/clientes/get`)
        .then((res) => res.json())
        .then((data) => {
          this.clientes = [];
          if (data.ok) {
            this.clientes = data.clientes;
          }
        })
        .catch(console.log);
    },
    borrarCliente(id_cliente) {
      fetch(`${process.env.VUE_APP_BASE_URL}/clientes/status`, {
        method: 'POST',
        mode: 'cors',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id_cliente,
          estatus: 0,
        }),
      })
        .then((res) => res.json())
        .then((respuesta) => {
          if (respuesta.ok) {
            this.$swal({
              title: 'Success!',
              text: 'Cliente borrado',
              icon: 'success',
            });
            window.location.href="listar"
          } else {
            this.$swal({
              title: 'Error!',
              text: 'Un error ha ocurrido',
              icon: 'error',
            });
          }
        })
        .catch(err => {
            console.log(err);
            this.$swal({
              title: 'Error!',
              text: 'Un error ha ocurrido',
              icon: 'error',
            });
        });
    },
  },
  components: {},
};
</script>
