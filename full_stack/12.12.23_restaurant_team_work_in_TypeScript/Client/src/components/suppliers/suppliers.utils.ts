import {ISupplier} from "../../components/shared/table/Table.types"




const isValidSupplier = (supplier: ISupplier, showAlert: (message: string) => void): boolean => {
    var regName = /^[\u0590-\u05FFa-zA-Z0-9]+ ?[\u0590-\u05FFa-zA-Z0-9]+$/;
    var phoneNumber = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;
    var RegEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    var regBN = /^51\d{7}$/
    
    let errorMessages = '';


    if (!regBN.test(supplier.business_number)) {
        errorMessages += ':ח.פ. לא תקין -\n .הכנס מספר בן 9 ספרות, חייב להתחיל ב51 -\n';
    }

    if (!regName.test(supplier.supplier_name)) {
        errorMessages += '.שם ספק לא תקין -\n';
    }

    if (!regName.test(supplier.contact_name)) {
        errorMessages += '.שם איש קשר לא תקין -\n';
    }

    if (!phoneNumber.test(supplier.phone_number)) {
        errorMessages += '.נא הכנס מספר טלפון חוקי -\n';
    }

    if (!supplier.address) {
        errorMessages += '.נא הכנס כתובת חוקית -\n';
    }


    if (!RegEmail.test(supplier.email)) {
        errorMessages += '.נא הכנס כתובת אימייל חוקית -\n';
    }



    if (errorMessages !== '') {
        showAlert(errorMessages);
        return false;
    }

    return true;
}

export default isValidSupplier;