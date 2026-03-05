export function calculateTrend(
  current: number,
  previous: number,
  label: string = "last period",
) {
  if (!previous) {
    return {
      text: current ? `+100% from ${label}` : `0% from ${label}`,
      isPositive: true,
    };
  }

  const change = ((current - previous) / previous) * 100;
  const rounded = Math.round(change);

  return {
    text: `${rounded > 0 ? "+" : ""}${rounded}% from ${label}`,
    isPositive: change >= 0,
  };
}
