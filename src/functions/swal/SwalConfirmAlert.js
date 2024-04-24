import { t } from "i18next";
import Swal from "sweetalert2";

export default function SwalConfirmAlert(titles, icon, run) {
  const currentTitles = titles?.map((title) => t(title) + "<br>" );

  Swal.fire({
    title: currentTitles?.map((title) => title.toString()),
    icon,
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    cancelButtonText: t("Cancel"),
    confirmButtonText: t("Yes"),
  }).then(async (result) => {
    if (result.isConfirmed) {
      await run();
    }
  });
}
