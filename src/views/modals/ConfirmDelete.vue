<template>
    <!-- Modal -->
    <transition
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
    >
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                     <h5 class="modal-title">{{ modalHeadline }}</h5>
                     <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                     </button>
                </div>
                <div class="modal-body">{{ deleteMessage }}</div>
                <div class="modal-footer">
                    <button
                    type="button"
                    @click="deleteRecord"
                    class="btn-danger"
                    >
                    Eliminar
                    </button>
                    <button
                    type="button"
                    @click="close"
                    class="btn btn-primary"
                    >
                    Cancelar
                    </button>
                </div>
            </div>
        </div>
    </transition>

    <!--dd-->
</template>


<script>
    export default {
    name: "modal",
    props: {
        modalHeadline: {
            type: String,
            required: true,
        },
        deleteMessage: {
            type: String,
            required: true,
        },
    },
    methods: {
        close() {
            this.$emit("close");
        },
        deleteRecord() {
            this.$emit("deleteRecordEvent");
        },
    },
    };
</script>