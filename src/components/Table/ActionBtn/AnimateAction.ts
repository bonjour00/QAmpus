import Swal from 'sweetalert2';

export const successs = (title: string) => {
  Swal.fire({
    showConfirmButton: false,
    title,
    icon: 'success',
    timer: 1200,
  });
};
