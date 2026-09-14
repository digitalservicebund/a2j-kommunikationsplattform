const dateFormat = new Intl.DateTimeFormat("de-DE", {
  dateStyle: "medium",
});

export function formatDate(date: Date | string): string {
  return dateFormat.format(new Date(date));
}
