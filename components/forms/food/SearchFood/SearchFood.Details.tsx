interface Props {}

const SearchFoodDetails = (props: Props) => {
  return (
    <>
      <div className="pl-5 font-bold top-bar h-10 w-full flex items-center justify-between pr-5 bg-gray-200 text-gray-700 rounded-t-xl">
        {'asideLabel && asideLabel'}
      </div>
      <div className="p-5">{'aside'}</div>
    </>
  );
};

export default SearchFoodDetails;
