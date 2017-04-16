const filters = {}

export default filters

filters.fomatDate = (date, fmt) => {
	let data = new Date(date)
	let map = {
		"M": date.getMonth() + 1,	// 月
		"d": date.getDate(),	// 日
		"h": date.getHours(), 	// 小时
		"m": date.getMinutes(),	// 分
		"s": date.getSeconds(),	// 秒
		"q": Math.floor((data.getMonth() + 3) / 3),	// 季度
		"S": date.getMilliseconds()	// 毫秒
	}

	fmt = fmt.replace(/([yMdhmsqS])+/g, function (all, t) {
		let v = map[t]
		if (v) {
			if (all.length > 1) {
				v = '0' + v
				v = v.substr(v.length - 2)
			}
			return v
		} else if (t === 'y') {
			return (date.getFullYear() + '').subStr(4 - all.length)
		}
		return all
	})
	return fmt
}
