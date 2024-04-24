import React, { useEffect } from 'react';
import { useListView } from '../core/ListViewProvider';
import { KTSVG } from '../../../../_metronic/helpers';


interface NewData {
  id: number;
  [key: string]: string | File | number;
}

interface NewDataFormError {
  [key: string]: string | null;
}

type Inputs = {
  id: string;
  label: string;
  type: string;
  placeholder: string;
};

type Categories = {
  id: number;
  [key: string]: any;
}

type Photographers = {
  id: number;
  [key: string]: any;
}

type Props = {
  title: string;
  newData: NewData;
  newDataFormError: NewDataFormError;
  Inputs: Inputs[];
  imageData: string;
  categories: Categories[];
  photographers: Photographers[];
  handleSelectChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleClickSave: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    type: string
  ) => void;
};

const Modal: React.FC<Props> = ({
  title,
  newData,
  newDataFormError,
  Inputs,
  imageData,
  categories,
  photographers,
  handleSelectChange,
  handleChange,
  handleClickSave,
}) => {
  const { setItemIdForUpdate } = useListView();

  useEffect(() => {
    document.body.classList.add('modal-open');
    return () => {
      document.body.classList.remove('modal-open');
    };
  }, []);

  return (
    <>
      <div className='modal fade show d-block' id='kt_modal_add_user' role='dialog' tabIndex={-1} aria-modal='true'>
        <div className='modal-dialog modal-dialog-centered mw-650px'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h2 className='fw-bolder'>أدخل جميع البيانات</h2>
              <div
                className='btn btn-icon btn-sm btn-active-icon-primary'
                data-kt-users-modal-action='close'
                onClick={() => setItemIdForUpdate(undefined)}
                style={{ cursor: 'pointer' }}
              >
                <KTSVG path='/media/icons/duotune/arrows/arr061.svg' className='svg-icon-1' />
              </div>
            </div>
            <div className='modal-body scroll-y mx-5 mx-xl-15 my-7'>
              <form>
                {Inputs.map((field) => (
                  <div key={field.id} className='formInput'>
                    <div className='fv-row mb-10'>
                      <label className='form-label fs-6 fw-bolder text-dark'>{field.label}</label>
                      <div className='d-flex align-items-center'>
                        {field.type === 'file' ?
                          <img
                            src={imageData}
                            alt='Preview' style={{ width: '10rem', height: '7rem', borderRadius: '20px', marginLeft: '1rem' }} />
                          : ''
                        }
                        <input
                          id={field.id}
                          name={field.id}
                          type={field.type}
                          accept='image/*'
                          value={
                            field.type !== 'file'
                              ? (newData[field.id as keyof NewData] as string | number)
                              : ''
                          }
                          // value={newData[field.id as keyof NewData] || ''}
                          placeholder={field.placeholder}
                          min={field.type === 'number' ? '1' : undefined}
                          onChange={handleChange}
                          className={`form-control form-control-lg form-control-solid h-25 ${newDataFormError[field.id as keyof NewData] ? 'is-invalid' : 'is-valid'
                            }`}
                        />
                      </div>
                      {newDataFormError[field.id as keyof NewData] && (
                        <div>{newDataFormError[field.id as keyof NewData]}</div>
                      )}
                    </div>
                  </div>
                ))}
                {title === 'قائمة الصور' || title == 'قائمة الفيديوهات' || title == 'قائمة الحجوزات' ?
                  <div className='formInput'>
                    <div className='fv-row mb-10'>
                      <label className='form-label fs-6 fw-bolder text-dark'>نوع العمل</label>
                      <select
                        className={`form-control form-control-lg form-control-solid h-25`}
                        id="categoryID"
                        name="categoryID"
                        value={String(newData['categoryID'] || '')}
                        onChange={handleSelectChange}
                        required
                      >
                        {categories.map(category => (
                          <option key={category.id} value={category.id}>{category.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  :
                  ''}
                {
                  title == 'قائمة الحجوزات' ?
                    <div className='formInput'>
                      <div className='fv-row mb-10'>
                        <label className='form-label fs-6 fw-bolder text-dark'>المصور</label>
                        <select
                          className={`form-control form-control-lg form-control-solid h-25`}
                          id="photographerID"
                          name="photographerID"
                          value={String(newData['photographerID'] || '')}
                          onChange={handleSelectChange}
                          required
                        >
                          {photographers.map(photographer => (
                            <option key={photographer.id} value={photographer.id}>{photographer.name}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    :
                    ''
                }

                <div className='d-flex'>
                  <button
                    type='button'
                    className='btn btn-primary w-100 mb-5 mx-4'
                    onClick={(e) => handleClickSave(e, newData.id === 0 ? 'new' : 'edit')}
                  >
                    حفظ
                  </button>
                  <button
                    type='button'
                    className='btn btn-light w-50 mb-5 mx-4'
                    onClick={() => setItemIdForUpdate(undefined)}
                  >
                    إغلاق
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className='modal-backdrop fade show'></div>
    </>
  );
};

export { Modal };
