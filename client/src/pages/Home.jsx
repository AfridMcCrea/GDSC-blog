import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import PostCard from "../components/PostCard";
import banner from "../assets/banner.png";
import { Button } from "flowbite-react";

export default function Home() {
  const [posts, setPosts] = useState("");
  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch("/api/post/getPosts");
      const data = await res.json();
      setPosts(data.posts);
    };
    fetchPosts();
  }, []);
  return (
    <div>
      <div className="">
        <div className="flex flex-col lg:flex-row  lg:p-20 p-5 lg:gap-1 gap-5">
          <div className="flex flex-col gap-6  px-3 mt-7  max-w-xl ">
            <h1 className="text-2xl lg:text-4xl">
              Google Developer Students Clubs
            </h1>
            <h1 className="text-3xl text-gradient font-bold lg:text-6xl">
              Tezpur University
            </h1>
            <p className="text-gray-500 text-xs sm:text-sm">
              We are a passionate community of tech enthusiasts, innovators, and
              learners dedicated to fostering a culture of collaboration and
              skill development in the ever-evolving world of technology.
            </p>
            <div className="flex gap-3 h-10">
              <Link to="https://gdsc.community.dev/tezpur-university-tezpur-india/">
                <button className="bg-[#4285F4] hover:bg-blue-700 text-white  rounded-md  ">
                  <span className="flex items-stretch px-4 py-2 text-sm">
                    Learn More
                  </span>
                </button>
              </Link>
              <Link to="https://www.instagram.com/gdsc_tezu/">
                <button className="bg-white hover:text-white hover:bg-blue-700 text-[#4285F4] outline rounded-md ">
                  <span className="flex items-stretch text-sm px-4 py-2">
                    Keep up on Intagram!
                  </span>
                </button>
              </Link>
            </div>
          </div>
          <div className="relative flex flex-col rounded-md border border-black bg-white text-black shadow-[5px_5px_0px_0px] shadow-pink-300 h-fit max-h-[500px] w-full">
            <img
              className="rounded-md lg:h-[400px] lg:w-full border border-black"
              src={banner}
              alt=""
            />
          </div>

        </div>
        <div className="max-w-6xl mx-auto p-3 flex flex-col gap-8 py-7">
          {posts && posts.length > 0 && (
            <div className="flex flex-col gap-6">
              <div className="flex mx-auto gap-2">
                <h2 className="text-3xl font-semibold text-center">Our</h2>
                <h2 className="text-3xl font-semibold text-center text-[#4285F4]">
                  Blogs
                </h2>
              </div>
              <div className="flex flex-col sm:flex-row sm:flex-wrap gap-4 items-center ">
                {posts.map((post) => (
                  <PostCard key={post._id} post={post} />
                ))}
              </div>
              <Link
                to="/search"
                className="text-lg text-center hover:underline text-teal-500"
              >
                View all posts
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
