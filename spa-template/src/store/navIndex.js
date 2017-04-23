export const STORE_INDEX = 'STORE_INDEX'

export default {
	state: JSON.parse(sessionStorage.getItem('index') || '1'),
	mutations: {
		[STORE_INDEX](state, index) {
			sessionStorage.setItem('index', JSON.stringify(index))
		}
	},
	actions: {
		[STORE_INDEX]({commit}, index) {
			commit(STORE_INDEX, index)
		}
	}
}
