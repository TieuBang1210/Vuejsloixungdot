<template>
    <div>
      <!-- Header -->
      <b-navbar toggleable="lg" type="dark" variant="secondary">
  
        <b-navbar-brand href="#">DML </b-navbar-brand>
        <b-nav>
          <b-nav-item @click="toggleSidebar" variant="secondary">Menu</b-nav-item>
          <b-nav-item href="#">Operation</b-nav-item>
          <b-nav-item href="#">Dashboards</b-nav-item>
          <b-nav-item href="#">Settings</b-nav-item>
              
        </b-nav>  
      </b-navbar>
    
      <!-- Sidebar -->
      <b-sidebar id="sidebar" title="Setting Module">
        <b-nav>
          <b-nav-item-dropdown text="Andon Module" left>
            <router-link 
            to="/Andon" 
            tag="b-dropdown-item"  
            exactActiveClass="active">Issuaes Types</router-link>
            <router-link
            to="/Perpormance" 
            tag="b-dropdown-item"  
            exactActiveClass="active">Issuaes</router-link>
            <router-link
            to="/TableList" 
            tag="b-dropdown-item"  
            exactActiveClass="active">Tablee</router-link>
          </b-nav-item-dropdown>
          <b-nav-item href="#">E-PERPORMANCE Module           
          </b-nav-item>
       
        </b-nav>
      </b-sidebar>
  
      <!-- Nội dung chính -->

      
 
    </div>
  </template>
  
  <script>
  
  
 
  import { RouterView } from 'vue-router';
  export default {
    methods: {
          toggleSidebar() {
              this.$root.$emit('bv::toggle::collapse', 'sidebar');
          },
        },
      components: { RouterView }
  };
  
  
  </script>
  
  

