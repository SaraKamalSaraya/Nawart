import { t } from "i18next";
import React, { useState } from "react";
import { Dropdown, Pagination, Spinner } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import SwalConfirmAlert from "../../../functions/swal/SwalConfirmAlert";

interface TableProps {
  headers: string[];
  children: React.ReactNode;
  onDelete?: ([]) => void;
  showAdd?: boolean;
  showEdit?: boolean;
  showDelete?: boolean;
  showPagination?: boolean;
  showSearch?: boolean;
  showView?: boolean;
  data: any[]
}

const MainCustomTable: React.FC<TableProps> = ({
  headers,
  children,
  onDelete,
  showAdd = false,
  showEdit = false,
  showDelete = false,
  showPagination = false,
  showSearch = false,
  showView = false,
  data = []
}) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 8;
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedItems, setSelectedItems] = useState<number[]>([]);

  const hasChildren = React.Children.count(children) > 0;
  const [loading, setLoading] = useState<boolean>(!hasChildren);

  const filteredChildren = React.Children.toArray(children).filter((child: any) => {
    if (searchTerm === '') return true;

    const titleContainsTerm = child.props.title?.toLowerCase().includes(searchTerm.toLowerCase());

    if (titleContainsTerm) return true;

    const idContainsTerm = child.props.id.toString().toLowerCase().includes(searchTerm.toLowerCase());

    return idContainsTerm;
  });


  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredChildren.slice(indexOfFirstItem, indexOfLastItem);
  console.log(currentItems)

  const handlePagination = (pageNumber: number) => setCurrentPage(pageNumber);
  const navigate = useNavigate();


  const handleEdit = (id: number) => {
    navigate(`edit/${id}`)
  }
  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      const allIds = currentItems?.map((item: any) => item.props.id);
      setSelectedItems(allIds);
    } else {
      setSelectedItems([]);
    }
  };
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value.toLowerCase().trim();

    if (searchTerm !== '') {
      setCurrentPage(1);
      setSearchTerm(searchTerm);
    } else {
      setSearchTerm('');
    }
  };


  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>, itemId: number) => {
    const isChecked = e.target.checked;
    setSelectedItems(prevSelectedItems => {
      if (isChecked) {
        return [...prevSelectedItems, itemId];
      } else {
        return prevSelectedItems.filter(id => id !== itemId);
      }
    });
  };


  const handleDeleteAll = async (itemsToDelete: number[]) => {
    if (itemsToDelete.length > 0) {
      onDelete && await onDelete(itemsToDelete);
      setSelectedItems([]);
    }
  };

  const handleDelete = async (id: number) => {
    handleDeleteAll([id]);
  };


  const handleView = async (id: number) => {
    navigate(`${id}`)
  }

  setTimeout(() => {
    setLoading(false)
  }, 2000);
  return (
    <div className='card p-4 ' style={{ minHeight: '80vh' }}>
      <div className="d-flex flex-stack mb-5">
        {showSearch && (
          <div className="d-flex align-items-center position-relative my-1">
            <i className="bi bi-search fs-1 position-absolute ms-4"></i>
            <input type="text" className="form-control form-control-solid w-250px ps-15" placeholder={t("Search items")} onChange={(e) => handleSearch(e)} value={searchTerm} />
          </div>
        )}
        <div className="d-flex align-items-center gap-5">
          {selectedItems.length > 0 && showDelete && (
            <div className="d-flex justify-content-end align-items-center" data-kt-docs-table-toolbar="selected">
              <button onClick={() => handleDeleteAll(selectedItems)} type="button" className="btn btn-danger" data-bs-toggle="tooltip" title={t('Delete')}>
                {t('Delete')} {selectedItems.length} {t('Items')}
              </button>
            </div>
          )}


          {showAdd && (
            <div className="d-flex justify-content-end" data-kt-docs-table-toolbar="base">
              <div>
                <Link to={'add'} className="btn" style={{ backgroundColor: "#0b81b9", color: "white" }}>{t('Add')}</Link>
              </div>
            </div>
          )}
        </div>
      </div>
      {!loading && (
        <div className="table-responsive" style={{ minHeight: "68vh" }}>
          <table className="table align-middle table-row-dashed fs-6 gy-5 text-nowrap" style={{ minHeight: '100%' }}>
            <thead>
              <tr className=" text-gray-500 fw-bold fs-7 text-uppercase gs-0 " >
                <th className="w-10px pe-2">
                  <div className="form-check form-check-sm form-check-custom form-check-solid me-3">
                    <input className="form-check-input" type="checkbox" data-kt-check="true" data-kt-check-target="#kt_datatable_example_1 .form-check-input" defaultValue={1} onChange={handleSelectAll} />
                  </div>
                </th>
                {headers?.map((header, index) => (
                  <th key={index}>{t(header)}</th>
                ))}
                {(showEdit || showDelete) && <th className="">{t("Actions")}</th>}
              </tr>
            </thead>
            <tbody className="text-gray-600 fw-semibold">
              {currentItems.length === 0 && (
                <tr>
                  <td colSpan={100} className="text-center">لا يوجد بيانات</td>
                </tr>
              )}
              {currentItems?.map((item: any, index) => (
                <tr key={item.props.id} className={`${index % 2 == 0 ? 'table-active' : ''}`}>
                  <td>
                    <div className="form-check form-check-sm form-check-custom form-check-solid me-3">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value={item.props.id}
                        onChange={(e) => handleCheckboxChange(e, item.props.id)}
                        checked={selectedItems.includes(item.props.id)}
                      />
                    </div>
                  </td>
                  {item.props.children}
                  {(showEdit || showDelete) && (
                    <td className="text-start">
                      <Dropdown>
                        <Dropdown.Toggle variant="outline-secondary" id={`dropdownMenu${item.props.id}`} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                          <i className="bi bi-three-dots text-primary" style={{ margin: 'auto' }} />
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          {showView && <button className="dropdown-item btn my-2 text-info w-100" onClick={() => handleView(item.props.id)} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>{t('View')} <i className="bi bi-pencil ms-2 text-info" /></button>}
                          {showEdit && <button className="dropdown-item btn my-2 text-success w-100" onClick={() => handleEdit(item.props.id)} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>{t('Edit')} <i className="bi bi-pencil ms-2 text-success" /></button>}
                          {showDelete && <button className="dropdown-item btn text-danger w-100" onClick={() => handleDelete(item.props.id)} style={{ display: 'flex', justifyContent: 'space-between', alignItems: "center" }}>{t('Delete')} <i className="bi bi-trash ms-2 text-danger" /></button>}
                        </Dropdown.Menu>
                      </Dropdown>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {loading && (
        <div className="d-flex justify-content-center align-items-center" style={{ height: '50vh' }}>
          <span className="loader"></span>
          {/* <Spinner animation="border" role="status">
                <span className="visually-hidden">{t('Loading...')}</span>
              </Spinner> */}
        </div>
      )}
      {!loading && showPagination && (
        <Pagination className="mt-3 justify-content-center">
          {Array.from({ length: Math.ceil(filteredChildren.length / itemsPerPage) }, (_, i) => (
            <Pagination.Item key={i + 1} active={i + 1 === currentPage} onClick={() => handlePagination(i + 1)}>
              {i + 1}
            </Pagination.Item>
          ))}
        </Pagination>
      )}

    </div>
  );
};

export default MainCustomTable;
