import tw from "tailwind-styled-components";

export const BackgroundGradient = () => {
  return <Background />;
};

const Background = tw.div`
fixed
top-0
left-0
w-screen
h-screen
-z-50
bg-gradient-to-b
from-[#0A031C]
from-80%
to-[#100530]
`;
