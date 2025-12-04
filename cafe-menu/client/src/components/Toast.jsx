import { toast } from 'react-hot-toast';
export const showSuccess = (message) => toast.success(message, {
  style: { fontFamily: '"Vazirmatn", sans-serif', direction: 'rtl' },
  iconTheme: { primary: '#4caf50', secondary: 'white' },
});
export const showError = (message) => toast.error(message, {
  style: { fontFamily: '"Vazirmatn", sans-serif', direction: 'rtl' },
});