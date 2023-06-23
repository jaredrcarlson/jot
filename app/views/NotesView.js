export const NotesView = /*html*/`
    <section class="container-fluid text-bg-dark vh-100">
        <div class="row">
            <div class="col-12">
            <div class="p-2">
                <i class="logo-icon mdi mdi-alpha-j-circle-outline"></i>
                <i class="logo-icon mdi mdi-alpha-o-circle-outline"></i>
                <i class="logo-icon mdi mdi-alpha-t-circle-outline"></i>
            </div>
            </div>
        </div>

        <div class="row justify-content-around">

            <!-- SECTION Note List Pane -->
            <div class="col-3 mb-5 border border-2 border-secondary rounded">
                <div id="list-items" class="p-2"></div>
            </div>

            <!-- SECTION Active Note Pane -->
            <div class="col-8 mb-5 border border-2 border-secondary rounded">
                <div id="active-item" class="p-2"></div>
            </div>

        </div>
    </section>
`