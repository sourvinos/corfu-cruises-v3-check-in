import { Injectable } from '@angular/core'
// Custom
import { LocalStorageService } from './local-storage.service'
import { MessageCalendarService } from './message-calendar.service'

@Injectable({ providedIn: 'root' })

export class DateHelperService {

    constructor(private localStorageService: LocalStorageService, private messageCalendarService: MessageCalendarService) { }

    //#region public methods

    /**
     * Formats a 'YYYY-MM-DD' string into a string according to the stored locale with optional weekday name and year
     * Example '2022-12-14' with selected locale Greek, showWeekday = true and showYear = false will return 'Τετ 14/12'
     * @param date: String representing a date formatted as 'YYYY-MM-DD'
     * @param showWeekday: An optional boolean whether to include the weekday in the return string
     * @param showYear: An optional boolean whether to include the year in the return string
     */
    public formatISODateToLocale(date: string, showWeekday = false, showYear = true): string {
        const parts = date.split('-')
        const rawDate = new Date(date)
        const dateWithLeadingZeros = this.addLeadingZerosToDateParts(new Intl.DateTimeFormat(this.localStorageService.getLanguage()).format(new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]))), showYear)
        const weekday = this.messageCalendarService.getDescription('weekdays', rawDate.getDay().toString())
        return showWeekday ? weekday + ' ' + dateWithLeadingZeros : dateWithLeadingZeros
    }

    /**
     * Formats a date formatted as "Tue Nov 01 2022" into a string formatted as "2022-11-01" with optional weekday name
     * @param date: Date formatted as "Tue Nov 01 2022"
     * @param includeWeekday: An optional boolean whether to include the weekday in the return string
     * @returns String formatted as "YYYY-MM-DD" or "Tue YYYY-MM-DD"
    */
    public formatDateToIso(date: Date, includeWeekday = false): string {
        let day = date.getDate().toString()
        let month = (date.getMonth() + 1).toString()
        const year = date.getFullYear()
        const weekday = date.toLocaleString('default', { weekday: 'short' })
        if (month.length < 2) month = '0' + month
        if (day.length < 2) day = '0' + day
        const formattedDate = [year, month, day].join('-')
        return includeWeekday ? weekday + ' ' + formattedDate : formattedDate
    }

    /**
     * Subtracts 100 years if the given year is in the future
     * Solves the problem where 1.1.40 becomes 1.1.2040 instead of 1.1.1940
     * @param date a moment.js object
     * @returns a moment.js object
     */
    public gotoPreviousCenturyIfFutureDate(date: any): Date {
        // const given = date
        const today = new Date()
        // const past = given
        if (date > today) {
            return date.add(-100, 'years')
        } else {
            return date
        }
    }

    //#endregion

    //#region private methods

    /**
     *
     * @param date a string representing a date possibly formatted as 'YYYY-M-D'
     * @param showYear include the year in the return string or not
     * @returns a string representing a date formatted as 'YYYY-MM-DD'
     */
    private addLeadingZerosToDateParts(date: string, showYear: boolean): string {
        const seperator = this.getDateLocaleSeperator()
        const parts = date.split(seperator)
        parts[0].replace(' ', '').length == 1 ? parts[0] = '0' + parts[0].replace(' ', '') : parts[0]
        parts[1].replace(' ', '').length == 1 ? parts[1] = '0' + parts[1].replace(' ', '') : parts[1]
        parts[2] = parts[2].replace(' ', '')
        if (showYear) {
            return parts[0] + seperator + parts[1] + seperator + parts[2]
        } else {
            return parts[0] + seperator + parts[1]
        }
    }

    /**
     * @returns a string representing the date seperator based on the stored locale
     */
    private getDateLocaleSeperator(): string {
        switch (this.localStorageService.getLanguage()) {
            case 'cs-CZ': return '.'
            case 'de-DE': return '.'
            case 'el-GR': return '/'
            case 'en-GB': return '/'
            case 'fr-FR': return '/'
        }
    }

    //#endregion

}
