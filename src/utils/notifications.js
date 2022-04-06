import { toast } from 'react-toastify';

export function pushNotification(msg, type, position, duration) {
  if (type === 'info') {
    return toast.info(msg, {
      position: position ? toast.POSITION[position] : toast.POSITION.TOP_CENTER,
      autoClose: duration || 3000,
      pauseOnFocusLoss: true,
      pauseOnHover: false,
      newestOnTop: true,
    });
  } else if (type === 'success') {
    return toast.success(msg, {
      position: position ? toast.POSITION[position] : toast.POSITION.TOP_CENTER,
      autoClose: duration || 3000,
      pauseOnFocusLoss: true,
      pauseOnHover: false,
      newestOnTop: true,
    });
  } else if (type === 'warning') {
    return toast.warn(msg, {
      position: position ? toast.POSITION[position] : toast.POSITION.TOP_CENTER,
      autoClose: duration || 3000,
      pauseOnFocusLoss: true,
      pauseOnHover: false,
      newestOnTop: true,
    });
  } else if (type === 'error') {
    return toast.error(msg, {
      position: position ? toast.POSITION[position] : toast.POSITION.TOP_CENTER,
      autoClose: duration || 3000,
      pauseOnFocusLoss: true,
      pauseOnHover: false,
      newestOnTop: true,
    });
  } else {
    return toast.info(msg, {
      position: position ? toast.POSITION[position] : toast.POSITION.TOP_CENTER,
      autoClose: duration || 3000,
      pauseOnFocusLoss: true,
      pauseOnHover: false,
      newestOnTop: true,
    });
  }
}
