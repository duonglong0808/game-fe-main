export * from './baseAxios';
export * from './wskInstance';

export function formatTime(date: Date) {
  const addLeadingZero = (number: number) => (number < 10 ? '0' + number : number); // Hàm để thêm số 0 phía trước nếu cần

  const day = addLeadingZero(date.getDate()); // Lấy ngày
  const month = addLeadingZero(date.getMonth() + 1); // Lấy tháng (chú ý thêm 1 vì tháng bắt đầu từ 0)
  const year = date.getFullYear(); // Lấy năm

  const hours = addLeadingZero(date.getHours()); // Lấy giờ
  const minutes = addLeadingZero(date.getMinutes()); // Lấy phút

  return `${day}-${month} ${hours}:${minutes}`; // Trả về chuỗi đã được định dạng
}

export function isValidPhoneNumber(phoneNumber: string) {
  // Loại bỏ các ký tự không phải số từ chuỗi số điện thoại
  const cleanedPhoneNumber = phoneNumber.replace(/\D/g, '');

  // Kiểm tra xem số điện thoại sau khi làm sạch có độ dài hợp lệ không
  const phoneNumberLength = cleanedPhoneNumber.length;
  if (phoneNumberLength < 10 || phoneNumberLength > 11) {
    return false;
  }

  // Kiểm tra xem số điện thoại có bắt đầu bằng 0 hoặc 84 không (đối với số điện thoại Việt Nam)
  if (!/^0|^84/.test(cleanedPhoneNumber)) {
    return false;
  }
  return true;
}

export function setCookie(name: string, value: string, days: number) {
  let expires = '';
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = '; expires=' + date.toUTCString();
  }
  document.cookie = name + '=' + (value || '') + expires + '; path=/';
}

// Hàm để lấy cookie
export function getCookie(name: string) {
  const nameEQ = name + '=';
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') {
      c = c.substring(1, c.length);
    }
    if (c.indexOf(nameEQ) === 0) {
      return c.substring(nameEQ.length, c.length);
    }
  }
  return null;
}

export async function copyTextToClipboard(textToCopy: string) {
  try {
    if (navigator?.clipboard?.writeText) {
      await navigator.clipboard.writeText(textToCopy);
    }
  } catch (err) {
    console.error(err);
  }
}
