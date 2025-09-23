const Loading = () => {
  return (
    <div className="w-full h-screen bg-[#ffff] flex justify-center items-center">
      <div className="relative w-[120px] h-[120px]">
        {/* Circular spinner */}
        <div className="absolute inset-0 rounded-full border-4 border-t-primary border-r-transparent border-b-transparent border-l-transparent animate-spin"></div>

        {/* Center image */}
        {/* <Image
          src={logo}
          alt="Loading"
          className="w-[80px] h-[80px] rounded-full object-contain absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          priority
        /> */}
      </div>
    </div>
  );
};

export default Loading;
