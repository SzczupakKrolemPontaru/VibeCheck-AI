import {CommentType, Comment} from "Components/commentsList/comment/Comment.component";
import React, {ReactElement} from "react";
import {FC} from "react";
import styled from "styled-components";
import {VibeCheckColors} from "Colors/VibeCheckColors";

interface CommentsListProps {
    comments: CommentType[]
}

export const CommentsList: FC<CommentsListProps> = (props: CommentsListProps): ReactElement => {
    return <StyledCommentsList>
        {props.comments.map((comment: CommentType): ReactElement => (
            <Comment key={comment.id} comment={comment} />
        ))}
    </StyledCommentsList>;
};

export const StyledCommentsList = styled.div`
    height: 31.5rem;
    max-height: 31.5rem;
    overflow-y: scroll;
    box-shadow: 0.5rem 0.5rem 0.5rem rgba(0, 0, 0, 0.1);
    border-radius: 1.25rem;
    background-color: ${VibeCheckColors.white};
    padding: 1rem;
`

export const commentsData: CommentType[] = [
    {
        id: 1,
        author: "User1",
        authorProfileImageUrl: "https://yt3.ggpht.com/ytc/AIdro_nUV6gXPyZOoks62TEf3pcXvig8Wnra-rwumV_co6m3s88=s48-c-k-c0x00ffffff-no-rj",
        text: "This is a comment",
        publishedAt: "2022-10-29T15:09:47Z",
        depth: 0,
        replies: [
            {
                id: 2,
                author: "User2",
                authorProfileImageUrl: "https://yt3.ggpht.com/ytc/AIdro_nUV6gXPyZOoks62TEf3pcXvig8Wnra-rwumV_co6m3s88=s48-c-k-c0x00ffffff-no-rj",
                text: "This is a reply",
                publishedAt: "2022-10-29T15:09:47Z",
                depth: 1,
                replies: [
                    {
                        id: 3,
                        author: "User3",
                        authorProfileImageUrl: "https://yt3.ggpht.com/ytc/AIdro_nUV6gXPyZOoks62TEf3pcXvig8Wnra-rwumV_co6m3s88=s48-c-k-c0x00ffffff-no-rj",
                        text: "This is a reply",
                        publishedAt: "2022-10-29T15:09:47Z",
                        depth: 2,
                        replies: [],
                    },
                ],

            },
        ],
    },
    {
        id: 4,
        author: "User1",
        authorProfileImageUrl: "https://yt3.ggpht.com/ytc/AIdro_nUV6gXPyZOoks62TEf3pcXvig8Wnra-rwumV_co6m3s88=s48-c-k-c0x00ffffff-no-rj",
        text: "This is a comment",
        publishedAt: "2022-10-29T15:09:47Z",
        depth: 0,
        replies: [
            {
                id: 5,
                author: "User2",
                authorProfileImageUrl: "https://yt3.ggpht.com/ytc/AIdro_nUV6gXPyZOoks62TEf3pcXvig8Wnra-rwumV_co6m3s88=s48-c-k-c0x00ffffff-no-rj",
                text: "This is a reply",
                publishedAt: "2022-10-29T15:09:47Z",
                depth: 1,
                replies: [
                    {
                        id: 6,
                        author: "User3",
                        authorProfileImageUrl: "https://yt3.ggpht.com/ytc/AIdro_nUV6gXPyZOoks62TEf3pcXvig8Wnra-rwumV_co6m3s88=s48-c-k-c0x00ffffff-no-rj",
                        text: "This is a reply",
                        publishedAt: "2022-10-29T15:09:47Z",
                        depth: 2,
                        replies: [],
                    },
                ],

            },
        ],
    },
    {
        id: 7,
        author: "User4",
        authorProfileImageUrl: "https://yt3.ggpht.com/ytc/AIdro_nUV6gXPyZOoks62TEf3pcXvig8Wnra-rwumV_co6m3s88=s48-c-k-c0x00ffffff-no-rj",
        text: "Another top-level commentAnother top-level commentAnother top-level commentAnother top-level commentAnother top-level commentAnother top-level commentAnother top-level commentAnother top-level commentAnother top-level commentAnother top-level comment, Another top-level commentAnother top-level commentAnother top-level comment,Another top-level comment, Another top-level comment,Another top-level comment  Another top-level comment Another top-level comment Another top-level comment",
        publishedAt: "2022-10-29T15:09:47Z",
        depth: 0,
        replies: [],
    },
];