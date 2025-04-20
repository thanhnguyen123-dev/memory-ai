"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";
type RepositoryItemProps = {
  name: string;
  id: string;
  description: string;
  updated_at: string;
  language: string;
  default_branch: string;
};

const RepositoryItem = ({ 
  name,
  id,
  description,
  updated_at,
  language,
  default_branch,
 }: RepositoryItemProps) => {
  const router = useRouter();
  const { user } = useAuth();

  const handleClick = () => {
    router.push(`/${user?.user_metadata.user_name}/${name}`);
  };

  return (
    <div key={id} className="flex flex-col gap-2 border border-slate-200 rounded-md p-4" onClick={handleClick}>
      <h1>{name}</h1>
      <p>{id}</p>
      <p>{description}</p>
      <p>{updated_at}</p>
      <p>{language}</p>
      <p>{default_branch}</p>
    </div>
  );
}

export default RepositoryItem;