import {VibeCheckColors} from 'Colors/VibeCheckColors';
import styled from 'styled-components';

export const StyledLoginPanel = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 2rem;
	width: 25%;

	.pi {
		display: flex;
		align-items: center;
		justify-content: center;
		width: auto;
	}

	a {
		cursor: pointer;
		color: ${VibeCheckColors.diagramPurple};
		white-space: pre-wrap;
		font-size: 0.875rem;
		line-height: 1.25rem;
		text-align: left;
	}
`;
