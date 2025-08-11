import { KernButton, KernHeading } from "@kern-ux-annex/kern-react-kit";
import { useState } from "react";
import {
  type ActionFunctionArgs,
  Form,
  Link,
  Outlet,
  useLoaderData,
  useNavigation,
} from "react-router";
import deprecatedPrototypeStyles from "~/prototype.styles.css?url";
import { getFormDataFromRequest } from "~/services/prototype.fileUpload.server";
import { ServicesContext } from "~/services/prototype.servicesContext.server";
import { requireUserSession } from "~/services/prototype.session.server";
import { LogoutType } from "./action.logout-user";

export async function loader({ request }: { request: Request }) {
  const { demoMode } = await requireUserSession(request);
  const verfahren = await ServicesContext.getJustizBackendService(
    demoMode,
  ).getAllVerfahren(10, 0);
  return verfahren;
}

export async function action({ request }: ActionFunctionArgs) {
  const { demoMode } = await requireUserSession(request);
  const formData = await getFormDataFromRequest(request);

  const xjustiz = formData.get("xjustiz") as File;
  const files = formData.getAll("files") as File[];

  await ServicesContext.getJustizBackendService(demoMode).createVerfahren(
    xjustiz,
    files,
  );

  return null;
}

export default function Verfahren() {
  return (
    <>
      <link rel="stylesheet" href={deprecatedPrototypeStyles} />
      <KernHeading level={1} size="large">
        Verfahren
      </KernHeading>

      <Form method="post" action="/action/logout-user">
        <input type="hidden" name="logoutType" value={LogoutType.ByUser} />
        <KernButton
          icon="close"
          iconPosition="left"
          text="Abmelden"
          type="submit"
        />
      </Form>

      <main>
        <div className="flex flex-col items-start mb-40">
          <CreateVerfahren />
          <ListVerfahren />
        </div>
      </main>
    </>
  );
}

function ListVerfahren() {
  const verfahren = useLoaderData<typeof loader>();
  const navigation = useNavigation();
  const [expanded, setExpanded] = useState<string | null>(null);

  const toggleSidebar = (id: string) => {
    setExpanded((prevExpanded) => {
      const isExpanded = prevExpanded !== id;
      return isExpanded ? id : null;
    });
  };

  if (!verfahren) {
    return null;
  }

  return (
    <div className="mt-14 flex w-full flex-col gap-24">
      {verfahren.map((v) => (
        <div
          key={v.id}
          className="flex border-2 border-gray-500 p-24"
          data-testid="verfahren-item"
        >
          <div className="w-full">
            <div className="text-3xl font-bold">{v.aktenzeichen}</div>
            <div className="text-sm text-gray-500">Aktenzeichen</div>

            <div className="mt-24 grid grid-cols-2 gap-y-2">
              <div className="text-xl">{v.status}</div>
              <div className="text-xl">
                {new Date(v.status_changed).toLocaleDateString("de-DE")}
              </div>
              <div className="text-sm text-gray-500">Einreichungsstatus</div>

              <div className="text-sm text-gray-500">Zuletzt geändert</div>
            </div>

            {expanded === v.id && (
              <div className="mt-20">
                {navigation.state === "loading" ? (
                  <div>Datenraum wird geladen...</div>
                ) : (
                  <Outlet />
                )}
              </div>
            )}
          </div>
          <Link
            to={`/prototype/verfahren/${v.id}`}
            onClick={() => toggleSidebar(v.id)}
            preventScrollReset={true}
            className="flex cursor-pointer items-stretch border-l-2 border-gray-300 pl-24"
          >
            <div className="my-auto">
              <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className={`h-24 w-24 text-gray-500 transition-transform ${expanded === v.id ? "rotate-180" : ""}`}
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M15.5002 19.85C15.6558 19.9056 15.8225 19.9333 16.0002 19.9333C16.178 19.9333 16.3447 19.9056 16.5002 19.85C16.6558 19.7945 16.8002 19.7 16.9336 19.5667L23.0669 13.4333C23.3113 13.1889 23.4336 12.8778 23.4336 12.5C23.4336 12.1222 23.3113 11.8111 23.0669 11.5667C22.8225 11.3222 22.5113 11.2 22.1336 11.2C21.7558 11.2 21.4447 11.3222 21.2002 11.5667L16.0002 16.7667L10.8002 11.5667C10.5558 11.3222 10.2447 11.2 9.86689 11.2C9.48912 11.2 9.17801 11.3222 8.93356 11.5667C8.68912 11.8111 8.56689 12.1222 8.56689 12.5C8.56689 12.8778 8.68912 13.1889 8.93356 13.4333L15.0669 19.5667C15.2002 19.7 15.3447 19.7945 15.5002 19.85Z"
                  fill="#0073A8"
                />
              </svg>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
}

function CreateVerfahren() {
  const [xjustizSelected, setXjustizSelected] = useState(false);
  const [filesSelected, setFilesSelected] = useState(false);
  const [formVisible, setFormVisible] = useState(false);

  const toggleFormVisibility = () => {
    setFormVisible(!formVisible);
  };

  return (
    <>
      {!formVisible && (
        <button
          onClick={toggleFormVisibility}
          className="kern-btn kern-btn--primary mt-20"
          data-testid="create-verfahren-button"
        >
          <span className="kern-label">Neue Klage einreichen</span>
        </button>
      )}
      {formVisible && (
        <form
          method="post"
          encType="multipart/form-data"
          action="/prototype/verfahren"
          className="relative"
        >
          <h2 className="mt-24 mb-10 text-xl font-bold">Klage einreichen</h2>
          <button
            onClick={toggleFormVisibility}
            className="absolute top-0 right-0 mt-2 mr-2 text-red-500"
          >
            X
          </button>
          <div className="flex flex-col gap-4 rounded-sm border-2 border-dashed border-[#0073A8] px-40 py-20">
            <label className="font-bold" htmlFor="xjustiz">
              XJustiz-Datei <span className="text-red-500">*</span>
            </label>
            <input
              className={`border-black-300 border-2 p-10 hover:border-blue-600 ${xjustizSelected ? "border-green-500" : ""}`}
              type="file"
              accept=".xml"
              name="xjustiz"
              id="xjustiz"
              onChange={(e) =>
                setXjustizSelected((e?.target?.files?.length || 0) > 0)
              }
            />
            <label className="font-bold" htmlFor="files">
              Anhänge
            </label>

            <input
              className={`border-black-300 border-2 p-10 hover:border-blue-600 ${filesSelected ? "border-green-500" : ""}`}
              type="file"
              name="files"
              id="files"
              multiple
              onChange={(e) =>
                setFilesSelected((e?.target?.files?.length || 0) > 0)
              }
            />
          </div>

          <button
            type="submit"
            className={`kern-btn kern-btn--primary mt-20 ${xjustizSelected ? "" : "is-disabled hidden"}`}
            disabled={!xjustizSelected}
            data-testid="submit-verfahren-button"
          >
            <span className="kern-label">Klage einreichen</span>
          </button>
        </form>
      )}
    </>
  );
}
