import Modal from "../Modal/Modal";
import PostList from "../PostList/PostList";
import SearchBox from "../SearchBox/SearchBox";
import Pagination from "../Pagination/Pagination";
import { fetchPosts } from "../../services/postService";



import css from "./App.module.css";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import CreatePostForm from "../CreatePostForm/CreatePostForm";
import { Post } from "../../types/post";
import EditPostForm from "../EditPostForm/EditPostForm";

export default function App() {
  const [currentPage, setCurrentPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isCreateForm, setIsCreateForm] = useState(false)
  const [editPost, setEditPost] = useState<Post|null>(null)
 
  const { data } = useQuery({
    queryKey: ["posts", searchQuery, currentPage],
    queryFn: () => fetchPosts(searchQuery, currentPage),
    placeholderData: keepPreviousData

  });

  const posts = data?.posts || [];
  const totalPage = data?.totalCount ? Math.ceil(data.totalCount / 8) : 0;

  const hendleChange = useDebouncedCallback((value: string) => { // 
    setCurrentPage(1)
    setSearchQuery(value)
  },1000)

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox onChange={hendleChange}/>
      {totalPage > 1 && <Pagination currentPage={currentPage} totalPages={totalPage} onPageChange={setCurrentPage} />}
        <button className={css.button} onClick={() => { setIsModalOpen(true); setIsCreateForm(true) }}>Create post</button>       
      </header>
      {
        posts.length > 0 && <PostList posts={posts} onChange={(post:Post) => setEditPost(post)} openModal={()=> setIsModalOpen(true)} />

      }
      {isModalOpen && <Modal onClose={() => setIsModalOpen(false)}>
        {
          isCreateForm && <CreatePostForm onClose={() => { setIsModalOpen(false); setIsCreateForm(false) }}/>
        }
        {
          editPost && <EditPostForm post={editPost} onClose={() => { setIsModalOpen(false); setEditPost(null) }} />
        }
      </Modal>}

    </div>
  );
}
