import { redirect } from 'next/navigation';

const PCPage = () => {
  // return <div className="flex-1 bg-white text-[#555]">MemberPage</div>;
  return redirect('desktop/home');
};

export default PCPage;
