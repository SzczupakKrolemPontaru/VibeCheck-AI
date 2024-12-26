import React, {ReactElement, useState} from "react";
import {StyledComment} from "Components/commentsList/comment/Comment.style";
import {Avatar} from "primereact/avatar";

export interface CommentType {
    id: number;
    author: string;
    authorProfileImageUrl: string;
    text: string;
    publishedAt: string;
    depth: number;
    replies?: CommentType[];
}

export const Comment: React.FC<{ comment: CommentType }> = ({ comment }) => {
    const [showReplies, setShowReplies] = useState<boolean>(false);

    return <StyledComment commentDepth={comment.depth}>
        <div className="comment-header">
            <Avatar image={comment.authorProfileImageUrl} shape="circle" />
            <strong className="comment-author">{comment.author}</strong>
            <em>{new Date(comment.publishedAt).toDateString()}</em>
        </div>
        <div>
            {comment.text}
        </div>
        {comment.replies && comment.replies.length > 0 &&
            <button className="see-replies-button" onClick={() => setShowReplies(!showReplies)}>
                {showReplies ? "Hide replies" : `See replies (${comment.replies.length})`}
            </button>
        }
        {showReplies && <div>
            {comment.replies?.map((reply: CommentType): ReactElement => (
                <Comment key={reply.id} comment={reply} />
            ))}
        </div>
        }
    </StyledComment>;
};


