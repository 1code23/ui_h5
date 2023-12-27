import { showToast } from 'vant';

import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import updateLocale from 'dayjs/plugin/updateLocale'
dayjs.extend(relativeTime)
dayjs.extend(updateLocale)
dayjs.updateLocale('en', {
    relativeTime: {
        future: '%s内',
        past: '%s前',
        s: '几秒',
        m: '1分钟',
        mm: '%d分钟',
        h: '1小时',
        hh: '%d小时',
        d: '1天',
        dd: '%d天',
        M: '1个月',
        MM: '%d个月',
        y: '1年',
        yy: '%d年'
    }
})

export const vantToast = (msg) => {
    showToast(msg)
};

export function formatTimeFromNow(time) {
    if (time) {
        const newTime = time.toString().length < 13 ? time * 1000 : time
        return dayjs(newTime).fromNow()
    }
}