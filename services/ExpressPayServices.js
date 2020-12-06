import axios from "axios";
import crypto from "crypto"
const qs = require('querystring')

const Token = "e23dd2e726734fdfa04536f96d638331";
const _apiBase = "https://api.express-pay.by/v1/";
const secret = ''

export default class ExpressPayServices {

    getEripPay = async (num, sum, cur, info) => {
        //получить + месяц к нынешней дате
        let nowDate =new Date();
        nowDate.setMonth(nowDate.getMonth() + 1)
        let stringNowDate = nowDate.toISOString().slice(0,10).replace(/-/g,"");

        // параметры
        const params = {
            "serviceid": 5735,
            "accountno": String(num),
            "amount": String(sum),
            "currency": String(cur),
            "expiration": String(stringNowDate),
            "info": String(info),
            "surname": "",
            "firstname": "",
            "patronymic": "",
            "city": "",
            "street": "",
            "house": "",
            "building": "",
            "apartment": "",
            "isnameeditable": "",
            "isaddresseditable": "",
            "isamounteditable": "",
            "emailnotification": "",
            "smsphone": "",
            "returntype": "json",
            "returnurl": "http://site.standart.by",
            "failurl": "http://site.standart.by",
            "returninvoiceurl": 1
        }

        // формирование сигнатуры
        const signa = getSignature(Token, params, secret)
        // вписывание сигнатуры в параметры
        params["signature"] = signa

        // отправка данных
        return axios(`${_apiBase}web_invoices`, {
            method: 'POST',
            data: qs.stringify(params),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
    }

    getCardPay = async (num, sum, cur, info) => {
        //получить + месяц к нынешней дате
        let nowDate =new Date();
        nowDate.setMonth(nowDate.getMonth() + 1)
        let stringNowDate = nowDate.toISOString().slice(0,10).replace(/-/g,"");

        // параметры
        const params = {
            "serviceid": 5735,
            "accountno": String(num),
            "expiration": String(stringNowDate),
            "amount": String(sum),
            "currency": String(cur),
            "info": String(info),
            "returnurl": "http://site.standart.by",
            "failurl": "http://site.standart.by",
            "language": "ru",
            "sessiontimeoutsecs": "1200",
            "expirationdate": String(stringNowDate),
            "returntype": "json",
            "returninvoiceurl": 1
        }

        // формирование сигнатуры
        const signa = getSignature(Token, params, secret)
        // вписывание сигнатуры в параметры
        params["signature"] = signa

        // отправка данных
        return axios(`https://cors-anywhere.herokuapp.com/${_apiBase}web_cardinvoices`, {
            method: 'POST',
            data: qs.stringify(params),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
    };

}

// функция формирования сигнатуры
function getSignature(token, params, secretWord) {
    const normalizedParams = params;

    const arrSet = [
        "serviceid",
        "accountno",
        "amount",
        "currency",
        "expiration",
        "info",
        "surname",
        "firstname",
        "patronymic",
        "city",
        "street",
        "house",
        "building",
        "apartment",
        "isnameeditable",
        "isaddresseditable",
        "isamounteditable",
        "emailnotification",
        "smsphone",
        "returntype",
        "returnurl",
        "failurl",
        "returninvoiceurl"
    ]

    let result = token;

    for(let param in arrSet) {
        result += normalizedParams[arrSet[param]]
    }

    return crypto.createHmac('sha1', secretWord).update(result, 'utf8').digest('hex').toUpperCase()
}