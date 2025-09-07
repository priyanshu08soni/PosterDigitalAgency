class AnimatedPoster {
    constructor() {
      this.currentPage = 1
      this.totalPages = 2
      this.transitionDuration = 6000 // 6 seconds per page
      this.init()
    }
  
    init() {
      this.startAutoRotation()
      this.addMouseInteraction()
    }
  
    startAutoRotation() {
      setInterval(() => {
        this.nextPage()
      }, this.transitionDuration)
    }
  
    nextPage() {
      const currentPageEl = document.getElementById(`page${this.currentPage}`)
  
      // Add exit animation to current page
      currentPageEl.classList.add("exit")
      currentPageEl.classList.remove("active")
  
      // Calculate next page
      this.currentPage = this.currentPage === this.totalPages ? 1 : this.currentPage + 1
  
      // Show next page after a brief delay
      setTimeout(() => {
        const nextPageEl = document.getElementById(`page${this.currentPage}`)
  
        // Reset all pages
        document.querySelectorAll(".page").forEach((page) => {
          page.classList.remove("active", "exit")
        })
  
        // Activate next page
        nextPageEl.classList.add("active")
  
        // Trigger animations for service cards if on page 2
        if (this.currentPage === 2) {
          this.animateServiceCards()
        }
      }, 500)
    }
  
    animateServiceCards() {
      const cards = document.querySelectorAll(".service-card")
      cards.forEach((card, index) => {
        card.style.animation = "none"
        card.offsetHeight // Trigger reflow
        card.style.animation = `slideInUp 1s ease-out ${index * 0.2}s forwards`
      })
    }
  
    addMouseInteraction() {
      // Add subtle mouse interaction for enhanced experience
      document.addEventListener("mousemove", (e) => {
        const spotlight = document.querySelector(".spotlight")
        const x = (e.clientX / window.innerWidth) * 100
        const y = (e.clientY / window.innerHeight) * 100
  
        spotlight.style.background = `radial-gradient(circle at ${x}% ${y}%, rgba(100, 255, 218, 0.2) 0%, transparent 50%)`
      })
    }
  }
  
  // Initialize the animated poster when DOM is loaded
  document.addEventListener("DOMContentLoaded", () => {
    new AnimatedPoster()
  })
  
  // Add some dynamic background effects
  function createParticles() {
    const container = document.querySelector(".floating-elements")
  
    for (let i = 0; i < 5; i++) {
      const particle = document.createElement("div")
      particle.className = "floating-circle"
      particle.style.width = Math.random() * 60 + 20 + "px"
      particle.style.height = particle.style.width
      particle.style.left = Math.random() * 100 + "%"
      particle.style.top = Math.random() * 100 + "%"
      particle.style.animationDelay = Math.random() * 6 + "s"
      particle.style.animationDuration = Math.random() * 4 + 4 + "s"
  
      container.appendChild(particle)
  
      // Remove particle after animation
      setTimeout(() => {
        if (particle.parentNode) {
          particle.parentNode.removeChild(particle)
        }
      }, 10000)
    }
  }
  
  // Create particles periodically
  setInterval(createParticles, 3000)
  createParticles() // Initial particles
  