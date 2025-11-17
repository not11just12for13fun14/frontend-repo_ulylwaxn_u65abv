import { useEffect, useState, useRef } from 'react'
import Hero from './components/Hero'
import Menu from './components/Menu'
import OrderForm from './components/OrderForm'
import Footer from './components/Footer'

function App() {
  const [pizzas, setPizzas] = useState([])
  const orderRef = useRef(null)

  useEffect(() => {
    const load = async () => {
      try {
        const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
        const res = await fetch(`${baseUrl}/api/pizzas`)
        if (!res.ok) throw new Error('Failed to load pizzas')
        setPizzas(await res.json())
      } catch {
        // Fallback demo menu if backend is not seeded yet
        setPizzas([
          { id: '1', name: 'Margherita', description: 'Tomato, mozzarella, basil', price: 10, vegetarian: true, spicy: false },
          { id: '2', name: 'Pepperoni', description: 'Pepperoni, mozzarella', price: 12, vegetarian: false, spicy: false },
          { id: '3', name: 'Diavola', description: 'Spicy salami, chili, mozzarella', price: 13.5, vegetarian: false, spicy: true }
        ])
      }
    }
    load()
  }, [])

  const scrollToOrder = () => orderRef.current?.scrollIntoView({ behavior: 'smooth' })

  return (
    <div className="min-h-screen bg-white text-red-900">
      <header className="sticky top-0 bg-white/80 backdrop-blur z-10 border-b border-red-100">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <a href="/" className="font-extrabold text-xl">FirePie</a>
          <nav className="flex items-center gap-6 text-sm">
            <a href="#menu" className="hover:text-red-700">Menu</a>
            <a href="#order" className="hover:text-red-700">Order</a>
            <a href="/test" className="hover:text-red-700">Status</a>
          </nav>
        </div>
      </header>

      <Hero onOrderClick={scrollToOrder} />
      <Menu />
      <div ref={orderRef}><OrderForm pizzas={pizzas} /></div>
      <Footer />
    </div>
  )
}

export default App
