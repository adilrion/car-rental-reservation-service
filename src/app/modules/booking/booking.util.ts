export function calculateTotalCost(
  startTime: string,
  endTime: string,
  pricePerHour: number,
): number {
  // Convert startTime and endTime to hours
  const startHour: number = parseInt(startTime.split(':')[0])
  const endHour: number = parseInt(endTime.split(':')[0])

  // Calculate the duration in hours
  const duration: number = endHour - startHour

  // Calculate the total cost
  const totalCost: number = duration * pricePerHour

  return totalCost
}
