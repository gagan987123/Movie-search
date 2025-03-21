import { useEffect, useState } from "react";
import { useContentStore } from "../src/store/ContentStore";
import axios from "axios";
import React from "react";

const useGetTrendingContent = () => {
  const [trendingContents, settrendingContent] = useState([]);
  const { contentType } = useContentStore();

  useEffect(() => {
    const getTrendingContent = async () => {
      const res = await axios.get(
        `http://localhost:3000/${contentType}/trending`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      settrendingContent(res.data.content);
    };
    getTrendingContent();
  }, [contentType]);
  return { trendingContents };
};

export default useGetTrendingContent;
