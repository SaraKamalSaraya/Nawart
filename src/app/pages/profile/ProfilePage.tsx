import { t } from "i18next";
import { PageTitle } from "../../../_metronic/layout/core";
import { useAuth } from "../../modules/auth";
import { useState } from "react";
import { Link } from "react-router-dom";
import { toAbsoluteUrl } from "../../../_metronic/helpers";
import putMethod from "../../../functions/putMethod";
import SwalShowAlert from "../../../functions/swal/SwalShowAlert";
import GetMethod from "../../../functions/getMethod";
import postMethod from "../../../functions/postMethod";


export default function ProfilePage() {
  const { currentUser } = useAuth();

  return (
    <>
      <PageTitle>{t('Profile')}</PageTitle>
      <ProfileBody currentUser={currentUser} />

    </>
  );
}

const ProfileBody = ({ currentUser }: any) => {
  const [isEdit, setIsEdit] = useState(false);
  const [formData, setFormData] = useState({
    name: currentUser?.name,
    email: currentUser?.email,
    password : null,
    image: null,
  })

  const [imagePreview, setImagePreview] = useState<string | null>(currentUser?.image_url);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e: any) => {
    const file = e.target.files ? e.target.files[0] : null;
    setFormData({ ...formData, image: file });

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }

  };


  const handleChangeInput = (event: any) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    const formDataToSend = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      if (value == null) {
        return;
      }  else {
        formDataToSend.append(key, value);
      }
    })
    const response = await postMethod(`/admins/update/${currentUser?.id}`, formDataToSend );

    setLoading(false);

    if (response?.status === 200 || response?.status === 201) {
      SwalShowAlert('success', 'Updated successfully');

      await getUserDetails();
      setIsEdit(false);
    }



  };


  const getUserDetails = async () => {
    const res = await GetMethod(`/admins`);
    if (res.status == 200 || res.status == 201) {
      const admin = res.data.admins.find((admin: any) => admin.id == currentUser?.id);
      console.log(admin);
      setFormData({
        name: admin.name,
        email:  admin.email,
        password: null,
        image: null,
      });
      setImagePreview(admin.image);

      localStorage.setItem("currentUser", JSON.stringify(admin));
    }
  }



  const handelCanecel = () => {
    setIsEdit(!isEdit);
    setFormData({
      name: currentUser?.name,
      email: currentUser?.email,
      password: null,
      image: null,
    })
  }

  return (
    <>

      <div className="card mb-5 mb-xl-10" id="kt_profile_details_view">


        <div className="card-header cursor-pointer">
          <div className="card-title m-0">
            <h3 className="fw-bold m-0">{t('Profile Details')}</h3>
          </div>
          <div onClick={handelCanecel} style={{backgroundColor: isEdit ? 'red' : '#0b81b9'}} className={`btn btn-sm text-white align-self-center cursor-pointer`} >{isEdit ? t('Cancel') : t('Edit Profile')}</div>
        </div>
        <div className="card-body p-9">
          <div className="row mb-6">
            <label className="col-lg-4 col-form-label fw-semibold fs-6">{t('Image')}</label>


            <div className="col-lg-8">
              <div className="image-input image-input-outline" data-kt-image-input="true" style={{ backgroundImage: `url(${imagePreview})` }}>
                <img className="image-input-wrapper w-125px h-125px" src={imagePreview || toAbsoluteUrl('/media/avatars/blank.png')} />
              </div>
              {
                isEdit && <input style={{ width: '30%' }} type="file" className="form-control form-control-lg form-control-solid" name="image" onChange={handleFileChange} />
              }
            </div>


          </div>
          <div className="row mb-7">
            <label className="col-lg-4 fw-semibold text-muted">{t('Name')}</label>
            <div className="col-lg-8">
              {isEdit ? <input type="text" className="form-control form-control-lg form-control-solid" style={{ width: '30%' }} name="name" value={formData.name} onChange={handleChangeInput} /> : <span className="fw-bold fs-6 text-gray-800">{formData.name}</span>}
            </div>
          </div>
          <div className="row mb-7">
            <label className="col-lg-4 fw-semibold text-muted">{t('Email')}</label>
            <div className="col-lg-8">
              {isEdit ? <input type="email" className="form-control form-control-lg form-control-solid" style={{ width: '30%' }} name="email" value={formData.email} onChange={handleChangeInput}   /> : <span className="fw-bold fs-6 text-gray-800">{formData.email}</span>}
            </div>
            
          </div>

          <div className="row mb-7">
            <label className="col-lg-4 fw-semibold text-muted">{t('Password')}</label>
            <div className="col-lg-8">
               {isEdit ? <input type="password" className="form-control form-control-lg form-control-solid" style={{ width: '30%' }} name="password" value={formData.password as any} onChange={handleChangeInput} /> : <span className="fw-bold fs-6 text-gray-800">********</span>}
            </div>
          </div>
          


        
        </div>
        {
          isEdit && <button type="button" disabled={loading} style={{  margin: "auto",backgroundColor: '#0b81b9', }} className="btn text-white my-10 w-200px float-end" onClick={handleSubmit}>{ loading ? t('Loading...') : t('Save Changes')}</button>
        }
      </div>


    </>
  );
}
