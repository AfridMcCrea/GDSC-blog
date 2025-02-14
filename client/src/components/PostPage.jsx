import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CatLoading from "../Animations/Cat";
import { Link } from "react-router-dom";
import { Button } from "flowbite-react";
import CallToAction from "./CallToAction";
import CommentSection from "./CommentSection";
import PostCard from "./PostCard";

export default function PostPage() {
  const { postSlug } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [post, setPost] = useState(null);
  const [recentPosts, setRecentPosts] = useState([]);
  const [remainingPosts, setRemainingPosts] = useState([]);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/post/getposts?slug=${postSlug}`);
        const data = await res.json();
        if (!res.ok) {
          setError(true);
          setLoading(false);
          return;
        }
        setPost(data.posts[0]);
        setError(false);
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchPost();
  }, [postSlug]);

  useEffect(() => {
    const fetchRecentPosts = async () => {
      try {
        const res = await fetch(`/api/post/getposts?limit=10`); // Fetch more than needed
        const data = await res.json();
        if (res.ok) {
          setRemainingPosts(data.posts);
          getNewPosts(data.posts);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchRecentPosts();
  }, []);

  const getNewPosts = (allPosts = remainingPosts) => {
    const numPostsToShow = 3;
    const shuffledPosts = allPosts.sort(() => 0.5 - Math.random());
    const newPosts = shuffledPosts.slice(0, numPostsToShow);
    setRecentPosts(newPosts);
    setRemainingPosts(allPosts.filter(post => !newPosts.includes(post)));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <CatLoading />
        <h1 className="ml-5 font-sans text-blue-400 text-3xl">Loading....</h1>
      </div>
    );
  }

  return (
    <main className="p-3 flex flex-col max-w-6xl mx-auto min-h-screen">
      <h1 className="mt-10 font-serif text-3xl p-3 mx-auto text-center max-w-2xl lg:text-4xl">
        {post && post.title}
      </h1>
      <Link
        className="self-center mt-4"
        to={`/search?category=${post && post.category}`}
      >
        <Button className="" color="gray" rounded size="xs">
          {post && post.category}
        </Button>
      </Link>
      <img
        src={post && post.image}
        alt={post && post.title}
        className="mt-5 p-3 w-full max-h-[600px] object-cover"
      />
      <div className="flex justify-between border-b border-slate-400 p-3 mx-auto w-full max-w-2xl text-xs">
        <span>{post && new Date(post.createdAt).toLocaleDateString()}</span>
        <span className="italic">
          {post && (post.content.length / 1000).toFixed(0)} mins read
        </span>
      </div>
      <div
        className="p-3 max-w-2xl mx-auto w-full post-content"
        dangerouslySetInnerHTML={{ __html: post && post.content }}
      ></div>
      <div className="max-w-4xl mx-auto w-full">
        <CallToAction />
      </div>
      <CommentSection postId={post && post._id} />
      <div className="flex flex-col justify-center items-center mb-5">
        <h1 className="text-xl mt-5">More Articles</h1>
        <div className="flex flex-wrap gap-5 mt-5 justify-center">
          {recentPosts
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .map((post) => (
              <PostCard key={post._id} post={post} />
            ))}
        </div>
        <button
          className="mt-5 p-2 bg-blue-500 text-white rounded"
          onClick={() => getNewPosts()}
        >
          Show New Posts
        </button>
      </div>
    </main>
  );
}
