<template>
  <div class="landing-page">
    <header class="header container">
      <nav class="nav-bar">
        <div class="logo-section">
          <a>
            <img alt="Tsuru Logo" class="logo" src="data:image/png;base64,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">
            <span class="brand-name">App Engine</span>
          </a>
        </div>
        
        <div class="auth-buttons">
          <q-btn 
            v-if="isAuthenticated" 
            label="Logout" 
            color="primary"
            size="lg"
            @click="logout"
            class="auth-btn"
          />
          <q-btn 
            v-else 
            label="Login" 
            color="primary"
            size="lg"
            @click="login"
            class="auth-btn"
          />
        </div>
      </nav>

      <div class="header-content">
        <h1 class="main-title">Platform as a Service</h1>
        <h2 class="subtitle">Deploy and scale your applications effortlessly with our open-source PaaS solution</h2>
      </div>
    </header>

    <section class="tools">
      <div class="container">
        <h2 class="section-title">Platform Features</h2>
        <p class="section-description">Explore our comprehensive suite of cloud services</p>
        <div class="categories">
  <a href="/" class="category-item">
    <p class="icon">🚀</p>
    <p class="name">Quick Deployment</p>
  </a>
  <a href="/" class="category-item">
    <p class="icon">⚡</p>
    <p class="name">Auto Scaling</p>
  </a>
  <a href="/" class="category-item">
    <p class="icon">📊</p>
    <p class="name">Monitoring</p>
  </a>
  <a href="/" class="category-item">
    <p class="icon">🔒</p>
    <p class="name">Security</p>
  </a>
  <a href="/" class="category-item">
    <p class="icon">💾</p>
    <p class="name">Databases</p>
  </a>
  <a href="/" class="category-item">
    <p class="icon">🌐</p>
    <p class="name">Networking</p>
  </a>
  <a href="/" class="category-item">
    <p class="icon">📦</p>
    <p class="name">Container Management</p>
  </a>
  <a href="/" class="category-item">
    <p class="icon">📈</p>
    <p class="name">Analytics & Insights</p>
  </a>
</div>
      </div>
    </section>

    <footer class="footer">
      <div class="container">
        <div class="contact">
          <h2 class="section-title">Need Support?</h2>
          <p class="section-description">Have questions or need assistance? Our team is here to help!</p>
          <a class="contact-button" href="https://zalo.me/g/icduve203" target="_blank">Get Support</a>
        </div>
      </div>

      <div class="copyright">
        <div class="container">
          &copy;{{ new Date().getFullYear() }} App Engine
          &mdash; Open Source Cloud Platform
          &mdash; <a href="https://tsuru.github.io/docs/getting_started/install_gke/" target="_blank">Documentation</a>
        </div>
      </div>
    </footer>
  </div>
</template>

<style scoped>
.landing-page {
  font-family: 'Roboto', sans-serif;
  line-height: 1.6;
}

.nav-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
  margin-bottom: 2rem;
}

.logo-section {
  display: flex;
  align-items: center;
}

.logo-section a {
  display: flex;
  align-items: center;
  text-decoration: none;
  color: inherit;
}

.logo {
  height: 40px;
  width: auto;
}

.brand-name {
  font-size: 1.5rem;
  font-weight: bold;
  margin-left: 1rem;
}

.auth-btn {
  padding: 0.5rem 2rem;
  font-size: 1.1rem;
}

.header-content {
  text-align: center;
  padding: 4rem 0;
}

.main-title {
  font-size: 3rem;
  font-weight: bold;
  margin-bottom: 1rem;
  color: #2c3e50;
}

.subtitle {
  font-size: 1.5rem;
  color: #666;
  max-width: 800px;
  margin: 0 auto;
}

.section-title {
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
  color: #2c3e50;
}

.section-description {
  font-size: 1.3rem;
  color: #666;
  margin-bottom: 2rem;
}

.categories {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 2rem;
  padding: 2rem 0;
}

.category-item {
  text-decoration: none;
  color: inherit;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  transition: transform 0.2s, box-shadow 0.2s;
}

.category-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 15px rgba(0,0,0,0.15);
}

.category-item .icon {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.category-item .name {
  font-size: 1.3rem;
  font-weight: 500;
}

.contact {
  text-align: center;
  padding: 4rem 0;
}

.contact-button {
  display: inline-block;
  padding: 1rem 2.5rem;
  font-size: 1.2rem;
  background-color: #3498db;
  color: white;
  text-decoration: none;
  border-radius: 6px;
  transition: background-color 0.2s;
}

.contact-button:hover {
  background-color: #2980b9;
}

.copyright {
  background-color: #f8f9fa;
  padding: 2rem 0;
  text-align: center;
  font-size: 1.1rem;
  color: #666;
}

.copyright a {
  color: #3498db;
  text-decoration: none;
}

.copyright a:hover {
  text-decoration: underline;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}
</style>

<script>
import { useAuth0 } from '@auth0/auth0-vue'

export default {
  name: 'LoginPage',
  setup () {
    const auth0 = useAuth0()
    const { isAuthenticated } = auth0
    const login = () => {
      auth0.loginWithRedirect({
        target: '/dashboard'
      })
    }
    const logout = () => {
      auth0.logout(
        {
          returnTo: window.location.origin
        }
      )
    }
    return { login, logout, isAuthenticated }
  }
}
</script>

<style>
@import './styles.css';
</style>