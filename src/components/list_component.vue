<template>
    <div class="container">
        Listar
        <div class="card">
            <div class="card-header">
                Clientes
            </div>
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
                            <td>{{cliente.id_cliente}}</td>
                            <td>{{cliente.nombre_cliente}}</td>
                            <td>{{cliente.correo}}</td>
                            <td>
                                <a class="btn btn-primary btn-sm " href="#" role="button">Listar</a>
                                <a class="btn btn-primary btn-sm " href="#" role="button">Borrar</a>
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
            clientes: []
        }
    },
    created:function() {
        this.consultarEmpleados();
    },
    methods: {
        // localhost:8081
        consultarEmpleados (){
            fetch('http://localhost:8081/clientes/get')
                .then( res => res.json())
                .then((data) => {
                    this.clientes=[];
                    if(data.ok){
                        this.clientes = data.clientes
                    }
                })
                .catch(console.log);
        }
    },
    components: {

    }
}
</script>