import { Link, useNavigate } from 'react-router-dom'
import { t } from 'i18next'

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
interface AnalysesTapProps {
    analysisBookings: AnalysisBookings[],
}

const AnalysesTap: React.FC<AnalysesTapProps> = ({
    analysisBookings
}) => {
    const navigate = useNavigate()
    return (

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
    )
}
export { AnalysesTap };