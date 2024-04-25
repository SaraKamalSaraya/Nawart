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
        placeholder: t('Enter Full Name'),
    },
    {
        id: "email",
        label: t('Email'),
        type: "text",
        placeholder: t('Enter Email'),
    },
    {
        id: "phone",
        label: t('Phone Number'),
        type: "number",
        placeholder: t('Enter Phone Number'),
    }
]

export const Admins_Inputs = [
    {
        id: "fullName",
        label: t('Full Name'),
        type: "text",
        placeholder: t('Enter Full Name'),
    },
    {
        id: "email",
        label: t('Email'),
        type: "text",
        placeholder: t('Enter Email'),
    },
]

export const Delivery_Men_Inputs = [
    {
        id: "fullName",
        label: t('Full Name'),
        type: "text",
        placeholder: t('Enter Full Name'),
    },
    {
        id: "email",
        label: t('Email'),
        type: "text",
        placeholder: t('Enter Email'),
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