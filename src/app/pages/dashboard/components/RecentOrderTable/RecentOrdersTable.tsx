import { Link, useNavigate } from 'react-router-dom'
import { t } from 'i18next'
import { AnalysesTap } from './AnalysisTap';

interface AnalysisBookings {
    id: number;
    user: { id: number; first_name: string; last_name: string; };
    analysis: { id: number; title: string; };
    analysis_group: { id: number; name: string; };
    medical_center: { id: number; name: string; };
    booking_date: string;
    status: string;
    notes: string;
    created_at: string;
    updated_at: string
}
interface RecentOrdersTableProps {
    analysisBookings: AnalysisBookings[],
}

const RecentOrdersTable: React.FC<RecentOrdersTableProps> = ({
    analysisBookings
}) => {
    const navigate = useNavigate()
    return (
        <div className="">
            <div className="card h-md-100">
                <div className="card-header align-items-center border-0">
                    <h3 className="fw-bold text-gray-900 m-0">{t('Recent Reservasions')}</h3>
                    <button className="btn btn-icon btn-color-gray-500 btn-active-color-primary justify-content-end" data-kt-menu-trigger="click" data-kt-menu-placement="bottom-end" data-kt-menu-overflow="true">
                        <i className="ki-duotone ki-dots-square fs-1"><span className="path1" /><span className="path2" /><span className="path3" /><span className="path4" /></i>
                    </button>
                </div>
                {/*begin::Body*/}
                <div className="card-body pt-2">
                    <ul className="nav nav-pills nav-pills-custom mb-3" role="tablist">
                        <li className="nav-item mb-3 me-3 me-lg-6" role="presentation">
                            <a className="nav-link d-flex justify-content-between flex-column flex-center overflow-hidden active w-80px h-85px py-4" data-bs-toggle="pill" href="#kt_stats_widget_2_tab_1" aria-selected="true" role="tab">
                                <div className="nav-icon">
                                    <img alt="" src="/metronic8/demo1/assets/media/svg/products-categories/t-shirt.svg" />
                                </div>
                                <span className="nav-text text-gray-700 fw-bold fs-6 lh-1">
                                    {t('Analyses')}
                                </span>
                                {/*end::Subtitle*/}
                                {/*begin::Bullet*/}
                                <span className="bullet-custom position-absolute bottom-0 w-100 h-4px bg-primary" />
                                {/*end::Bullet*/}
                            </a>
                            {/*end::Link*/}
                        </li>
                        {/*end::Item*/}
                        {/*begin::Item*/}
                        <li className="nav-item mb-3 me-3 me-lg-6" role="presentation">
                            {/*begin::Link*/}
                            <a className="nav-link d-flex justify-content-between flex-column flex-center overflow-hidden w-80px h-85px py-4" data-bs-toggle="pill" href="#kt_stats_widget_2_tab_2" aria-selected="false" tabIndex={-1} role="tab">
                                {/*begin::Icon*/}
                                <div className="nav-icon">
                                    <img alt="" src="/metronic8/demo1/assets/media/svg/products-categories/gaming.svg" />
                                </div>
                                {/*end::Icon*/}
                                {/*begin::Subtitle*/}
                                <span className="nav-text text-gray-700 fw-bold fs-6 lh-1">
                                    Gaming
                                </span>
                                {/*end::Subtitle*/}
                                {/*begin::Bullet*/}
                                <span className="bullet-custom position-absolute bottom-0 w-100 h-4px bg-primary" />
                                {/*end::Bullet*/}
                            </a>
                            {/*end::Link*/}
                        </li>
                        {/*end::Item*/}
                        {/*begin::Item*/}
                        <li className="nav-item mb-3 me-3 me-lg-6" role="presentation">
                            {/*begin::Link*/}
                            <a className="nav-link d-flex justify-content-between flex-column flex-center overflow-hidden w-80px h-85px py-4" data-bs-toggle="pill" href="#kt_stats_widget_2_tab_3" aria-selected="false" tabIndex={-1} role="tab">
                                {/*begin::Icon*/}
                                <div className="nav-icon">
                                    <img alt="" src="/metronic8/demo1/assets/media/svg/products-categories/watch.svg" />
                                </div>
                                {/*end::Icon*/}
                                {/*begin::Subtitle*/}
                                <span className="nav-text text-gray-600 fw-bold fs-6 lh-1">
                                    Watch
                                </span>
                                {/*end::Subtitle*/}
                                {/*begin::Bullet*/}
                                <span className="bullet-custom position-absolute bottom-0 w-100 h-4px bg-primary" />
                                {/*end::Bullet*/}
                            </a>
                            {/*end::Link*/}
                        </li>
                        {/*end::Item*/}
                        {/*begin::Item*/}
                        <li className="nav-item mb-3 me-3 me-lg-6" role="presentation">
                            {/*begin::Link*/}
                            <a className="nav-link d-flex justify-content-between flex-column flex-center overflow-hidden w-80px h-85px py-4" data-bs-toggle="pill" href="#kt_stats_widget_2_tab_4" aria-selected="false" tabIndex={-1} role="tab">
                                {/*begin::Icon*/}
                                <div className="nav-icon">
                                    <img alt="" src="/metronic8/demo1/assets/media/svg/products-categories/gloves.svg" className="nav-icon" />
                                </div>
                                {/*end::Icon*/}
                                {/*begin::Subtitle*/}
                                <span className="nav-text text-gray-600 fw-bold fs-6 lh-1">
                                    Gloves
                                </span>
                                {/*end::Subtitle*/}
                                {/*begin::Bullet*/}
                                <span className="bullet-custom position-absolute bottom-0 w-100 h-4px bg-primary" />
                                {/*end::Bullet*/}
                            </a>
                            {/*end::Link*/}
                        </li>
                        {/*end::Item*/}
                        {/*begin::Item*/}
                        <li className="nav-item mb-3" role="presentation">
                            {/*begin::Link*/}
                            <a className="nav-link d-flex justify-content-between flex-column flex-center overflow-hidden w-80px h-85px py-4" data-bs-toggle="pill" href="#kt_stats_widget_2_tab_5" aria-selected="false" tabIndex={-1} role="tab">
                                {/*begin::Icon*/}
                                <div className="nav-icon">
                                    <img alt="" src="/metronic8/demo1/assets/media/svg/products-categories/shoes.svg" className="nav-icon" />
                                </div>
                                {/*end::Icon*/}
                                {/*begin::Subtitle*/}
                                <span className="nav-text text-gray-600 fw-bold fs-6 lh-1">
                                    Shoes
                                </span>
                                {/*end::Subtitle*/}
                                {/*begin::Bullet*/}
                                <span className="bullet-custom position-absolute bottom-0 w-100 h-4px bg-primary" />
                                {/*end::Bullet*/}
                            </a>
                            {/*end::Link*/}
                        </li>
                        {/*end::Item*/}
                    </ul>
                    {/*end::Nav*/}

                    {/*begin::Tab Content*/}
                    <div className="tab-content">
                        <AnalysesTap analysisBookings={analysisBookings} />
                        <div className="tab-pane fade show active" id="kt_stats_widget_2_tab_1" role="tabpanel">
                            <div className="table-responsive">
                                <table className="table table-row-dashed align-middle gs-0 gy-4 my-0">
                                    <thead>
                                        <tr className="fs-7 fw-bold text-gray-500 border-bottom-0">
                                            <th className="ps-0 min-w-100px"> {t('User')} </th>
                                            <th className="ps-0 min-w-100px"> {t('Analyses')} </th>
                                            <th className="ps-0 min-w-100px"> {t('Medical Center')} </th>
                                            <th className="ps-0 min-w-100px">{t('Booking Date')} </th>
                                            <th className="ps-0 min-w-100px">{t('Status')} </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {analysisBookings?.map((item, index) => {
                                            return (
                                                <tr key={index}>
                                                    <td>
                                                        <span className="text-gray-800 fw-bold d-block fs-6">
                                                            <Link to={`/user-management/patient/edit/${item.user.id}`}>{item.user.first_name}{" "}{item.user.last_name}</Link>
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <span className="text-gray-800 fw-bold d-block fs-6">
                                                            <Link to={`/medical-analysis/individual-analyses/classification/individual-analyses/edit/${item.analysis.id}`}>{item.analysis.title}</Link>
                                                            {' '},{' '}
                                                            <Link to={`/medical-analysis/medical-analysis/analysis-packages/group-categories/analysis-groups/edit/${item.analysis_group.id}`}>{item.analysis_group.name}</Link>

                                                        </span>
                                                    </td>
                                                    <td>
                                                        <span className="text-gray-800 fw-bold d-block fs-6">
                                                            <Link to={`/user-management/medical-centers/edit/${item.medical_center.id}`}>{item.medical_center.name}</Link>

                                                        </span>
                                                    </td>
                                                    <td>
                                                        <span className="text-gray-800 fw-bold d-block fs-6">{item.booking_date}</span>
                                                    </td>
                                                    <td>
                                                        <span className="text-gray-800 fw-bold d-block fs-6">{t(`${item.status}`)}</span>
                                                    </td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </table>
                                <div className='d-flex justify-content-end'>
                                    <button onClick={() => navigate('/medical-analysis/reservations')} className='btn btn-outline-primary border border-primary '>{t('View All')}</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export { RecentOrdersTable };