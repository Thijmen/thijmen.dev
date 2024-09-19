import { GITHUB_ACCOUNTS } from "@/core/common/constant/github";
import Contributions from "@/core/modules/dashboard/components/Contributions";

export const GithubBlock = () => {
  return (
    <div className="space-y-10">
      {GITHUB_ACCOUNTS?.filter((account) => account?.is_active).map(
        (account, index) => (
          <Contributions
            key={index}
            username={account?.username}
            type={account?.type}
            endpoint={account?.endpoint}
          />
        ),
      )}
    </div>
  );
};
