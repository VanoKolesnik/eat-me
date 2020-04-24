import {
	API_URL,
	PATCH_ACCOUNT,
	PATCH_ACCOUNT_SUCCESS,
	PATCH_ACCOUNT_FAILURE,
} from "../../utilities/constants";

const patchAccountBegin = () => ({ type: PATCH_ACCOUNT });
const patchAccountSuccess = (response) => ({
	type: PATCH_ACCOUNT_SUCCESS,
	payload: response,
});
const patchAccountFailure = () => ({ type: PATCH_ACCOUNT_FAILURE });

export function patchAccount(accountData) {
	return async (dispatch) => {
		dispatch(patchAccountBegin());

		try {
			const request = await fetch(`${API_URL}/account/${accountData.id}`, {
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(accountData),
			});
			const response = await request.json();

			dispatch(patchAccountSuccess(response));
		} catch (error) {
			dispatch(patchAccountFailure());
		}
	};
}
