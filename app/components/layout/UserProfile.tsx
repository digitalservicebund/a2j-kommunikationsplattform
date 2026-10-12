import { useTranslations } from "~/services/translations/context";

export interface UserProfileProps {
  userName: string | undefined;
}

export default function UserProfile({ userName }: UserProfileProps) {
  const t = useTranslations();
  return (
    <p className="kern-body kern-body--small kern-body--muted kern-gap-sm m-0 flex p-0">
      <span
        className="kern-icon kern-icon--account-circle kern-icon--default"
        aria-hidden="true"
      ></span>
      <span>
        {t.layout.userProfile.loggedInAs} <b>{userName}</b>
      </span>
    </p>
  );
}
