  const getMinDate = (dateStr?: string): string => {
    const baseDate = dateStr ? new Date(dateStr) : new Date(Date.now());
    baseDate.setDate(baseDate.getDate() + 1);
    return baseDate.toISOString().split('T')[0];
  };
  export default getMinDate