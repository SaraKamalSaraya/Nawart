
import { t } from 'i18next'

interface Category {
  count: number;
  title: string;
  bulletColor: string;
}

interface DataCardProps {
  title: string;
  cardData: Record<string, Category>;
  totalCount: number;
}

const DataCard: React.FC<DataCardProps> = ({
  title,
  cardData,
  totalCount
}) => {
  return (
    <div className="card card-flush h-md-50 mb-5 mb-xl-10">
      <div className="card-header pt-5">
        <div className="card-title d-flex flex-column">
          <div className="d-flex align-items-center">
            <span className="fs-2hx fw-bold text-gray-900 me-2 lh-1 ls-n2">{totalCount} </span>
            {/* Badge */}
            {/* <span className="badge badge-light-success fs-base">
            <i className="ki-duotone ki-arrow-up fs-5 text-success ms-n1"><span className="path1" /><span className="path2" /></i>
            2.2%
          </span> */}
          </div>
          <span className="text-gray-500 pt-1 fw-semibold fs-6">{title} </span>
        </div>
      </div>
      <div className="card-body pt-2 pb-4 d-flex align-items-center">
        <div className="d-flex flex-column content-justify-center w-100">

          {Object.entries(cardData).map(([key, category]) => (
            <div key={key} className="d-flex fs-6 fw-semibold align-items-center my-1">
              <div className={`bullet w-8px h-6px rounded-2 me-3 bg-${category.bulletColor}`} />
              <div className="text-gray-500 flex-grow-1 me-4">{category.title}</div>
              <div className="fw-bolder text-gray-700 text-xxl-end">{category.count}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};


export { DataCard };
