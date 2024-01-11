import { Input } from '@/components/ui/input';
import { useState } from 'react';
const SearchInput = () => {
  const [search, setSearch] = useState<null | string>(null);

  return (
    <div className="relative w-1/3">
      <Input
        placeholder="Search a board, a workspace"
        className=" border-gray-500/25 outline-main-500 placeholder:text-sm rounded-md border p-2"
        onChange={(e) => setSearch(e.target.value)}
      />
      {search ? (
        <div className="bg-white z-50 animate-fade-in absolute left-0 p-4 -bottom-16 w-full rounded-md shadow-sm border-gray-500/25 border">
          Should display search results
        </div>
      ) : null}
    </div>
  );
};

export default SearchInput;
