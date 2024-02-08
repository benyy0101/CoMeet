import React from "react";
import tw from "tailwind-styled-components";
import FollowerItem from "./FollowerItem";

function Follower() {
  const mockData = [
    {
      name: "김민수",
      profile:
        "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg",
    },
    {
      name: "김민수",
      profile:
        "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg",
    },
    {
      name: "김민수",
      profile:
        "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg",
    },
    {
      name: "김민수",
      profile:
        "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg",
    },
  ];

  return (
    <Wrapper>
      {mockData.map((data, index) => (
        <FollowerItem key={index} name={data.name} profile={data.profile} />
      ))}
    </Wrapper>
  );
}

const Wrapper = tw.div`
    bg-[#433e4e]
    rounded-md
    w-full
    h-full
    p-5
    text-black
    space-y-3
`;
export default Follower;
