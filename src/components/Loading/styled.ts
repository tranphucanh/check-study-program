import styled from 'styled-components'

export const Container = styled.div<{ $fullPage?: boolean }>`
	position: ${(props) => (props.$fullPage ? 'absolute' : 'fixed')};
	display: flex;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background-color: rgb(0 0 0 / 20%);
	z-index: 2;
	.ant-spin {
		margin: auto;
	}
`
