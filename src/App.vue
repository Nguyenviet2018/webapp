<template>
  <div id="app">
    <header class="navbar">
      <div class="logo">My App</div>
      <nav>
        <router-link to="/">Trang Chủ</router-link> |
        <router-link to="/about">Giới Thiệu</router-link> |
		<router-link to="/login">Đăng nhập</router-link> |
		<router-link to="/logout">Logout</router-link>
		
      </nav>
	
		
    </header>

    <main class="content">
      <router-view />
	  
    </main>

    <footer class="footer">
      <p>&copy; 2026 MyApp</p>
    </footer>
  </div>
</template>

<script setup>
//import { useCounterStore } from './stores/useCounterStore'; 

// (Nếu file App.vue và thư mục stores nằm cùng cấp trong src)
//const store = useCounterStore();


</script>

<style>
/* Reset cơ bản */
* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f4f9; }

/* Navbar */
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: #42b983;
  color: white;
}

.navbar a {
  color: white;
  margin-left: 15px;
  text-decoration: none;
  font-weight: bold;
}

.navbar a:hover { text-decoration: underline; }

/* Main Content */
.content {
  padding: 2rem;
  min-height: 80vh;
  max-width: 800px;
  margin: 0 auto;
}

/* Footer */
.footer {
  text-align: center;
  padding: 1rem;
  background-color: #333;
  color: white;
  margin-top: 2rem;
}
</style>