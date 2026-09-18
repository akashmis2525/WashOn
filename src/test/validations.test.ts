export const validateIndianMobile = (phone: string): boolean => {
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length === 12 && cleaned.startsWith('91')) {
    return /^[6-9]\d{9}$/.test(cleaned.substring(2));
  }
  return /^[6-9]\d{9}$/.test(cleaned);
};

export const validateIndianPincode = (pincode: string): boolean => {
  return /^[1-9][0-9]{5}$/.test(pincode.trim());
};

export const validateIndianVehicleNumber = (vehicleNo: string): boolean => {
  const normalized = vehicleNo.replace(/\s+/g, '').toUpperCase();
  return /^[A-Z]{2}[0-9]{1,2}[A-Z]{1,3}[0-9]{4}$/.test(normalized);
};

export const calculatePriceBreakdown = (
  basePrice: number,
  addOnsTotal: number,
  platformFee: number = 20,
  taxRate: number = 0.18,
  discount: number = 0
) => {
  const subtotal = Math.max(0, basePrice + addOnsTotal);
  const tax = Math.round(subtotal * taxRate);
  const finalPayable = Math.max(0, subtotal + platformFee + tax - discount);
  return {
    subtotal,
    platformFee,
    tax,
    discount,
    finalPayable,
  };
};

function expect<T>(actual: T) {
  return {
    toBe: (expected: T) => {
      if (actual !== expected) {
        throw new Error(`Expected ${expected} but received ${actual}`);
      }
    },
  };
}

export function runValidationTests() {
  // Mobile tests
  expect(validateIndianMobile('8120652523')).toBe(true);
  expect(validateIndianMobile('+91 81206 52523')).toBe(true);
  expect(validateIndianMobile('9876543210')).toBe(true);
  expect(validateIndianMobile('1234567890')).toBe(false);

  // Pincode tests
  expect(validateIndianPincode('452001')).toBe(true);
  expect(validateIndianPincode('012345')).toBe(false);
  expect(validateIndianPincode('45200')).toBe(false);

  // Vehicle plate tests
  expect(validateIndianVehicleNumber('MP 09 AB 1234')).toBe(true);
  expect(validateIndianVehicleNumber('DL01C1234')).toBe(true);
  expect(validateIndianVehicleNumber('12345')).toBe(false);

  // Pricing tests
  const result = calculatePriceBreakdown(149, 0, 20, 0.18, 0);
  expect(result.subtotal).toBe(149);
  expect(result.platformFee).toBe(20);
  expect(result.tax).toBe(27);
  expect(result.finalPayable).toBe(196);

  return true;
}
