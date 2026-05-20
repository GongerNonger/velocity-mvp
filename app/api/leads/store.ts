// In-memory lead capture for the landing-page demo request form.
// Replace with a real CRM (HubSpot / Salesforce) or DB before production.

export interface Lead {
  id: string;
  createdAt: string;
  name: string;
  workEmail: string;
  institution: string;
  role: string;
  enrollmentRange: string;
  message: string | null;
  source: string;
}

export const leads: Lead[] = [];

export function recordLead(input: Omit<Lead, "id" | "createdAt">): Lead {
  const lead: Lead = {
    id: `LEAD-${String(leads.length + 1).padStart(4, "0")}`,
    createdAt: new Date().toISOString(),
    ...input,
  };
  leads.push(lead);
  return lead;
}
