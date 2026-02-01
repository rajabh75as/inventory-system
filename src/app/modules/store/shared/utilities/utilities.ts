import moment from "jalali-moment";

export class Utilities {
  constructor() {
  }
  static convertStringToIcon(p:any, fieldName:any): string {
    let params = p.data[fieldName];
    if (params !== null) {
      try {
        return params ? "<span style=\"color:  #28a745;font-size: 20px;\">\u2714</span>" : "<span style=\"color:  #dc3545;font-size: 20px;\">\u2716</span>";
      } catch (e) {
        return '-'
      }
    } else {
      return 'عدم استعلام'
    }
  }
  static getCurrentDate(): string {
    let date = new Date();
    let current_date = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+ date.getDate();
    return moment(current_date).
    locale('fa').format('YYYY/MM/DD');
  }
  static getCustomCurrentDate(day: number) {
    let today = new Date();
    let date = new Date(new Date().setDate(today.getDate() - day))
    return moment(date).locale('fa').format('YYYY/MM/DD');
  }
  static convertMiladiToShamsi(p:any, fieldName:any): string {
    let param = p.data[fieldName];
    if (param !== null) {
      try {
        return moment(param).locale('fa').format('YYYY/MM/DD')
      } catch (e) {
        return '-'
      }
    } else {
      return ''
    }
  }
  static numberWithCommas(x:any) {
    x = x.toString();
    let pattern = /(-?\d+)(\d{3})/;
    while (pattern.test(x))
      x = x.replace(pattern, "$1,$2");
    return x;
  }

  static convertSeparatorNumber(p:any, fieldName:any): string {
    let param = p.data[fieldName];
    if (param !== null) {
      try {
        return param.toLocaleString();
      } catch (e) {
        return '-'
      }
    } else {
      return ''
    }
  }
  static convertDateToTime(p:any, fieldName:any): string {
    let param = p.data[fieldName];
    if (param !== null) {
      try {
        let dateObj = new Date(param);
        return dateObj.toLocaleTimeString('fa-IR', {
          hour: '2-digit',
          minute: '2-digit'
        });
      } catch (e) {
        return '-';
      }
    } else {
      return '';
    }
  }
  static checkValidation(formGroup:any) {
    for (const control of Object.keys(formGroup.controls)) {
      formGroup.controls[control].markAsTouched();
    }
    return;
  }
}
