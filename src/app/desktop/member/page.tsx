import { redirect } from 'next/navigation';

const MemberPage = () => {
  // return <div className="flex-1 bg-white text-[#555]">MemberPage</div>;
  return redirect('member/transition');
};

export default MemberPage;
