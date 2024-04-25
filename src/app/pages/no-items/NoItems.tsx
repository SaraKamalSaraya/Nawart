import { t } from "i18next";
import { Link, useLocation } from "react-router-dom";
import { toAbsoluteUrl } from "../../../_metronic/helpers";


export default function NoItems() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const to = searchParams.get("to");
  return (
    <>
    <section className="d-flex flex-column justify-content-center gap-2 align-items-center">

      <img className="w-25" src={toAbsoluteUrl("/media/illustrations/sketchy-1/5.png")} alt="image" />

      <h1 className="fs-1">{t('There Is No Items')}</h1>
      <h5 className="fs-3">{t('Please Add New Item')}</h5>

      <Link className="btn" style={{backgroundColor:"#1085A4", color:"white"}} to={`/${to}/add`}>{t('Add Item')}</Link>
    </section>
    </>
  )
}