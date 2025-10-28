const STORAGE_KEY = "tickets"

export function getTickets() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]")
}

export function createTicket(data) {
  const tickets = getTickets()
  const newTicket = {
    ...data,
    id: Date.now()
  }
  tickets.push(newTicket)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tickets))
  return newTicket
}

export function updateTicket(id, changes) {
  const tickets = getTickets()
  const updated = tickets.map((t) => (t.id === id ? { ...t, ...changes } : t))
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
  return updated.find((t) => t.id === id)
}

export function deleteTicket(id) {
  const tickets = getTickets().filter((t) => t.id !== id)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tickets))
}
