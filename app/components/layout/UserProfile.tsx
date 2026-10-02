import { useTranslations } from "~/services/translations/context";

export default function UserProfile() {
  const t = useTranslations();

  // When we authenticate users, the user name would be fetched from the user session or context
  const userName = "Kim Neumann";

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
