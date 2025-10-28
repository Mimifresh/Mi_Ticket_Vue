// ✅ Allowed statuses
export const ALLOWED_STATUSES = ["open", "in_progress", "closed"]

// ✅ Validate title
export function validateTitle(title) {
  if (!title || !String(title).trim()) {
    return "Title is required"
  }
  if (title.trim().length < 3) {
    return "Title must be at least 3 characters long"
  }
  if (title.trim().length > 120) {
    return "Title must be less than 120 characters long"
  }
  return ""
}

// ✅ Validate status
export function validateStatus(status) {
  if (!status || !String(status).trim()) {
    return "Status is required"
  }
  if (!ALLOWED_STATUSES.includes(status)) {
    return `Status must be one of: ${ALLOWED_STATUSES.join(", ")}`
  }
  return ""
}

// ✅ Validate description
export function validateDescription(description) {
  if (description && description.length > 2000) {
    return "Description must be less than 2000 characters long"
  }
  return ""
}

// ✅ Validate priority (1–5)
export function validatePriority(priority) {
  if (priority === undefined || priority === null || priority === "") {
    return "" // Optional field
  }

  const num = Number(priority)
  if (Number.isNaN(num)) {
    return "Priority must be a number."
  }

  if (num < 1 || num > 5) {
    return "Priority must be between 1 and 5."
  }

  return ""
}

// ✅ Validate all ticket form fields
export function validateTicketForm({ title, status, description, priority }) {
  return {
    title: validateTitle(title),
    status: validateStatus(status),
    description: validateDescription(description),
    priority: validatePriority(priority)
  }
}

// ✅ Helper: check if entire form is valid
export function isFormValid(form) {
  const errors = validateTicketForm(form)
  return Object.values(errors).every((v) => v === "")
}
