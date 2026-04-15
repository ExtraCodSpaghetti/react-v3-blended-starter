import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deletePost } from "../../services/postService";
import { Post } from "../../types/post";
import css from "./PostList.module.css";


interface PostListProps{  // 
  posts: Post[],
  onChange: (post:Post) => void
  openModal: ()=> void
}



export default function PostList({ posts, onChange, openModal}: PostListProps) {
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["posts"]
      })
    }
  })

  

  return (
    <ul className={css.list}>
      {posts.map((post) =>(<li key={post.id} className={css.listItem}>
        <h2 className={css.title}>{post.title}</h2>
        <p className={css.content}>{post.body}</p>
        <div className={css.footer}>
          <button onClick={() => {
            onChange(post)
            openModal()
          }} className={css.edit}>Edit</button>
          <button onClick={()=>mutation.mutate(post.id)} className={css.delete}>Delete</button>
        </div>
      </li>))}
      
    </ul>
  );
}
