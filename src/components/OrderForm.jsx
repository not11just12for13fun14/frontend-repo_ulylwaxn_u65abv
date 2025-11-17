import { useMemo, useState } from 'react'

function OrderForm({ pizzas }) {
  const [selected, setSelected] = useState(null)
  const [qty, setQty] = useState(1)
  const [customer, setCustomer] = useState({ name: '', email: '', phone: '', address: '' })
  const [status, setStatus] = useState('')

  const price = useMemo(() => {
    const p = pizzas.find(x => x.id === selected)
    return p ? (p.price * qty) : 0
  }, [selected, qty, pizzas])

  const submit = async (e) => {
    e.preventDefault()
    setStatus('Placing order...')

    const pizza = pizzas.find(x => x.id === selected)
    if (!pizza) { setStatus('Please choose a pizza'); return }

    const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
    const payload = {
      items: [
        { pizza_id: pizza.id, name: pizza.name, price: pizza.price, quantity: qty }
      ],
      customer,
      subtotal: pizza.price * qty,
      tax: +(pizza.price * qty * 0.08).toFixed(2),
      total: +(pizza.price * qty * 1.08).toFixed(2),
      status: 'pending'
    }

    try {
      const res = await fetch(`${baseUrl}/api/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
      if (!res.ok) throw new Error('Order failed')
      const data = await res.json()
      setStatus(`🎉 Order placed! ID: ${data.id}`)
    } catch (e) {
      setStatus(`Error: ${e.message}`)
    }
  }

  return (
    <section id="order" className="bg-gradient-to-br from-red-50 to-amber-50 py-16">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-red-900">Quick Order</h2>
        <p className="text-red-800/70 mt-2">Pick a favorite and tell us where to deliver.</p>

        <form onSubmit={submit} className="mt-6 grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow ring-1 ring-red-100 p-4">
            <label className="block text-sm font-medium text-red-800">Choose Pizza</label>
            <select value={selected || ''} onChange={e => setSelected(e.target.value)} className="mt-1 w-full border-red-200 rounded-md focus:ring-red-400 focus:border-red-400">
              <option value="" disabled>-- Select --</option>
              {pizzas.map(p => (
                <option key={p.id} value={p.id}>{p.name} — ${p.price.toFixed(2)}</option>
              ))}
            </select>

            <label className="block text-sm font-medium text-red-800 mt-4">Quantity</label>
            <input type="number" min="1" max="50" value={qty} onChange={e => setQty(+e.target.value)} className="mt-1 w-24 border-red-200 rounded-md" />

            <div className="mt-4 text-red-900 font-semibold">Total: ${price.toFixed(2)}</div>
          </div>

          <div className="bg-white rounded-xl shadow ring-1 ring-red-100 p-4 grid grid-cols-1 gap-3">
            <input required placeholder="Full name" className="border-red-200 rounded-md px-3 py-2" value={customer.name} onChange={e=>setCustomer({...customer, name:e.target.value})} />
            <input required type="email" placeholder="Email" className="border-red-200 rounded-md px-3 py-2" value={customer.email} onChange={e=>setCustomer({...customer, email:e.target.value})} />
            <input placeholder="Phone" className="border-red-200 rounded-md px-3 py-2" value={customer.phone} onChange={e=>setCustomer({...customer, phone:e.target.value})} />
            <textarea required placeholder="Delivery address" className="border-red-200 rounded-md px-3 py-2" value={customer.address} onChange={e=>setCustomer({...customer, address:e.target.value})} />
            <button type="submit" className="mt-2 px-6 py-3 rounded-lg bg-red-600 hover:bg-red-700 text-white font-semibold">Place Order</button>
            {status && <p className="text-sm text-red-800/80">{status}</p>}
          </div>
        </form>
      </div>
    </section>
  )
}

export default OrderForm
