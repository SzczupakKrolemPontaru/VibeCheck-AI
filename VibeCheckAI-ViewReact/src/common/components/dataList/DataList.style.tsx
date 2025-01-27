import styled from 'styled-components';

export const StyledDataList = styled.div`

    .p-grid {
        flex-wrap: wrap;
        gap: 2.5rem 1rem;
    }

    .p-card {
        width: calc(33.333% - 1.5rem);
        margin-left: 0.5rem;
        position: relative;
    }

    .p-card img {
        width: 100%;
        height: auto;
    }

    .favorite-button {
        position: absolute;
        top: 0.5rem;
        right: 0.5rem;
    }
`;