const Input = ({ icon: Icon, ...props }) => {
  return (
    <div className="relative mb-6">
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <Icon className="text-[#f2b143] w-5 h-5" />
      </div>
      <input
        {...props}
        className="
          w-full pl-10 pr-3 py-2 
          bg-[#d5d8d9] 
          rounded-lg border border-[#255876] 
          text-[#255876] placeholder-[#255876] 
          focus:outline-none focus:border-[#f2b143] focus:ring-2 focus:ring-[#f2b143] 
          transition duration-200
        "
      />
    </div>
  );
};

export default Input;
