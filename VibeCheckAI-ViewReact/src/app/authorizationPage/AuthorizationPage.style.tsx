import styled from 'styled-components';

export const StyledAuthotizationPage = styled.div`
    display: flex;
    position: relative;
    width: 100dvw;
    height: 100dvh;
    overflow: hidden;

    .authorization-page-box {
        display: flex;
        margin: auto;
        width: 80%;
        height: 80%;
        z-index: 1;
        box-shadow: 0 0.3125rem 0.625rem rgba(0, 0, 0, 0.1);
        border-radius: 0.5rem;
        padding: 1.5rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    .authorization-page-box-enter {
        transform: scale(0);
        opacity: 0;
        transition:
            transform 300ms ease-in-out,
            opacity 150ms ease-in;
    }

    .authorization-page-box-enter-active {
        transform: scale(1);
        opacity: 1;
    }

    .authorization-page-box-exit {
        transform: scale(1);
        opacity: 1;
        transition:
            transform 300ms ease-in-out,
            opacity 150ms ease-in;
    }

    .authorization-page-box-exit-active {
        transform: scale(0);
        opacity: 0;
    }

    .auth-header {
        font-size: 2rem;
        font-weight: bold;
        margin-bottom: 1rem;
        text-align: center;
    }

    .auth-subheader {
        font-size: 1.2rem;
        margin-bottom: 2rem;
        text-align: center;
    }
`;
