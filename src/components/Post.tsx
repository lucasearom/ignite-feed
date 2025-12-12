import { ChangeEvent, FormEvent, InvalidEvent, useState } from "react";
import { format, formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale/pt-BR";

import { Comment } from "./Comment";
import { Avatar } from "./Avatar";

import styles from "./Post.module.css";

// interface Author {
//     name: string;
//     role: string;
//     avatarUrl: string;
// }

// export type ContentType = "paragraph" | "link";

// interface Content {
//     type: ContentType;
//     content: string;
// }

// export interface PostType {   // ← renomeei para evitar conflito com o componente
//     id: number;
//     author: Author;
//     publishedAt: Date;
//     content: Content[];
// }

// export interface PostProps {
//     author: Author;
//     publishedAt: Date;
//     content: Content[];
// }

import { PostType } from '../global/types';

interface PostProps {
  post: PostType;
}

export function Post({ post }: PostProps) {
  const [comments, setComments] = useState([
    "Post muito bacana, hein? 👏👏"
  ])
  const [newCommentText, setNewCommentText] = useState('')

  const publishedDateFormatted = format(post.publishedAt, "d 'de' LLLL 'às' HH:mm'h'", {
    locale: ptBR,
  })

  const publishedDateRelativeToNow = formatDistanceToNow(post.publishedAt, {
    locale: ptBR
  })

  function handleCreateNewComment(event: FormEvent) {
    event.preventDefault()
    setComments([...comments, newCommentText])
    setNewCommentText('')
  }

  function deleteComment(commentToDelete: string) {
    const commentsWithoutDeleteOne = comments.filter(comment => {
      return comment !== commentToDelete
    })

    setComments(commentsWithoutDeleteOne)
  }

  function handleNewCommentInvalid(event: InvalidEvent<HTMLTextAreaElement>) {
    event.target.setCustomValidity('Esse campo é obrigatório!')
  }

  const isNewCommentEmpty = newCommentText.length === 0;

  return (
    <article className={styles.post}>
      <header>
        <div className={styles.author}>
          <Avatar hasBorder src={post.author.avatarUrl} />
          <div className={styles.authorInfo}>
            <strong>{post.author.name}</strong>
            <span>{post.author.role}</span>
          </div>
        </div>
        <time
          title={publishedDateFormatted}
          dateTime={post.publishedAt.toISOString()}
        >
          Publicado há {publishedDateRelativeToNow}
        </time>
      </header>
      <div className={styles.content}>
        {post.content.map(line => {
          if (line.type === 'paragraph') {
            return <p key={line.content}>{line.content}</p>
          }
          if (line.type === 'link') {
            return (
              <p key={line.content}>
                <a href='#'>{line.content}</a>
              </p>
            )
          }
        })}
      </div>

      <form onSubmit={handleCreateNewComment} className={styles.commentForm}>
        <strong>Deixe seu feedback</strong>
        <textarea
          name="comment"
          placeholder='Deixe um comentario'
          value={newCommentText}
          onChange={(event: ChangeEvent<HTMLTextAreaElement>) => {
            event.target.setCustomValidity('')
            setNewCommentText(event.target.value)
          }}
          onInvalid={handleNewCommentInvalid}
          required
        />
        <footer>
          <button type="submit" disabled={isNewCommentEmpty}>
            Publicar
          </button>
        </footer>
      </form>
      <div className={styles.commentList}>
        {comments.map(comment => {
          return <Comment content={comment} onDeleteComment={deleteComment} />
        })}
      </div>
    </article>
  );
}
