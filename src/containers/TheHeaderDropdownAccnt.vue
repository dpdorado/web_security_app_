<template>
  <CDropdown
    inNav
    class="c-header-nav-items"
    placement="bottom-end"
    add-menu-classes="pt-0"
  >
    <template #toggler>
      <CHeaderNavLink>
        <div class="c-avatar">
          <img
            src="img/avatars/6.jpg"
            class="c-avatar-img "
          />
        </div>
      </CHeaderNavLink>
    </template>
    <CDropdownHeader tag="div" class="text-center" color="light">
      <strong>Account</strong>
    </CDropdownHeader>
    <CDropdownItem>
      <CIcon name="cil-bell"/> Updates
      <CBadge color="info" class="mfs-auto">{{ itemsCount }}</CBadge>
    </CDropdownItem>
    <CDropdownItem>
      <CIcon name="cil-envelope-open" /> Messages
      <CBadge color="success" class="mfs-auto">{{ itemsCount }}</CBadge>
    </CDropdownItem>
    <CDropdownItem>
      <CIcon name="cil-task" /> Tasks
      <CBadge color="danger" class="mfs-auto">{{ itemsCount }}</CBadge>
    </CDropdownItem>
    <CDropdownItem>
      <CIcon name="cil-comment-square" /> Comments
      <CBadge color="warning" class="mfs-auto">{{ itemsCount }}</CBadge>
    </CDropdownItem>
    <CDropdownHeader
      tag="div"
      class="text-center"
      color="light"
    >
      <strong>Settings</strong>
    </CDropdownHeader>
    <CDropdownItem>
      <CIcon name="cil-user" /> Profile
    </CDropdownItem>
    <CDropdownItem>
      <CIcon name="cil-settings" /> Settings
    </CDropdownItem>
    <CDropdownItem>
      <CIcon name="cil-dollar" /> Payments
      <CBadge color="secondary" class="mfs-auto">{{ itemsCount }}</CBadge>
    </CDropdownItem>
    <CDropdownItem>
      <CIcon name="cil-file" /> Projects
      <CBadge color="primary" class="mfs-auto">{{ itemsCount }}</CBadge>
    </CDropdownItem>
    <CDropdownDivider/>
    <CDropdownItem>
      <CIcon name="cil-shield-alt" /> Lock Account
    </CDropdownItem>
    <CDropdownItem>
      <a v-on:click="logout()"><CIcon name="cil-lock-locked" /> Logout</a>      
    </CDropdownItem>
    
  </CDropdown>
</template>

<script>
import axios from "axios";
import Vuex from "vuex";
export default {
  name: 'TheHeaderDropdownAccnt',
   data() {
    return {     
        errored_l: false,
        errors_l: [],
        succed_l: true,
        success_l: [],
        loading_l: false, 
        _config: {
          headers: { 
              Authorization: 'Bearer ' 
          }
        },
        _user : {
            token: '',
            userid: -1,
            username: '',
            email: '',
            name: '',      
            last_name: '',
            is_logged: false
        },
      send_user : {
        username: '',
        password: ''
      },
      itemsCount: 42
    }
  },
  computed: {
    ...Vuex.mapState("StoreGlobal", ["user", "config"]),
    ...Vuex.mapGetters("StoreGlobal", ["get_user", "get_config"]), 
  },
  methods: {    
    ...Vuex.mapActions("StoreGlobal", ["change_user", "change_config"]),
     logout(){
        const path = this.$server+'/logout/'; 
        
        axios.get(path, {
                    params: {
                        token: this._user.token                        
                    }
                }).then(response => {  
                                             
            this.redirect_home();
        }).catch(error => {
            console.log('error');
        }).finally(() => this.loading_l=false)        
    },
    redirect_home(){
      localStorage.setItem('token', 'NaN');
      localStorage.setItem('userid', -1);
      localStorage.setItem('username', 'NaN');
      localStorage.setItem('email', 'NaN');
      localStorage.setItem('name', 'NaN');
      localStorage.setItem('last_name', 'NaN');
      localStorage.setItem('is_logged', 0);   
      var config =  {
        headers: { 
          Authorization: 'Bearer ' 
        }
      }      
      localStorage.setItem('config', JSON.stringify(config));
      this.$router.push('/home');
    }
  },
  mounted() {
    let token = localStorage.getItem('token');
    let userid = localStorage.getItem('userid');
    let username = localStorage.getItem('username');
    let email = localStorage.getItem('email');
    let name = localStorage.getItem('name');
    let last_name = localStorage.getItem('last_name');
    let is_logged = localStorage.getItem('is_logged');    
    this._user = {
        token: token,
        userid: userid,
        username: username,
        email: email,
        name: name,      
        last_name: last_name,
        is_logged: is_logged
    };
  }
}
</script>

<style scoped>
  .c-icon {
    margin-right: 0.3rem;
  }
</style>