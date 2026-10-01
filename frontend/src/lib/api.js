const API_URL = import.meta.env.VITE_API_URL;

function getRequestType(role, reason) {
  if (role === "student") return "INDIVIDUAL_MENTORSHIP";
  if (role === "college") {
    if (reason === "guest-lecture") return "GUEST_LECTURE";
    if (reason === "faculty-dev") return "WORKSHOP";
    return "COLLEGE_UNIVERSITY";
  }
  if (role === "industry") {
    if (reason === "corporate-training") return "WORKSHOP";
    return "INDUSTRY_ENGAGEMENT";
  }
  return "OTHER";
}

/**
 * contact: { name, email, phone }
 * role, reason: values from AUDIENCES / REASONS
 * detailValues: object of the DETAIL_FIELDS answers, e.g. { institutionName, topic, ... }
 */
export async function submitAppointment({ name, email, phone, role, reason, detailValues = {} }) {
  const { institutionName, companyName, preferredDate, priceNote, ...rest } = detailValues;

  const payload = {
    name,
    email,
    phone: phone || undefined,
    role,
    reason,
    requestType: getRequestType(role, reason),
    organizationName: institutionName || companyName || undefined,
    organizationType: role === "college" ? "university" : role === "industry" ? "company" : undefined,
    preferredDate: preferredDate || undefined,
    details: rest,
    source: "website",
  };

  const res = await fetch(`${API_URL}/api/appointments`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const detail = data.errors?.map((e) => `${e.field}: ${e.message}`).join(", ");
    throw new Error(detail || data.message || "Submission failed");
  }
  return data;
}