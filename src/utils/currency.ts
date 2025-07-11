  export const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('th-TH', {
      style: 'currency',
      currency: 'THB',
      minimumFractionDigits: 2, // กำหนดให้มีทศนิยม 2 ตำแหน่งเสมอ
      maximumFractionDigits: 2,
    }).format(amount);
  };

  export const formatNumberWithCommas = (num: number) => {
    return new Intl.NumberFormat('en-US').format(num); // ใช้ 'en-US' เพื่อให้ได้ลูกน้ำเป็น comma
  };