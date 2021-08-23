<template>
    <div class="container col-md-4">
        <!-- <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <a class="navbar-brand" href="#">Vertical Navbar</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span class="navbar-toggler-icon"></span>
                        </button> -->
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto flex-column vertical-nav">
                <li class="nav-item">
                <a class="nav-link" href="#">Dashboard</a>
                </li>
                <li class="nav-item">
                <a class="nav-link" href="#">Pages</a>
                </li>
                <li class="nav-item">
                <a class="nav-link" href="#">Link</a>
                </li>
                <li class="nav-item">
                <a class="nav-link" href="#">Another Link</a>
                </li>
                <li class="nav-item">
                <a class="nav-link" href="#">Setting</a>
                </li>
            </ul>
            <!-- <ul class="navbar-nav ml-auto">
                <li class="nav-item">
                <a class="nav-link" href="#">Foo</a>
                </li>
                <li class="nav-item dropdown">
                <a
                    class="nav-link dropdown-toggle"
                    href="#"
                    id="navbarDropdown"
                    role="button"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                >
                    User
                </a>
                <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                    <a class="dropdown-item" href="#">Action</a>
                    <div class="dropdown-divider"></div>
                    <a class="dropdown-item" href="#">Log Out</a>
                </div>
                </li>
            </ul> -->
            </div>
        </nav>
    </div>
</template>

<script>
export default {
    name:'NavbarService',
    methods:{      
    }    
}


</script>

<style scoped>  
@media (min-width: 992px) {
  .vertical-nav {
    position: fixed;
    top: 56px;
    left: 0;
    width: 300px;
    height: 100%;
    background-color: #f8f8f8;
    overflow-y: auto;
    padding-top: 40px;
  }
}
</style>
