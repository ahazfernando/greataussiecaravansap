/** Australian states — values match contact form (`NSW`, `VIC`, …). */
export const AU_STATE_OPTIONS: { value: string; label: string }[] = [
  { value: "NSW", label: "New South Wales" },
  { value: "VIC", label: "Victoria" },
  { value: "QLD", label: "Queensland" },
  { value: "WA", label: "Western Australia" },
  { value: "SA", label: "South Australia" },
  { value: "TAS", label: "Tasmania" },
  { value: "NT", label: "Northern Territory" },
  { value: "ACT", label: "Australian Capital Territory" },
];

/** Inquiry subject values stored from contact form. */
export const INQUIRY_SUBJECT_OPTIONS: { value: string; label: string }[] = [
  { value: "quote", label: "Request a Quote" },
  { value: "inspection", label: "Book an Inspection" },
  { value: "factory-tour", label: "Request a Factory Tour" },
  { value: "general", label: "General Enquiry" },
  { value: "service", label: "Service & Parts" },
  { value: "other", label: "Other" },
];

const SUBJECT_LABEL_BY_VALUE: Record<string, string> = Object.fromEntries(
  INQUIRY_SUBJECT_OPTIONS.map((o) => [o.value, o.label])
);

/** Human-readable inquiry subject for admin UI. */
export function formatInquirySubject(raw: string | undefined): string {
  if (!raw?.trim()) return "No subject";
  const s = raw.trim();
  const lower = s.toLowerCase();
  if (SUBJECT_LABEL_BY_VALUE[s]) return SUBJECT_LABEL_BY_VALUE[s];
  if (SUBJECT_LABEL_BY_VALUE[lower]) return SUBJECT_LABEL_BY_VALUE[lower];
  return s;
}

export function inquiryMatchesStateFilter(
  state: string | undefined,
  filter: string
): boolean {
  if (filter === "all") return true;
  if (filter === "__none__") return !state?.trim();
  return (state || "").trim() === filter;
}

export function inquiryMatchesSubjectFilter(
  subject: string | undefined,
  filter: string
): boolean {
  if (filter === "all") return true;
  if (filter === "__none__") return !subject?.trim();
  const v = (subject || "").trim().toLowerCase();
  return v === filter.toLowerCase();
}
