import { t } from 'i18next';

// ----------------------------- Default -----------------------------
export const Default_Inputs = [
    {
        id: "default",
        label: "default",
        type: "text",
        placeholder: "default",
    }
]

// ----------------------------- Users -----------------------------
export const Users_Inputs = [
    {
        id: "fullName",
        label: t('Full Name'),
        type: "text",
        placeholder: t('ادخل الاسم بالكامل'),
    },
    {
        id: "email",
        label: t('Email'),
        type: "text",
        placeholder: t('ادخل البريد الالكتروني'),
    },
    {
        id: "phone",
        label: t('Phone Number'),
        type: "number",
        placeholder: t('ادخل رقم الهاتف'),
    }
]

export const Admins_Inputs = [
    {
        id: "fullName",
        label: t('Full Name'),
        type: "text",
        placeholder: t('ادخل الاسم بالكامل'),
    },
    {
        id: "email",
        label: t('Email'),
        type: "text",
        placeholder: t('ادخل البريد الالكتروني'),
    },
]

export const Delivery_Men_Inputs = [
    {
        id: "fullName",
        label: t('Full Name'),
        type: "text",
        placeholder: t('ادخل الاسم بالكامل'),
    },
    {
        id: "email",
        label: t('Email'),
        type: "text",
        placeholder: t('ادخل البريد الالكتروني'),
    },
]


// ----------------------------- Advertisement -----------------------------

export const Offers_Inputs = [
    {
        id: "foodItem",
        label: t('Food Item'),
        type: "select",
        placeholder: t('Enter Food Item'),
    },
    {
        id: "discount",
        label: t('Discount Value'),
        type: "number",
        placeholder: t('Enter Discount Value'),
    },
    {
        id: "description",
        label: t('Description'),
        type: "text",
        placeholder: t('Enter Description'),
    },
]