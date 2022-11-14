import { Link } from 'react-router-dom';
import styled from 'styled-components';
import LogoImg from '../../assets/images/header-logo.png';
import { FaSearch } from 'react-icons/fa';

const HeaderStyle = styled.div`
	position: relative;
	display: flex;
	justify-content: space-between;
	align-items: center;
	/* height: 70px; */
	padding: 20px 120px;
	background-color: var(--header-background-color);
	font-size: 18px; // ✨

	// Tablet
	@media screen and (max-width: 980px) {
		padding: 20px 60px;
	}
	// Mobile
	@media screen and (max-width: 640px) {
		padding: 20px 30px;
	}
`;

const Logo = styled.div`
	img {
		width: 110px;
	}
`;

const Ul = styled.ul`
	display: flex;
	color: var(--gray-400);

	li {
		padding: 10px;
		margin: 0 20px;

		&:hover {
			color: var(--white);
		}
	}

	.search-icon {
		margin-right: 15px;
		height: 16px;
	}
`;

const LoginButton = styled.button`
	color: var(--gray-400);

	&:hover {
		color: var(--white);
	}
`;

function Header() {
	return (
		<HeaderStyle>
			<Logo>
				<Link to="/">
					<img src={LogoImg} alt="logo" />
				</Link>
			</Logo>
			<Ul>
				<li>
					<Link to="/">방</Link>
				</li>
				<li>
					<Link to="/">플레이리스트</Link>
				</li>
				<li>
					<Link to="/">랭킹</Link>
				</li>
				<li>
					<FaSearch className="search-icon" />
					검색
				</li>
			</Ul>
			<LoginButton>
				<Link to="/">로그인</Link>
			</LoginButton>
		</HeaderStyle>
	);
}

export default Header;
