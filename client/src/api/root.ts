import axios from 'axios';
import { useDispatch } from 'react-redux';
import { myLogout } from '../slices/mySlice';

export const root: string | undefined = process.env.REACT_APP_STACK_SERVER_TEST;
// export const root = process.env.REACT_APP_STACK_SERVER;

type config = {
	headers: object;
	baseURL: string | undefined;
};

const accessToken = localStorage.getItem('accessToken');
const refreshToken = localStorage.getItem('refreshToken');

console.log('localStorage accessToken ', accessToken);

const axiosConfig: config = {
	headers: {
		'Content-Type': 'application/json; charset=UTF-8',
		Authorization: accessToken,
	},
	baseURL: root,
};

const instance = axios.create(axiosConfig);

instance.interceptors.response.use(
	(response) => {
		return response;
	},

	async (error) => {
		// 액세스 토큰 만료 => 새 액세스 토큰 발급(연장)
		if (error.response.status === 401) {
			axios
				.post(
					`${root}/api/members/refresh`,
					{},
					{
						headers: {
							RefreshToken: refreshToken,
						},
					},
				)
				.then((res) => {
					const newAccessToken = res.headers.authorization;

					axiosConfig.headers = {
						'Content-Type': 'application/json; charset=UTF-8',
						Authorization: newAccessToken,
					};

					localStorage.setItem('accessToken', newAccessToken);

					window.alert('로그인이 연장되었습니다. 새로고침됩니다.');
					window.location.reload();
				})
				.catch((err) => {
					// 리프레시 토큰 만료 => 로그아웃
					if (err.response.status === 404) {
						const dispatch = useDispatch();

						localStorage.removeItem('accessToken');
						localStorage.removeItem('refreshToken');
						dispatch(myLogout());

						window.alert('로그인이 만료되었습니다. 홈으로 이동됩니다.');
						window.location.href = '/';
					}
				});
		}

		// return Promise.reject(error);
	},
);

export default instance;
