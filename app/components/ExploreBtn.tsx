import Image from "next/image";

const ExploreBtn = () => {
  return (
    <a id="explore-btn" className="mt-7 mx-auto" href="#events">
      Explore Events
      <Image
        src="/icons/arrow-down.svg"
        alt="Arrow Down"
        width={24}
        height={24}
      />
    </a>
  );
};

export default ExploreBtn;
