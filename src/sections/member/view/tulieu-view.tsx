'use client';

import { useDataUserInfo } from './utils/handleMember';

export default function TulieuView() {
  const useUserInfo = useDataUserInfo();
  return (
    <div className="flex items-center justify-center bg-gray-500 h-screen w-screen">
      Coming soon
    </div>
  );
}
