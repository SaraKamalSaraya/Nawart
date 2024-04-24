import { t } from "i18next";
import Swal from "sweetalert2";



export default function SwalShowAlert  (icon, title) {
  Swal.fire({
    position: "center",
    icon,
    title : t(title),
    showConfirmButton: true,
    confirmButtonText: t("Continue"),
    confirmButtonColor: "#0b81b9",
  });
};