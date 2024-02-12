import React from "react";
import { Link } from "react-router-dom";
import tw from "tailwind-styled-components";

interface MemberImageProps {
  src: string;
  memberId: string;
}
function MemberImage(props: MemberImageProps) {
  const { src, memberId } = props;

  return (
    <Link to={`/userpage/${memberId}`}>
      <ImageButton>
        <img src={src} alt="default_image" />
      </ImageButton>
    </Link>
  );
}

const ImageButton = tw.button`
w-6
h-6
`;

export default MemberImage;
